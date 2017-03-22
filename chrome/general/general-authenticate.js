angular.module('mainApp').factory('generalAuthenticate', function generalAuthenticate($http, prismStorage) {

  function getCurrentUrl() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      //TODO:check if need to save URL to localStorage
      authenticate(tabs[0].url);
    });
  }

  function authenticate(octaneUrl) {
    // let data = prismStorage.load('prismAuthentication');
    let authenticationReq = {
      method: 'POST',
      url: octaneUrl,
      headers: {
        'Content-Type': 'application/json',
        'HPECLIENTTYPE': 'HPE_MQM_UI'
      },
      data: {"user": data.userName, "password": data.password}
    };

    $http(authenticationReq).then(function onHttpSuccess(response) {
      let cookieData = {url: authenticationReq.url, name: 'HPSSO_COOKIE_CSRF'};
      chrome.cookies.get(cookieData, function(cookie) {
        data.csrf_cookie = cookie.value;
      });
    }, function onHttpFailure(/*response*/) {
      console.log('Unable to authenticate: ' + authenticationReq.url);
    });
  }

  return {
    authenticate: authenticate,
    getCurrentUrl: getCurrentUrl
  };
});
