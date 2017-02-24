angular.module('mainApp').directive('artemisView', function () {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'artemis/artemis-view.html'
    };
});

angular.module('mainApp').controller('artemisCtrl', function artemisCtrl($scope) {

	$scope.model = {
		uiStrings: {
			titlePrimary: 'Artemis',
			titleSecondary: 'Object Locator'
		}
	}
});