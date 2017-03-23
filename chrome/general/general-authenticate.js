angular.module('mainApp').factory('generalAuthenticate', function generalAuthenticate($http, generalStorage, plList) {

  function getCurrentUrl(cb) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      //TODO:check if need to save URL to localStorage
      cb(tabs[0].url);
    });
  }

  function authenticate(octaneUrl, onAuthenticationSuccess, onAuthenticationFailure) {
    let data = generalStorage.load('generalAuthentication');
    let authenticationReq = {
      method: 'POST',
      url: octaneUrl,
      headers: data.authenticationData.headers,
      body: {"user": data.authenticationData.userName, "password": data.authenticationData.password}
    };

    $http(authenticationReq).then(function onHttpSuccess(response) {
      let cookieData = {url: authenticationReq.url, name: Object.keys(data.authenticationData.cookies)[0]};
      chrome.cookies.get(cookieData, function(cookie) {
        data.authenticationData.cookies['HPSSO_COOKIE_CSRF'] = cookie.value;
        generalStorage.save('generalAuthentication', data);
        onAuthenticationSuccess();
      });
    }, function onHttpFailure(/*response*/) {
      console.log('Unable to authenticate: ' + authenticationReq.url);
      onAuthenticationFailure();
    });
  }

  return {
    authenticate: authenticate,
    getCurrentUrl: getCurrentUrl
  };
});
