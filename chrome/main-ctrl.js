var mainApp = angular.module('mainApp', [], function() {
});

angular.module('mainApp').controller('mainCtrl', function mainCtrl($scope) {

	$scope.model = {
		title: 'ALM Octane Extension',
		tabs: [
			{title: 'General', id: 'general'},
			{title: 'Artemis', id: 'artemis'},
			{title: 'Prism', id: 'prism'}
		]
	};

	
	if(localStorage.getItem('activeTab') === ''){
		$scope.model.activeTabId = $scope.model.tabs[0].id;
	} else {
		$scope.model.activeTabId = localStorage.getItem('activeTab');
	}

	$scope.onTabClick = function onTabClick(id) {
		localStorage.setItem('activeTab', id);
		$scope.model.activeTabId = id;	
	}

	$scope.onCloseClick = function onCloseClick() {
		window.close();
	}

});