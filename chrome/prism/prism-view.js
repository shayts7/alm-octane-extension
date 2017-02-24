angular.module('mainApp').directive('prismView', function () {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'prism/prism-view.html'
    };
});

angular.module('mainApp').controller('prismCtrl', function prismCtrl($scope) {

	$scope.model = {
		title: 'PRISM',
		showButtonTitle: 'Show',
		hideButtonTitle: 'Hide',
		jobs: [],
		canShow: false,
		canHide: false
	}

	$scope.model.jobs.push({active: true, name: 'Job 1', url: 'http://server:port/build/log'});
	$scope.model.jobs.push({active: true, name: 'Job 2', url: 'http://server:port/build/log'});
	$scope.model.jobs.push({active: true, name: 'Job 3', url: 'http://server:port/build/log'});
	$scope.model.jobs.push({active: true, name: 'Job 4', url: 'http://server:port/build/log'});
	$scope.model.jobs.push({active: true, name: 'Job 5', url: 'http://server:port/build/log'});
});