angular.module('mainApp').factory('prismManager', function prismManager(prismStorage, prismRetriever, prismParser, prismAggregator, prismColor, prismInject) {

	function loadFromStorage() {
		return prismStorage.load();
	}

	function saveToStorage(data) {
		prismStorage.save(data);
	}

  function getDataAndColorAUT(jobList, cb) {
    prismRetriever.retrieve(jobList, onGetAutomationLogsDone);
  	function onGetAutomationLogsDone(jobLogs) {
		let linesData = prismParser.parseLogs(jobList, jobLogs);
		let cssHierarchyWithoutRulesWithoutDuplications = (prismAggregator.aggregate(linesData));
		let cssHierarchyWithRules = (prismColor.getCSSSelectorsWithCalculatedRules(cssHierarchyWithoutRulesWithoutDuplications)).join('');
		prismInject.addColoringToAUT(cssHierarchyWithRules);
		cb();
	}
  }

  function removeColoringFromAUT() {
    prismInject.removeColoringFromAUT();
  }

  return {
	loadFromStorage: loadFromStorage,
	saveToStorage: saveToStorage,
    getDataAndColorAUT: getDataAndColorAUT,
    removeColoringFromAUT: removeColoringFromAUT
  };

});
