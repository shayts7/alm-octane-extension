angular.module('mainApp').directive('generalView', function () {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'general/general-view.html'
    };
});

angular.module('mainApp').controller('generalCtrl', function generalCtrl($scope, generalAuthenticate) {

	$scope.model = {
		uiStrings: {
			titlePrimary: 'General Settings',
			titleSecondary: 'Plugin Configuration'
		},
		authenticationStatus: '',
		usernameInput: '',
		passwordInput: ''
	};
	
	$scope.canAuthenticate = function canAuthenticate() {
		return $scope.model.usernameInput && $scope.model.passwordInput;
	};

	$scope.onLoginClick = function authenticate() {
		let octaneUrl = generalAuthenticate.getCurrentUrl();
		let SS_ID = octaneUrl.substring(octaneUrl.indexOf('?p=') + 3, octaneUrl.indexOf('?p=') + 7);
		let WS_ID = octaneUrl.substring(octaneUrl.indexOf('?p=') + 8, octaneUrl.indexOf('?p=') + 12);
		let index = octaneUrl.indexOf('/', octaneUrl.indexOf('/') + 2);
		let authenticationUrl = octaneUrl.substring(0, index) + '/authentication/sign_in';
		let data = {octaneURL: authenticationUrl, userName: $scope.model.addUserName, password: $scope.model.addPassword, csrf_cookie: '', sharedSpaceID: SS_ID, workspaceID: WS_ID};
		localStorage.setItem('prismAuthentication', JSON.stringify(data));
		prismManager.authenticateAndRetrieveJobs();

	}
});