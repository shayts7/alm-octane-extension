angular.module('mainApp').directive('generalView', function () {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'general/general-view.html'
    };
});

angular.module('mainApp').controller('generalCtrl', function generalCtrl($scope) {

	$scope.model = {
		uiStrings: {
			titlePrimary: 'General',
			titleSecondary: 'Plugin Configuration'
		}
	}
});