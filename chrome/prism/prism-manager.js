angular.module('mainApp').factory('prismManager', function prismManager(prismStorage, prismLogRetriever, prismParser, prismColor, prismCount, prismInject) {

	function loadFromStorage() {
		return prismStorage.load();
	}

	function saveToStorage(data) {
		prismStorage.save(data);
	}

  function getDataAndColorAUT(jobList, cb) {
    prismLogRetriever.retrieveAutomationLogs(jobList, onGetAutomationLogsDone);
  	function onGetAutomationLogsDone(jobLogs) {
		let cssHierarchyWithoutRulesWithDuplications = prismParser.parseLogs(jobList, jobLogs);
		let cssHierarchyWithoutRulesWithoutDuplications = (prismCount.getCSSSelectors(cssHierarchyWithoutRulesWithDuplications));
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
