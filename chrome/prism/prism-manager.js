angular.module('mainApp').factory('prismManager', function prismManager(prismLogRetrieval, prismParser, prismColor, prismCount, prismInject) {

  function _getDataAndColorAUT(jobsList) {
    prismLogRetrieval.retrieveAutomationLogs(jobsList, onGetAutomationLogsDone);
  }

  function onGetAutomationLogsDone(jobsLog) {
    let cssHierarchyWithoutRulesWithDuplications = prismParser.returnParsedLog(jobsLog);
    let cssHierarchyWithoutRulesWithoutDuplications = (prismCount.getCSSSelectors(cssHierarchyWithoutRulesWithDuplications));
    let cssHierarchyWithRules = (prismColor.getCSSSelectorsWithCalculatedRules(cssHierarchyWithoutRulesWithoutDuplications)).join('');
    prismInject.addColoringToAUT(cssHierarchyWithRules);
  }

  function _removeColoringFromAUT() {
    prismInject.removeColoringFromAUT();
  }

  return {
    getDataAndColorAUT: _getDataAndColorAUT,
    removeColoringFromAUT: _removeColoringFromAUT
  };

});
