angular.module('mainApp').directive('prismView', function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'prism/prism-view.html'
  };
});

angular.module('mainApp').controller('prismCtrl', function prismCtrl($scope, prismParser) {

  function loadFromLocalStorage() {
    let str = localStorage.getItem('almOctanePrismJobs');
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
    localStorage.setItem('almOctanePrismJobs', JSON.stringify(data));
  }

  function getLogsDone(logsArray) {
    var cssRulesInOneLine = logsArray.join('\n');
    addStyleToHead(cssRulesInOneLine);
  }

  function removeStyleFromHead() {
    sendMessage({type: 'prism-msg', action: 'remove style from header'});
  }

  function addStyleToHead(cssRules) {
    sendMessage({
      type: 'prism-msg',
      cssStyleRules: cssRules,
      action: 'add style to header'
    });
  }

  function sendMessage(message) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
      });
    });
  
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
      removeStyleFromHead();
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
    // prismParser.getAutomationLogs(activeJobs, getLogsDone);
    getLogsDone(prismParser.returnedParsedOutput());
    //prismParser.getAutomationLogs(activeJobs, getLogsDone);
  };

  $scope.onHideClick = function onHideClick() {
    removeStyleFromHead();
  };

  loadFromLocalStorage();

});