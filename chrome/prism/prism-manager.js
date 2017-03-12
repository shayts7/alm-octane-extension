angular.module('mainApp').factory('prismManager', function prismManager(prismStorage, prismLogRetrieval, prismParser, prismColor, prismCount, prismInject) {

	function loadFromStorage() {
		return prismStorage.load();
	}

	function saveToStorage(data) {
		prismStorage.save(data);
	}

  function getDataAndColorAUT(jobsList) {
    prismLogRetrieval.retrieveAutomationLogs(jobsList, onGetAutomationLogsDone);
  }

  function onGetAutomationLogsDone(jobsLog) {
    let cssHierarchyWithoutRulesWithDuplications = prismParser.returnParsedLog(jobsLog);
    let cssHierarchyWithoutRulesWithoutDuplications = (prismCount.getCSSSelectors(cssHierarchyWithoutRulesWithDuplications));
    let cssHierarchyWithRules = (prismColor.getCSSSelectorsWithCalculatedRules(cssHierarchyWithoutRulesWithoutDuplications)).join('');
    prismInject.addColoringToAUT(cssHierarchyWithRules);
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
