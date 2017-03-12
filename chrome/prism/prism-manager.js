angular.module('mainApp').factory('prismManager', function prismManager(prismStorage, prismRetriever, prismParser, prismAggregator, prismColors, prismInjector) {

	function loadFromStorage() {
		return prismStorage.load();
	}

	function saveToStorage(data) {
		prismStorage.save(data);
	}

  function getDataAndColorAUT(jobList, cb) {
    prismRetriever.retrieve(jobList, onRetrieveLogsDone);
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
    getDataAndColorAUT: getDataAndColorAUT,
    removeColoringFromAUT: removeColoringFromAUT
  };

});
