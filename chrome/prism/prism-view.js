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
    $scope.model.uiJobs = data.uiJobs || [];
    $scope.model.jobList = data.jobList === undefined ? [] : data.jobList;
    $scope.model.pipeLineList = data.pipeLineList === undefined ? [] : data.pipeLineList;
  }

  function saveToStorage() {
    let data = {
      jobs: $scope.model.jobs,
      uiJobs: $scope.model.uiJobs
    };
    prismManager.saveToStorage(data);
  }

  function getActiveJobs() {
    return $scope.model.jobs.filter(function(j) {
      return j.active;
    });
  }

  function loadPipelines(plList) {
    $scope.model.pipeLineList = plList;
    console.log($scope.model.pipeLineList);
  }

  $scope.model = {
    jobs: [],
    addJobName: '',
    pipeLineList: [],
    selectedPipeline: '',
    jobList: [],
    selectedJob: '',
    logType: '',
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
  }

  $scope.onJobChange = function(selectedJob) {
    $scope.model.selectedJob = selectedJob;
    console.log(selectedJob);
  }

  // $scope.canSelectJobs = function canSelectJobs() {
  //   return $scope.model.jobs[0].jobList;
  // }

  $scope.canAdd = function canAdd() {
    return $scope.model.addJobName && $scope.model.logType;
  };

  $scope.onAddClick = function onAddClick() {
    $scope.model.uiJobs.push({
      active: true,
      jobName: $scope.model.jobList,
      alias: $scope.model.addJobName,
      selectedLogType: $scope.model.logType
    });

    saveToStorage();
    $scope.model.addJobName = '';
    $scope.model.jobList = '';
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
    return $scope.model.jobs.length > 0 && !$scope.model.isInProgress;
  };

  $scope.onHideClick = function onHideClick() {
    prismManager.removeColoringFromAUT();
  };

  loadFromStorage();
  prismManager.loadPipelines(loadPipelines);

});