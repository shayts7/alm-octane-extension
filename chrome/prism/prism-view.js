angular.module('mainApp').directive('prismView', function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'prism/prism-view.html'
  };
});

angular.module('mainApp').controller('prismCtrl', function prismCtrl($http, $scope, prismManager) {

  function loadFromStorage() {
    $scope.model.isPipelinesStillLoad = true;
    $scope.model.isJobsStillLoad = true;
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

  function loadSharedspaces(ssList) {
    if (ssList.length === 1) {
      $scope.model.workspaceList = ssList[0].workspaces;
    }
    $scope.model.sharedSpaceList = ssList;
    $scope.model.selectedSharedSpace = ssList[0];
    $scope.model.selectedWorkspace = ssList[0].workspaces[0];
    prismManager.loadPipelines($scope.model.selectedSharedSpace.id, $scope.model.selectedWorkspace.id, loadPipelines);
  }

  function loadPipelines(plList) {
    $scope.model.isPipelinesStillLoad = false;
    $scope.model.pipeLineList = plList;
    $scope.model.selectedPipeline = $scope.model.pipeLineList[0];
  }

  function loadJobs(pipelineObject) {
    $scope.model.isJobsStillLoad = false;
    $scope.model.jobList = pipelineObject.pl_jobs;
    $scope.model.selectedJob = $scope.model.jobList[0];
  }

  function getActiveJobs() {
    return $scope.model.uiJobs.filter(function(job) {
      return job.active;
    });
  }

  $scope.model = {
    jobs: [],
    addJobName: '',
    sharedSpaceList: [],
    selectedSharedSpace: {id: '', name: '', workspaces: []},
    workspaceList: [],
    selectedWorkspace: {id: '', name: ''},
    pipeLineList: [],
    selectedPipeline: {pl_id: '', pl_name: '', pl_jobs: [], pl_ciServerType: '', pl_ciServerUrl: ''},
    jobList: [],
    selectedJob: '',
    logType: 'selenium',
    ciServerType: '',
    ciServerUrl: '',
    uiStrings: {
      titlePrimary: 'Exploratory Testing',
      titleSecondary: 'UI Automation Coverage',
      selectSSLabel: 'Sharedspace:',
      selectWSLabel: 'Workspace:',
      selectPipelineLabel: 'Pipeline:',
      selectJobLabel: 'Job:',
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
    isInProgress: false,
    isPipelinesStillLoad: false,
    isJobsStillLoad: false
  };

  $scope.showSharedSpaceSelect = function() {
    return $scope.model.sharedSpaceList.length > 1;
  };

  $scope.onSharedspaceChange = function(selectedSharedspace) {
    $scope.model.selectedSharedSpace = selectedSharedspace;
    $scope.model.workspaceList = $scope.model.selectedSharedSpace.workspaces;
  };

  $scope.onWorkspaceChange = function(selectedWorkspace) {
    $scope.model.selectedWorkspace = selectedWorkspace;
    prismManager.loadPipelines($scope.model.selectedSharedSpace.id, $scope.model.selectedWorkspace.id, loadPipelines);
  };

  $scope.onPipelineChange = function(selectedPipeline) {
    $scope.model.selectedPipeline = selectedPipeline;
    prismManager.loadJobs($scope.model.selectedSharedSpace.id, $scope.model.selectedWorkspace.id, $scope.model.selectedPipeline, loadJobs);
  };

  $scope.onJobChange = function(selectedJob) {
    $scope.model.selectedJob = selectedJob;
    $scope.model.ciServerType = $scope.model.selectedPipeline.pl_ciServerType;
    $scope.model.ciServerUrl = $scope.model.selectedPipeline.pl_ciServerUrl;
  };

  $scope.canSelectPipelines = function canSelectPipelines() {
    return $scope.model.isPipelinesStillLoad;
  };

  $scope.canSelectJobs = function canSelectJobs() {
    return $scope.model.isJobsStillLoad;
  };

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

  prismManager.loadSharedspaces(loadSharedspaces);
  loadFromStorage();
});