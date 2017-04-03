angular.module('mainApp').directive('mastercardView', function () {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'mastercard/mastercard-view.html'
    };
});

angular.module('mainApp').controller('mastercardCtrl', function mastercardCtrl($scope) {

	$scope.model = {
		uiStrings: {
			titlePrimary: 'MasterCard',
			titleSecondary: 'Comparing Prod App Usage vs. Test App Coverage'
		}
	}
});