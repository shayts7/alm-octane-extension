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
	};
	$scope.inject = function(){
		var query = { active: true, currentWindow: true };
		chrome.tabs.query(query,function(tabs){
			if(tabs.length>0) {
				var currentTab = tabs[0];
				chrome.windows.getCurrent(function (currentWin) {
                    chrome.runtime.sendMessage({
                        msg: {id: currentTab.id},
                        type: "inject"
                    }, function (response) {
                        //injected
                    	//console.log("msg has been sent", currentWin.id, currentTab.id);
                    });
                });
			}
		});

	}
});
