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
    addUserName: '',
    addPassword: '',
    addJobName: '',
    addOctaneUrl: '',
    jobList: [],
    logType: '',
    uiStrings: {
      titlePrimary: 'Exploratory Testing',
      titleSecondary: 'UI Automation Coverage',
      userNameLabel: 'Username',
      usernameInputHint: 'Octane user name',
      passwordLabel: 'Password',
      pwInputHint: 'Octane password',
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
    hpsso_cookie_csrf: '',
    parsedCSSRules: '',
    isInProgress: false
  };

  $scope.canAuthenticate = function canAuthenticate() {
    prismManager.getCurrentUrl(function(result) {
      $scope.model.addOctaneUrl = result;
    });
    return $scope.model.addUserName && $scope.model.addPassword && $scope.model.addOctaneUrl;
  }

  $scope.onAuthenticateClick = function onAuthenticateClick() {
    let octaneUrl = $scope.model.addOctaneUrl;
    let SS_ID = octaneUrl.substring(octaneUrl.indexOf('?p=') + 3, octaneUrl.indexOf('?p=') + 7);
    let WS_ID = octaneUrl.substring(octaneUrl.indexOf('?p=') + 8, octaneUrl.indexOf('?p=') + 12);
    let index = octaneUrl.indexOf('/', octaneUrl.indexOf('/') + 2);
    let authenticationUrl = octaneUrl.substring(0, index) + '/authentication/sign_in';
    let data = {octaneURL: authenticationUrl, userName: $scope.model.addUserName, password: $scope.model.addPassword, csrf_cookie: '', sharedSpaceID: SS_ID, workspaceID: WS_ID};
    localStorage.setItem('prismAuthentication', JSON.stringify(data));
    prismManager.authenticateAndRetrieveJobs();
    // loadFromStorage();
    //
    // let authenticationReq = {
    //   method: 'POST',
    //   url: data.octaneURL,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'HPECLIENTTYPE': 'HPE_MQM_UI'
    //   },
    //   data: {"user": $scope.model.addUserName, "password": $scope.model.addPassword}
    // };
    //
    //
    // $http(authenticationReq).then(function onHttpSuccess(response) {
    //   let cookieData = {url: authenticationReq.url, name: 'HPSSO_COOKIE_CSRF'};
    //   chrome.cookies.get(cookieData, function(cookie) {
    //     $scope.model.hpsso_cookie_csrf = cookie.value;
    //     data.csrf_cookie = cookie.value;
    //     prismManager.saveToStorage(data);
    //     $scope.onRetrieveClick();
    //   });
    // }, function onHttpFailure(/*response*/) {
    //   console.log('Unable to authenticate: ' + authenticationUrl);
    // });
  }


  $scope.canRetrieve = function canRetrieve() {
    return $scope.model.addOctaneUrl;
  }

  $scope.onRetrieveClick = function onRetrieveClick() {
    prismManager.retrieveJobs(loadFromStorage);
    // $scope.model.jobs = prismManager.loadFromStorage('almOctanePrismJobs').jobList;
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

});