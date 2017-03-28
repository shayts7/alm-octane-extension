angular.module('mainApp').factory('prismManager', function prismManager(generalStorage, prismLogsRetriever, prismParser, prismAggregator, prismColors, prismInjector, prismJobsRetriever) {

	function loadFromStorage(storageItem) {
		return generalStorage.load(storageItem);
	}

	function saveToStorage(storageItem, data) {
		generalStorage.save(storageItem, data);
	}
	
	function loadPipelines(cb) {
		prismJobsRetriever.retrievePipelines(function(plList) {
			cb(plList);
		});
	}
	
	function loadJobs(pipeline, cb) {
		prismJobsRetriever.retrieveJobs(pipeline, cb);
	}

	function getDataAndColorAUT(jobList, cb) {
		prismLogsRetriever.retrieveJobsLog(jobList, onRetrieveLogsDone);
		function onRetrieveLogsDone(jobLogs) {
			let linesData = prismParser.parseLogs(jobList, jobLogs);
			let selectorsData = prismAggregator.aggregate(linesData);
			let cssRules = prismColors.getCSSRules(selectorsData);
			prismInjector.addColoringToAUT(cssRules);
			cb();
		}
	}

	function removeColoringFromAUT() {
		prismInjector.removeColoringFromAUT();
	}

	return {
		loadFromStorage: loadFromStorage,
		saveToStorage: saveToStorage,
		loadPipelines: loadPipelines,
		loadJobs: loadJobs,
		getDataAndColorAUT: getDataAndColorAUT,
		removeColoringFromAUT: removeColoringFromAUT
	};

});
