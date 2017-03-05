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
    var singleSelectorInOneLine;
    var cssSingleSelector = [];
    var cssMultipleHierarchy = [];
    var maxValue = sortedElements[0].count;

    for (var j = 0; j < sortedElements.length; j++) {
      var selector = sortedElements[j].selector;
      singleSelectorInOneLine = selector.substring(selector.indexOf('->') + 3, selector.length);
      singleSelectorInOneLine = singleSelectorInOneLine.replace(/: /g, '=');
      cssSingleSelector = singleSelectorInOneLine.split('->');
      for (var i = 0; i < cssSingleSelector.length; i++) {
        if(cssSingleSelector[i].includes('class name')) {
          cssSingleSelector[i] = cssSingleSelector[i].replace('class name=', '\.')
          cssSingleSelector[i] = cssSingleSelector[i].replace(/\]/g, '');
        } else if (cssSingleSelector[i].includes('tag name=')) {
          cssSingleSelector[i] = cssSingleSelector[i].replace('tag name=', '')
          cssSingleSelector[i] = cssSingleSelector[i].replace(/\]/g, '');
        } else if (cssSingleSelector[i].includes('css selector')) {
          cssSingleSelector[i] = cssSingleSelector[i].replace('css selector=', '');
          cssSingleSelector[i] = cssSingleSelector[i].replace(/\]/g, '');
          cssSingleSelector[i] = cssSingleSelector[i].trim().concat(']');
        } else if (cssSingleSelector[i].includes('id=')) {
          cssSingleSelector[i] = cssSingleSelector[i].replace(/\[/g, '');
          cssSingleSelector[i] = cssSingleSelector[i].replace(/\]/g, '');
          cssSingleSelector[i] = '['.concat(cssSingleSelector[i].trim().concat(']'));
        } else if (cssSingleSelector[i].includes('name')) {
          cssSingleSelector[i] = cssSingleSelector[i].replace(/\[/g, '');
          cssSingleSelector[i] = cssSingleSelector[i].replace(/\]/g, '');
          cssSingleSelector[i] = '['.concat(cssSingleSelector[i].trim().concat(']'));
        }
      }
      singleSelectorInOneLine = cssSingleSelector.join(' ');
      cssMultipleHierarchy[j] = singleSelectorInOneLine.concat(" { background-color: #ff" + calculateElementColor(sortedElements[j].count, maxValue) + "00 !important; background-image: none !important; outline: 1px solid #ff" + calculateElementColor(sortedElements[j].count, maxValue) + "00 !important; }");
    }
    return cssMultipleHierarchy;
  }

  return {
    cssSelectorWithCalculatedRule: cssSelectorWithCalculatedRule
  }
});
