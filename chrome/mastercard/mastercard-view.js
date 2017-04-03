angular.module('mainApp').directive('mastercardView', function () {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'mastercard/mastercard-view.html'
    };
});

angular.module('mainApp').controller('mastercardCtrl', function mastercardCtrl($scope, $http, prismManager, prismAggregator, prismColors, prismInjector) {

	$scope.model = {
		uiStrings: {
			titlePrimary: 'MasterCard',
			titleSecondary: 'Comparing Prod App Usage vs. Test App Coverage',
			showButtonText: 'Show',
            hideButtonText: 'Hide'
		}
	};

	$scope.onShowClick = function onShowClick() {
		$scope.model.isInProgress = true;
		getData(getDataDone);

		function getDataDone() {
			$scope.model.isInProgress = false;
		}
	};

    $scope.onHideClick = function onHideClick() {
        prismManager.removeColoringFromAUT();
    };

	$scope.canShow = function canShow() {
		return !$scope.model.isInProgress;
	};

    $scope.canHide = function canHide() {
        return !$scope.model.isInProgress;
    };

	function getData(cb) {
		$http.post('http://35.157.160.56:9200/poc_mastercard/_search', {
			"fields": [
				"selector"
			]
		}).then(function onHttpSuccess(response) {
			getDataAndColorAUT(response.data);
		}, function onHttpFailure(/*response*/) {
			console.log('Unable to retrieve data from bdi');
		});

		cb();
	}
	
	function getDataAndColorAUT(data) {
		let linesData = parseData(data);
		let selectorsData = prismAggregator.aggregate(linesData);
		let cssRules = prismColors.getCSSRules(selectorsData);
		prismInjector.addColoringToAUT(cssRules);
	}

	function parseData(data) {
		let arr = [];
		arr.push({
			source: undefined,
			lines: getLines(data)
		});

		return arr;
	}

	function getLines(data) {
		let arr = [];
		for (let i = 0; i < data.hits.hits.length; i++) {
			arr.push(data.hits.hits[i].fields.selector[0]);
		}
		return arr;
	}
});