angular.module('mainApp').directive('prismView', function () {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: '../prism/prism-view.html'
    };
});

angular.module('mainApp').controller('prismCtrl', function prismCtrl($scope) {

	$scope.model = {
		title: 'PRISM VIEW'
	}
});