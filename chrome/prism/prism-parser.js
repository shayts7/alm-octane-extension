angular.module('mainApp').factory('prismParser', function prismParser() {

  function returnParsedLog(log) {
    var cssHierarchyWithoutRules = [];
    var joinedFullLog = log.join('\n');
    var lines = joinedFullLog.split('\n');
    var arrayOfCSSElementsIncludeXpath = lines.filter(function(line) {
      return line.includes('INFO: Executing Clicking')
    });
    var arrayOfCSSElements = arrayOfCSSElementsIncludeXpath.filter(function(line) {
      return !line.includes('By.xpath:');
    })

    for (var i = 0; i < arrayOfCSSElements.length; i++) {
      cssHierarchyWithoutRules[i] = arrayOfCSSElements[i].substring(arrayOfCSSElements[i].indexOf('({') + 2, arrayOfCSSElements[i].indexOf('})'));
    }

    for (var j = 0; j < cssHierarchyWithoutRules.length; j++) {
      cssHierarchyWithoutRules[j] = cssHierarchyWithoutRules[j].replaceAll(['By.cssSelector:', ',', 'By.className: '], ['', '', " \."]);
    }
    return cssHierarchyWithoutRules;
  }

  String.prototype.replaceAll = function replaceAll(search, replacement) {
    var target = this;
    for (var i = 0; i < search.length; i++) {
      target = target.replace(new RegExp(search[i], 'g'), replacement[i]);
    }
    return target;
  };

  return {
    returnParsedLog: returnParsedLog
  };
});