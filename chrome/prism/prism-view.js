angular.module('mainApp').directive('prismView', function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'prism/prism-view.html'
  };
});

angular.module('mainApp').controller('prismCtrl', function prismCtrl($http, $scope, prismManager) {

  function loadFromStorage() {
    let uiJobsData = prismManager.loadFromStorage('almOctanePrismJobs');
    let pipelinesData = prismManager.loadFromStorage('almOctanePrismPipelines');
    $scope.model.uiJobs = uiJobsData.ui || [];
    $scope.model.pipelines = pipelinesData.pipeline || [];
  }

  function saveToStorage() {
    let jobsData = {
      ui: $scope.model.uiJobs
    };

    let pipelinesData = {
      pipeline: $scope.model.pipelines
    }
    prismManager.saveToStorage('almOctanePrismJobs', jobsData);
    prismManager.saveToStorage('almOctanePrismPipelines', pipelinesData);
  }

  function getActiveJobs() {
    return $scope.model.uiJobs.filter(function(job) {
      return job.active;
    });
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
    logType: 'selenium',
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
    pipelines: [],
    uiJobs: [],
    parsedCSSRules: '',
    isInProgress: false
  };

  $scope.onPipelineChange = function(selectedPipeline) {
    $scope.model.selectedPipeline = selectedPipeline;
    prismManager.loadJobs(selectedPipeline, function(pipelineList) {
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
    let isJobExist = false;
    let pipelineData = {
      id: $scope.model.selectedPipeline.pl_id,
      name: $scope.model.selectedPipeline.pl_name,
      ciData: {serverType: $scope.model.ciServerType, serverUrl: $scope.model.ciServerUrl}
    };

    //First Pipeline Add
    if ($scope.model.pipelines.length === 0) {
      $scope.model.pipelines.push(pipelineData);
    } else {
      $scope.model.pipelines.forEach((pipeline) => {
        if ($scope.model.selectedPipeline.pl_id !== pipeline.id) {
          $scope.model.pipelines.push(pipelineData);
        }
      });
    }

    let uiJobData = {
      parentPipelineId: $scope.model.selectedPipeline.pl_id,
      alias: $scope.model.addJobName,
      name: $scope.model.selectedJob,
      selectedLogType: $scope.model.logType,
      active: true
    };

    //First Job Add
    if ($scope.model.uiJobs.length === 0) {
      $scope.model.uiJobs.push(uiJobData);
    } else {
      $scope.model.uiJobs.forEach((job) => {
        if ($scope.model.selectedPipeline.pl_id === job.parentPipelineId) {
          if (job.name === $scope.model.selectedJob) {
            isJobExist = true;
          }
        }
      });
      if (!isJobExist) {
        $scope.model.uiJobs.push(uiJobData);
      }
    }
    saveToStorage();
    loadFromStorage();
    $scope.model.addJobName = '';
  };

  $scope.onRemoveClick = function onRemoveClick(index) {
    $scope.model.uiJobs.splice(index, 1);
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
    return $scope.model.uiJobs.length > 0 && !$scope.model.isInProgress;
  };

  $scope.onHideClick = function onHideClick() {
    prismManager.removeColoringFromAUT();
  };

  loadFromStorage();
  prismManager.loadPipelines(loadPipelines);

});