angular.module('mainApp').directive('prismView', function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'prism/prism-view.html'
  };
});

angular.module('mainApp').controller('prismCtrl', function prismCtrl($scope, prismManager) {

  function loadFromLocalStorage() {
    let data = prismManager.loadFromStorage();
    $scope.model.jobs = data.jobs || [];
  }

  function saveToLocalStorage() {
    let data = {
      jobs: $scope.model.jobs
    };
	prismManager.saveToStorage(data);
  }

  $scope.model = {
    jobs: [],
    addJobName: '',
    addJobUrl: '',
    uiStrings: {
      titlePrimary: 'Exploratory Testing',
      titleSecondary: 'UI Automation Coverage',
      nameLabel: 'Name:',
      nameInputHint: 'Enter job nickname/alias...',
      urlLabel: 'URL:',
      urlInputHint: 'Enter job console log URL...',
      activateCheckboxTooltip: 'show/hide coverage',
      removeButtonTooltip: 'remove',
      showButtonText: 'Show',
      hideButtonText: 'Hide'
    },
    parsedCSSRules: ''
  };

  $scope.canAdd = function canAdd() {
    return $scope.model.addJobName && $scope.model.addJobUrl;
  };

  $scope.onAddClick = function onAddClick() {
    $scope.model.jobs.push({
      active: true,
      name: $scope.model.addJobName,
      url: $scope.model.addJobUrl
    });
    saveToLocalStorage();
    $scope.model.addJobName = '';
    $scope.model.addJobUrl = '';
  };

  $scope.onRemoveClick = function onRemoveClick(index) {
    $scope.model.jobs.splice(index, 1);
    saveToLocalStorage();
    if ($scope.model.jobs.length == 0) {
      prismManager.removeColoringFromAUT();
    }
  };

  $scope.canShow = function canShow() {
    let activeJobs = 0;
    for (let i = 0; i < $scope.model.jobs.length; i++) {
      if ($scope.model.jobs[i].active === true) {
        activeJobs++;
      }
    }
    return (activeJobs > 0);
  };

  $scope.canHide = function canHide() {
    return $scope.model.jobs.length > 0;
  };

  $scope.onShowClick = function onShowClick() {
    saveToLocalStorage();
    let activeJobs = [];
    for (let i = 0; i < $scope.model.jobs.length; i++) {
      if ($scope.model.jobs[i].active === true) {
        activeJobs.push($scope.model.jobs[i]);
      }
    }
    if (activeJobs.length == 0) {
      !canShow();
    }
    prismManager.getDataAndColorAUT(activeJobs);
  };

  $scope.onHideClick = function onHideClick() {
    prismManager.removeColoringFromAUT();
  };

  loadFromLocalStorage();

});