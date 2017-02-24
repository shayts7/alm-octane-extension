var mainApp = angular.module('mainApp', [], function() {
});

angular.module('mainApp').controller('mainCtrl', function mainCtrl($scope, $document, $timeout, mainServ) {

	$scope.model = {
		title: 'ALM Octane Extension',
		tabs: [
			{title: 'General', id: 'general'},
			{title: 'Artemis', id: 'artemis'},
			{title: 'Prism', id: 'prism'}
		]
	};
	$scope.model.activeTabId = $scope.model.tabs[0].id;

	$scope.onTabClick = function onTabClick(id) {
		$scope.model.activeTabId = id;	
	}

	$scope.onCloseClick = function onCloseClick() {
		window.close();
	}

});