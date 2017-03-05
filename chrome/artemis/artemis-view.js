angular.module('mainApp').directive('artemisView', function () {
	return {
		scope: {},
		restrict: 'E',
		templateUrl: 'artemis/artemis-view.html'
	};
});

angular.module('mainApp').controller('artemisCtrl', function artemisCtrl($scope) {

	$scope.model = {
		messageJson: JSON.stringify([{command: 'reset', data: null}], null, 2),
		uiStrings: {
			titlePrimary: 'Natural Language Testing',
			titleSecondary: 'Intuitive Object Locator',
			injectButtonText: 'Inject',
			injectButtonTooltip: 'Inject code to current tab',
			runButtonText: 'Run',
			runButtonTooltip: 'Run Artemis commands code'
		}
	};

	$scope.inject = function(){
		let query = { active: true, currentWindow: true };
		chrome.tabs.query(query,function(tabs){
			if(tabs.length>0) {
				var currentTab = tabs[0];
				chrome.windows.getCurrent(function(currentWin) {
					chrome.runtime.sendMessage({
						type: 'artemis-inject',
						msg: {id: currentTab.id}
					}, function (response) {
						//injected
						//console.log("msg has been sent", currentWin.id, currentTab.id);
					});
				});
				//TODO: add some indication to the AUT that it's artemis-enabled.
			}
		});
	};

	$scope.run = function(){
		let query = { active: true, currentWindow: true };
		chrome.tabs.query(query,function(tabs){
			if(tabs.length>0) {
				var currentTab = tabs[0];
				chrome.windows.getCurrent(function(currentWin) {
					chrome.runtime.sendMessage({
						type: 'artemis-msg',
						msg: $scope.model.messageJson
					}, function (response) {
						//injected
						//console.log("msg has been sent", currentWin.id, currentTab.id);
					});
				});
			}
		});
	};

});
