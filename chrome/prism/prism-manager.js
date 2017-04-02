angular.module('mainApp').factory('prismManager', function prismManager(generalStorage, prismLogsRetriever, prismParser, prismAggregator, prismColors, prismInjector, prismJobsRetriever) {

	function loadFromStorage(storageItem) {
		return generalStorage.load(storageItem);
	}

	function saveToStorage(storageItem, data) {
		generalStorage.save(storageItem, data);
	}
	
	function loadSharedspaces(cb) {
		prismJobsRetriever.retrieveSharedSpaces(function(ssList) {
			cb(ssList);
		});
	}
	
	function loadPipelines(ss_id, ws_id, cb) {
		prismJobsRetriever.retrievePipelines(ss_id, ws_id, function(plList) {
			cb(plList);
		});
	}
	
	function loadJobs(ss_id, ws_id, pipeline, cb) {
		prismJobsRetriever.retrieveJobs(ss_id, ws_id, pipeline, cb);
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
		loadSharedspaces: loadSharedspaces,
		loadPipelines: loadPipelines,
		loadJobs: loadJobs,
		getDataAndColorAUT: getDataAndColorAUT,
		removeColoringFromAUT: removeColoringFromAUT
	};

});
