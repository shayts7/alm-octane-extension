angular.module('mainApp').factory('prismParser', function prismParser() {

  function returnParsedLog(log) {
    let cssHierarchyWithoutRules = [];
    let joinedFullLog = log.join('\n');
    let lines = joinedFullLog.split('\n');
    let arrayOfCSSElementsIncludeXpath = lines.filter(function(line) {
      return line.includes('INFO: Executing Clicking')
    });
    let arrayOfCSSElements = arrayOfCSSElementsIncludeXpath.filter(function(line) {
      return !line.includes('By.xpath:');
    })

    for (let i = 0; i < arrayOfCSSElements.length; i++) {
      cssHierarchyWithoutRules[i] = arrayOfCSSElements[i].substring(arrayOfCSSElements[i].indexOf('({') + 2, arrayOfCSSElements[i].indexOf('})'));
    }

    for (let j = 0; j < cssHierarchyWithoutRules.length; j++) {
      cssHierarchyWithoutRules[j] = cssHierarchyWithoutRules[j].replaceAll(['By.cssSelector:', ',', 'By.className: '], ['', '', " \."]);
    }
    return cssHierarchyWithoutRules;
  }

  String.prototype.replaceAll = function replaceAll(search, replacement) {
    let target = this;
    for (let i = 0; i < search.length; i++) {
      target = target.replace(new RegExp(search[i], 'g'), replacement[i]);
    }
    return target;
  };

  return {
    returnParsedLog: returnParsedLog
  };
});