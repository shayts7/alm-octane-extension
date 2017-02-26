angular.module('mainApp').directive('prismView', function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'prism/prism-view.html'
  };
});

angular.module('mainApp').controller('prismCtrl', function prismCtrl($scope, prismParser) {

  function loadFromLocalStorage() {
    let str = localStorage.getItem('almOctanePrism');
    if (str) {
      let data = JSON.parse(str);
      if (data.jobs) {
        $scope.model.jobs = data.jobs;
      }
    }
  }

  function saveToLocalStorage() {
    let data = {
      jobs: $scope.model.jobs
    };
    localStorage.setItem('almOctanePrism', JSON.stringify(data));
  }

  function getLogsDone(logsArray) {
    var cssRulesInOneLine = logsArray.join('\n');
    removeStyleFromHead();
    addStyleToHead(cssRulesInOneLine);
  }

  function removeStyleFromHead() {
    sendMessage({actionType: 'remove style from header'});
  }

  function addStyleToHead(cssRules) {
    var message = {
      cssStyleRules: cssRules,
      actionType: 'add style to header',
      styleID: 'prism-style'
    };
    sendMessage(message);
  }

  function sendMessage(message) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {data: message}, function(response) {
      });
    });

  }

  $scope.model = {
    jobs: [],
    addJobName: '',
    addJobUrl: '',
    uiStrings: {
      titlePrimary: 'Prism',
      titleSecondary: 'Code Coverage',
      nameLabel: 'Name:',
      nameInputHint: 'Enter job nickname/alias...',
      urlLabel: 'URL:',
      urlInputHint: 'Enter job console log URL...',
      activateCheckboxTooltip: 'show/hide coverage',
      removeButtonTooltip: 'remove',
      showButtonText: 'Show',
      hideButtonText: 'Hide'
    }
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
  };

  $scope.canShow = function canShow() {
    return $scope.model.jobs.length > 0;
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
    prismParser.getAutomationLogs(activeJobs, getLogsDone);
  };

  $scope.onHideClick = function onHideClick() {
    removeStyleFromHead();
  };

  loadFromLocalStorage();

});