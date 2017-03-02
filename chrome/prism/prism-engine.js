angular.module('mainApp').factory('prismEngine', function prismEngine() {
  
  function calculateElementColor(cssElementCount, maxValue) {
    var value = cssElementCount / maxValue;
    var elementColorHex = (parseInt((1 - Number(value)) * 255)).toString(16);

    if (elementColorHex.length == 1) {
      elementColorHex = '0' + elementColorHex;
    }
    return elementColorHex;
  }

  function cssSelectorWithCalculatedRule(sortedElements) {
    var cssHierarchy = [];
    var maxValue = sortedElements[0].count;

    for (var j = 0; j < sortedElements.length; j++) {
      var selector = sortedElements[j].selector;
      cssHierarchy[j] = selector.substring(selector.indexOf('({') + 2, selector.indexOf('})'));
    }

    for (var k = 0; k < cssHierarchy.length; k++) {
      cssHierarchy[k] = cssHierarchy[k].replaceAll(['By.cssSelector:', ',', 'By.className: '], ['', '', " \."]);
      cssHierarchy[k] = cssHierarchy[k].concat(" { background-color: #ff" + calculateElementColor(sortedElements[k].count, maxValue) + "00 !important; background-image: none !important; outline: 1px solid #ff" + calculateElementColor(sortedElements[k].count, maxValue) + "00 !important; }");
    }
    return cssHierarchy;
  }
  
  return {
    cssSelectorWithCalculatedRule: cssSelectorWithCalculatedRule
  }
});
