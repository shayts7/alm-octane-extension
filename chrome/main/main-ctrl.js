var mainApp = angular.module('mainApp', [], function() {
});

angular.module('mainApp').controller('mainCtrl', function mainCtrl($scope, $document, $timeout, mainServ) {

	$scope.model = {
		title: 'ALM Octane Extension',
		tabs: [
			{name: 'General', index: 0, isActive: false},
			{name: 'Artemis', index: 1, isActive: true},
			{name: 'Prism', index: 2, isActive: false}
		]
	};
});