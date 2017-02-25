angular.module('mainApp').directive('prismView', function () {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'prism/prism-view.html'
    };
});

angular.module('mainApp').controller('prismCtrl', function prismCtrl($scope) {

	function loadFromLocalStorage() {
		let str = localStorage.getItem('almOctanePrism');
		if (str) {
			let data = JSON.parse(str);
			if (data.jobs) {
				$scope.model.jobs = data.jobs;	
			}
		}
	}

	function saveToLocalStorage() {
		let data = {
			jobs: $scope.model.jobs
		};
		localStorage.setItem('almOctanePrism', JSON.stringify(data));
	}

	$scope.model = {
		jobs: [],
		addJobName: '',
		addJobUrl: '',
		uiStrings: {
			titlePrimary: 'Prism',
			titleSecondary: 'Code Coverage',
			nameLabel: 'Name:',
			nameInputHint: 'Enter job nickname/alias...',
			urlLabel: 'URL:',
			urlInputHint: 'Enter job console log URL...',
			activateCheckboxTooltip: 'show/hide coverage',
			removeButtonTooltip: 'remove',
			showButtonText: 'Show',
			hideButtonText: 'Hide'
		}
	};

	$scope.canAdd = function canAdd() {
		return $scope.model.addJobName && $scope.model.addJobUrl;
	};

	$scope.onAddClick = function onAddClick() {
		$scope.model.jobs.push({
			active: true,
			name: $scope.model.addJobName,
			url: $scope.model.addJobUrl
		});
		saveToLocalStorage();
		$scope.model.addJobName = '';
		$scope.model.addJobUrl = '';
	};

	$scope.onRemoveClick = function onRemoveClick(index) {
		$scope.model.jobs.splice(index, 1);
		saveToLocalStorage();
	};

	$scope.canShow = function canShow() {
		return $scope.model.jobs.length > 0;
	};

	$scope.canHide = function canHide() {
		return false;
	};

	$scope.onShowClick = function onShowClick() {
		saveToLocalStorage();
	};

	$scope.onHideClick = function onHideClick() {
	};

	loadFromLocalStorage();

});