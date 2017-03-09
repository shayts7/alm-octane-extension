angular.module('mainApp').factory('prismManager', function prismManager(prismLogRetrieval, prismParser, prismColor, prismInject) {

  function _getDataAndColorAUT(jobsList) {
	  prismLogRetrieval.retrieveAutomationLogs(jobsList, onGetAutomationLogsDone);
      function onGetAutomationLogsDone(jobsLog) {
		  let cssHierarchyWithoutRules = prismParser.returnParsedLog(jobsLog);
		  let cssHierarchyWithRules = (prismColor.getCSSSelectorsWithCalculatedRules(cssHierarchyWithoutRules)).join('\n');
		  prismInject.addColoringToAUT(cssHierarchyWithRules);
	  }
  }

  function _removeColoringFromAUT() {
    prismInject.removeColoringFromAUT();
  }

  return {
    getDataAndColorAUT: _getDataAndColorAUT,
    removeColoringFromAUT: _removeColoringFromAUT
  };

});
