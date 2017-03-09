angular.module('mainApp').factory('prismColor', function prismColor() {
  
  function getCSSSelectorsWithCalculatedRules(cssHierarchyWithoutRule) {
    var sortedElements = countAndRemoveDuplications(cssHierarchyWithoutRule);
    var cssHierarchyWithRule = [];
    var maxValue = sortedElements[0].count;

    for (var i = 0; i < sortedElements.length; i++) {
      cssHierarchyWithRule[i] = sortedElements[i].selector.concat(" { background-color: #ff" + calculateElementColor(sortedElements[i].count, maxValue) + "00 !important; background-image: none !important; outline: 1px solid #ff" + calculateElementColor(sortedElements[i].count, maxValue) + "00 !important; }");
    }
    return cssHierarchyWithRule;
  }

  function countAndRemoveDuplications(elementsArray) {
    var mapOfElements = {};
    var sortedElementsListIncludeCount = [];
    for (var i = 0; i < elementsArray.length; i++) {
      var selector = elementsArray[i];
      mapOfElements[selector] = mapOfElements[selector] ? mapOfElements[selector] + 1 : 1;
    }

    for (var sel in mapOfElements) {
      sortedElementsListIncludeCount.push({selector: sel, count: mapOfElements[sel]});
    }

    sortedElementsListIncludeCount.sort(function(sel1, sel2) {
      return sel2.count - sel1.count;
    });
    return sortedElementsListIncludeCount;
  }
  
  function calculateElementColor(cssElementCount, maxValue) {
    var value = cssElementCount / maxValue;
    var elementColorHex = (parseInt((1 - Number(value)) * 255)).toString(16);

    if (elementColorHex.length == 1) {
      elementColorHex = '0' + elementColorHex;
    }
    return elementColorHex;
  }

  return {
    getCSSSelectorsWithCalculatedRules: getCSSSelectorsWithCalculatedRules
  };
});
