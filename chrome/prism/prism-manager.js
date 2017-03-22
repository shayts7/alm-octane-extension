angular.module('mainApp').factory('prismManager', function prismManager(generalStorage, prismLogsRetriever, prismParser, prismAggregator, prismColors, prismInjector, prismJobsRetriever) {

	function loadFromStorage(storageItem) {
		return generalStorage.load(storageItem);
	}

	function saveToStorage(storageItem, data) {
		generalStorage.save(storageItem, data);
	}
	
	function loadPipelines() {
		let jobsData = generalStorage.load('almOctanePrismJobs');
		return jobsData.pipelineList;
	}
	
	function retrieveJobs(cb) {
		prismJobsRetriever.retrieveJobs(cb);
	}

	function getDataAndColorAUT(jobList, cb) {
		prismLogsRetriever.retrieve(jobList, onRetrieveLogsDone);
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
		retrieveJobs: retrieveJobs,
		getDataAndColorAUT: getDataAndColorAUT,
		removeColoringFromAUT: removeColoringFromAUT
	};

});
