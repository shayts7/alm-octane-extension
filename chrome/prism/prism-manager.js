angular.module('mainApp').factory('prismManager', function prismManager(prismLogRetrieval, prismParser, prismColor, prismInject) {

  function getAutomationLogs(jobsList) {
    prismLogRetrieval.retrieveAutomationLogs(jobsList, showUIAutomationCoverage);
  }

  function showUIAutomationCoverage(jobsLog) {
    var cssHierarchyWithoutRules =  prismParser.returnParsedLog(jobsLog);
    var cssHierarchyWithRules = (prismColor.getCSSSelectorsWithCalculatedRules(cssHierarchyWithoutRules)).join('\n');
    prismInject.addStyleToHead(cssHierarchyWithRules);
  }
  
  function removeStyleFromHead() {
    prismInject.removeStyleFromHead();
  }
  
  return {
    getAutomationLogs: getAutomationLogs,
    removeStyleFromHead: removeStyleFromHead
  };
});