angular.module('mainApp').directive('generalView', function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'general/general-view.html'
  };
});

angular.module('mainApp').controller('generalCtrl', function generalCtrl($scope, $sce, generalStorage, generalAuthenticate) {

  $scope.model = {
    uiStrings: {
      titlePrimary: 'General Settings',
      titleSecondary: 'Plugin Configuration'
    },
    authenticationStatus: '',
    usernameInput: '',
    passwordInput: '',
    octaneURL: '',
    hpsso_cookie_csrf: '',
    authenticationData: {
      octaneData: {
        url: '',
        sharedSpaceID: '',
        workspaceID: ''
      },
      authenticationData: {
        userName: '',
        password: '',
        headers: [],
        cookies: []
      }
    }
  };

  $scope.canAuthenticate = function canAuthenticate() {
    return $scope.model.usernameInput && $scope.model.passwordInput && $scope.model.octaneURL;
  };

  $scope.onLoginClick = function authenticate() {
    let index = $scope.model.octaneURL.indexOf('/', $scope.model.octaneURL.indexOf('/') + 2);
    let octaneServerURL = $scope.model.octaneURL.substring(0, index);
    let authenticationUrl = $scope.model.octaneURL.substring(0, index) + '/authentication/sign_in';
    $scope.model.authenticationData = {
      octaneURL: octaneServerURL,
      headers: {
        'Content-Type': 'application/json',
        'HPECLIENTTYPE': 'HPE_MQM_UI'
      },
      cookies: {
        HPSSO_COOKIE_CSRF: ''
      }
    }
    generalStorage.save('generalAuthentication', $scope.model.authenticationData);
    generalAuthenticate.authenticate(authenticationUrl, $scope.model.usernameInput, $scope.model.passwordInput, $scope.model.authenticationData.headers, $scope.authenticationSuccess, $scope.authenticationFailure);
  };

$scope.authenticationSuccess = function authenticationSuccess() {
  $scope.model.authenticationStatus = $sce.trustAsHtml('Authentication Success');
};

$scope.authenticationFailure = function authenticationFailure() {
  $scope.model.authenticationStatus = $sce.trustAsHtml('Authentication Failed');
}

});