angular.module('mainApp').factory('prismManager', function prismManager(prismStorage, prismLogsRetriever, prismParser, prismAggregator, prismColors, prismInjector, prismAuthenticate, prismJobsRetriever) {

	function loadFromStorage(storageItem) {
		return prismStorage.load(storageItem);
	}

	function saveToStorage(storageItem, data) {
		prismStorage.save(storageItem, data);
	}
	
	function getCurrentUrl(cb) {
		prismAuthenticate.getCurrentUrl(function(url) {
			cb(url);
		});
	}
	
	function authenticateAndRetrieveJobs() {
		prismAuthenticate.authenticate();
		// prismJobsRetriever.retrieveJobs();
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
		authenticateAndRetrieveJobs: authenticateAndRetrieveJobs,
		retrieveJobs: retrieveJobs,
		getCurrentUrl: getCurrentUrl,
		loadFromStorage: loadFromStorage,
		saveToStorage: saveToStorage,
		getDataAndColorAUT: getDataAndColorAUT,
		removeColoringFromAUT: removeColoringFromAUT
	};

});
