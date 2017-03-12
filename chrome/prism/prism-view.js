angular.module('mainApp').directive('prismView', function() {
	return {
		scope: {},
		restrict: 'E',
		templateUrl: 'prism/prism-view.html'
	};
});

angular.module('mainApp').controller('prismCtrl', function prismCtrl($scope, prismManager) {

	function loadFromStorage() {
		let data = prismManager.loadFromStorage();
		$scope.model.jobs = data.jobs || [];
	}

	function saveToStorage() {
		let data = {
			jobs: $scope.model.jobs
		};
		prismManager.saveToStorage(data);
	}

	function getActiveJobs() {
		return $scope.model.jobs.filter(function(j) {
			return j.active;
		});
	}

	$scope.model = {
		jobs: [],
		addJobName: '',
		addJobUrl: '',
		uiStrings: {
			titlePrimary: 'Exploratory Testing',
			titleSecondary: 'UI Automation Coverage',
			nameLabel: 'Name:',
			nameInputHint: 'Enter job nickname/alias...',
			urlLabel: 'URL:',
			urlInputHint: 'Enter job console log URL...',
			activateCheckboxTooltip: 'show/hide coverage',
			removeButtonTooltip: 'remove',
			showButtonText: 'Show',
			hideButtonText: 'Hide'
		},
		parsedCSSRules: '',
		isInProgress: false
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
		saveToStorage();
		$scope.model.addJobName = '';
		$scope.model.addJobUrl = '';
	};

	$scope.onRemoveClick = function onRemoveClick(index) {
		$scope.model.jobs.splice(index, 1);
		saveToStorage();
		if ($scope.model.jobs.length === 0) {
			prismManager.removeColoringFromAUT();
		}
	};

	$scope.canShow = function canShow() {
		let activeJobs = getActiveJobs();
		return activeJobs.length > 0 && !$scope.model.isInProgress;
	};

	$scope.onShowClick = function onShowClick() {
		$scope.model.isInProgress = true;
		saveToStorage();
		let activeJobs = getActiveJobs();
		prismManager.getDataAndColorAUT(activeJobs, getDataAndColorAUTDone);
		function getDataAndColorAUTDone() {
			$scope.model.isInProgress = false;
		}
	};

	$scope.canHide = function canHide() {
		return $scope.model.jobs.length > 0 && !$scope.model.isInProgress;
	};

	$scope.onHideClick = function onHideClick() {
		prismManager.removeColoringFromAUT();
	};

	loadFromStorage();

});