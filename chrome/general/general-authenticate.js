angular.module('mainApp').factory('generalAuthenticate', function generalAuthenticate($http, generalStorage, plList) {
  
  function authenticate(octaneUrl, userName, password, headers, setStatus) {
    let data = generalStorage.load('generalAuthentication');
    let authenticationReq = {
      method: 'POST',
      url: octaneUrl,
      headers: headers,
      body: {"user": userName, "password": password}
    };

    $http.post(authenticationReq.url, authenticationReq.body).then(function onHttpSuccess(response) {
      let cookieData = {url: authenticationReq.url, name: Object.keys(data.cookies)[0]};
      chrome.cookies.get(cookieData, function(cookie) {
        data.cookies['HPSSO_COOKIE_CSRF'] = cookie.value;
        generalStorage.save('generalAuthentication', data);
      });
      setStatus('Success');
    }, function onHttpFailure(/*response*/) {
      console.log('Unable to authenticate: ' + authenticationReq.url);
      setStatus('Failed');
    });
  }

  return {
    authenticate: authenticate
  };
});
