angular.module('mainApp').directive('prismView', function () {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'prism/prism-view.html'
    };
});

angular.module('mainApp').controller('prismCtrl', function prismCtrl($scope) {

	$scope.model = {
		jobs: [],
		addJobName: '',
		addJobUrl: '',
		uiStrings: {
			title: 'PRISM',
			nameLabel: 'Name:',
			nameInputHint: 'Enter job nickname/alias...',
			urlLabel: 'URL:',
			urlInputHint: 'Enter job console log URL...',
			addButton: '+',
			showButton: 'Show',
			hideButton: 'Hide'
		}
	}

	$scope.model.jobs.push({active: true, name: 'Job 1', url: 'http://server:port/build/log'});
	$scope.model.jobs.push({active: true, name: 'Job 2', url: 'http://server:port/build/log'});
	$scope.model.jobs.push({active: true, name: 'Job 3', url: 'http://server:port/build/log'});
	$scope.model.jobs.push({active: true, name: 'Job 4', url: 'http://server:port/build/log'});
	$scope.model.jobs.push({active: true, name: 'Job 5', url: 'http://server:port/build/log'});

	$scope.canAdd = function canAdd() {
		return $scope.model.addJobName && $scope.model.addJobUrl;
	}

	$scope.canShow = function canShow() {
		return $scope.model.jobs.length > 0;
	}

	$scope.canHide = function canHide() {
		return false;
	}

});