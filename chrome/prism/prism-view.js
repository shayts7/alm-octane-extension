angular.module('mainApp').directive('prismView', function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'prism/prism-view.html'
  };
});

angular.module('mainApp').controller('prismCtrl', function prismCtrl($http, $scope, prismManager) {

  function loadFromStorage() {
    let data = prismManager.loadFromStorage('almOctanePrismJobs');
    $scope.model.uiJobs = data.ui || [];
  }

  function saveToStorage() {
    let data = {
      ui: $scope.model.uiJobs
    };
    prismManager.saveToStorage('almOctanePrismJobs', data);
  }

  function getActiveJobs() {
    let activeJobs = $scope.model.uiJobs.filter(function(pipelineObject) {
      let activeJobsInPlObject = pipelineObject.jobs.filter(function(singleJob) {
        return singleJob.active;
      });
      return activeJobsInPlObject.length > 0;
    });
    return activeJobs;
  }

  function loadPipelines(plList) {
    $scope.model.pipeLineList = plList;
  }

  $scope.model = {
    jobs: [],
    addJobName: '',
    pipeLineList: [],
    selectedPipeline: '',
    jobList: [],
    selectedJob: '',
    logType: '',
    ciServerType: '',
    ciServerUrl: '',
    uiStrings: {
      titlePrimary: 'Exploratory Testing',
      titleSecondary: 'UI Automation Coverage',
      nameLabel: 'Name:',
      nameInputHint: 'Enter job nickname/alias...',
      activateCheckboxTooltip: 'show/hide coverage',
      removeButtonTooltip: 'remove',
      showButtonText: 'Show',
      hideButtonText: 'Hide'
    },
    uiJobs: [],
    parsedCSSRules: '',
    isInProgress: false
  };

  $scope.onPipelineChange = function(selectedPipeline) {
    $scope.model.selectedPipeline = selectedPipeline;
    prismManager.retrieveJobs(selectedPipeline, function(pipelineList) {
      $scope.model.jobList = pipelineList.pl_jobs;
    });
  };

  $scope.onJobChange = function(selectedJob) {
    $scope.model.selectedJob = selectedJob;
    $scope.model.ciServerType = $scope.model.selectedPipeline.pl_ciServerType;
    $scope.model.ciServerUrl = $scope.model.selectedPipeline.pl_ciServerUrl;
  };

  // $scope.canSelectJobs = function canSelectJobs() {
  //   return $scope.model.jobs[0].jobList;
  // }

  $scope.canAdd = function canAdd() {
    return $scope.model.addJobName && $scope.model.selectedPipeline && $scope.model.selectedJob && $scope.model.logType;
  };

  $scope.onAddClick = function onAddClick() {
    let uiJobData = {
      pipeline_id: $scope.model.selectedPipeline.pl_id,
      pipeline_name: $scope.model.selectedPipeline.pl_name,
      ciData: {serverType: $scope.model.ciServerType, serverUrl: $scope.model.ciServerUrl},
      jobs: [{
        alias: $scope.model.addJobName,
        jobName: $scope.model.selectedJob,
        active: true
      }],
      selectedLogType: $scope.model.logType
    };

    if ($scope.model.uiJobs.length === 0) {
      $scope.model.uiJobs.push(uiJobData);
    } else {
      for (let i = 0; i < $scope.model.uiJobs.length; i++) {
        if ($scope.model.selectedPipeline.pl_id === $scope.model.uiJobs[i].pipeline_id) {
          $scope.model.uiJobs[i].jobs.push(uiJobData.jobs[0]);
        } else {
          if (i === $scope.model.uiJobs.length - 1) {
            $scope.model.uiJobs.push(uiJobData);
            i = $scope.model.uiJobs.length;
          }
        }
      }
    }
    saveToStorage();
    loadFromStorage();
    $scope.model.addJobName = '';
  };

  $scope.onRemoveClick = function onRemoveClick(jobsArrayItem, index) {
    for (let i = 0; i < $scope.model.uiJobs.length; i++) {
      if ($scope.model.uiJobs[i].pipeline_id === jobsArrayItem.pipeline_id) {
        $scope.model.uiJobs[i].jobs.splice(index, 1);
        if ($scope.model.uiJobs[i].jobs.length === 0) {
          $scope.model.uiJobs.splice(i, 1);
        }
      }
    }
    saveToStorage();
    if ($scope.model.uiJobs.length === 0) {
      prismManager.removeColoringFromAUT();
    }
  };

  $scope.canShow = function canShow() {
    let activeJobs = getActiveJobs();
    return activeJobs.length > 0 && !$scope.model.isInProgress;
  };

  $scope.onShowClick = function onShowClick() {
    $scope.model.isInProgress = true;
    saveToStorage();
    let activeJobs = getActiveJobs();
    prismManager.getDataAndColorAUT(activeJobs, getDataAndColorAUTDone);

    function getDataAndColorAUTDone() {
      $scope.model.isInProgress = false;
    }
  };

  $scope.canHide = function canHide() {
    return $scope.model.jobs.length > 0 && !$scope.model.isInProgress;
  };

  $scope.onHideClick = function onHideClick() {
    prismManager.removeColoringFromAUT();
  };

  loadFromStorage();
  prismManager.loadPipelines(loadPipelines);

});