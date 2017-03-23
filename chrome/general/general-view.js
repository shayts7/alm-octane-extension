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
    return $scope.model.usernameInput && $scope.model.passwordInput;
  };

  $scope.onLoginClick = function authenticate() {
    let octaneUrl = '';
    generalAuthenticate.getCurrentUrl(function(url) {
      octaneUrl = url;
      let SS_ID = octaneUrl.substring(octaneUrl.indexOf('?p=') + 3, octaneUrl.indexOf('?p=') + 7);
      let WS_ID = octaneUrl.substring(octaneUrl.indexOf('?p=') + 8, octaneUrl.indexOf('?p=') + 12);
      let index = octaneUrl.indexOf('/', octaneUrl.indexOf('/') + 2);
      let authenticationUrl = octaneUrl.substring(0, index) + '/authentication/sign_in';
      $scope.model.authenticationData = {
        octaneData: {
          authenticationUrl: authenticationUrl,
          sharedSpaceID: SS_ID,
          workspaceID: WS_ID
        },
        authenticationData: {
          userName: $scope.model.usernameInput,
          password: $scope.model.passwordInput,
          headers: {
            'Content-Type': 'application/json',
            'HPECLIENTTYPE': 'HPE_MQM_UI'
          },
          cookies: {
            HPSSO_COOKIE_CSRF: ''
          }
        }
      };
      generalStorage.save('generalAuthentication', $scope.model.authenticationData);
      generalAuthenticate.authenticate(octaneUrl, $scope.authenticationSuccess, $scope.authenticationFailure);
    });
  };

  $scope.authenticationSuccess = function authenticationSuccess() {
    $scope.model.authenticationStatus = $sce.trustAsHtml('Authentication Success');
  };

  $scope.authenticationFailure = function authenticationFailure() {
    $scope.model.authenticationStatus = $sce.trustAsHtml('Authentication Failed');
  }

});