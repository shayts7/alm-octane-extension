angular.module('mainApp').directive('prismView', function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'prism/prism-view.html'
  };
});

angular.module('mainApp').controller('prismCtrl', function prismCtrl($http, $scope, prismManager) {

  function loadFromStorage() {
    let data = prismManager.loadFromStorage();
    $scope.model.uiJobs = data.uiJobs || [];
    $scope.model.jobList = data.jobs[0].jobList || [];
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

  $scope.model = {
    jobs: [],
    addJobName: '',
    addOctaneUrl: '',
    jobList: '',
    logType: '',
    uiStrings: {
      titlePrimary: 'Exploratory Testing',
      titleSecondary: 'UI Automation Coverage',
      octaneUrlLabel: 'Octane URL:',
      octaneUrlInputHint: 'Enter Octane URL',
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

  $scope.canRetrieve = function canRetrieve() {
    return $scope.model.addOctaneUrl;

  }

  $scope.onRetrieveClick = function onRetrieveClick() {
    let jobsList = [];
    let req = {
      method: 'GET',
      url: 'https://mqast010pngx.saas.hpe.com/api/shared_spaces/1001/workspaces/1002/pipelines?expand=$all{fields=name},author{fields=full_name}&inflate=true&query="(id=51001)"',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'HPECLIENTTYPE': 'HPE_MQM_UI',
        'HPSSO-HEADER-CSRF': '289bes2bctdbtbeppovmdt37uh'
      },
    };

    $http(req).then(function check(response) {
      let res = response.data;
      for (let i = 0; i < res.data[0].current_model.structure.phasesInternal.length; i++) {
        for (let j = 0; j < res.data[0].current_model.structure.phasesInternal[i].jobs.length; j++) {
          jobsList.push(res.data[0].current_model.structure.phasesInternal[i].jobs[j].name);
        }
      }
      $scope.model.jobs.push({
        octaneUrl: $scope.model.addOctaneUrl,
        jobList: jobsList
      });
      saveToStorage();
      $scope.model.addOctaneUrl = '';
    }
    );
  }
  
  $scope.canSelectJobs = function canSelectJobs() {
    return $scope.model.jobs[0].jobList;
  }

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
    $scope.model.jobList  = '';
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

})
;