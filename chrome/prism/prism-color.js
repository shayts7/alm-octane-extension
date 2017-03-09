angular.module('mainApp').factory('prismColor', function prismColor() {
  
  function getCSSSelectorsWithCalculatedRules(cssHierarchyWithoutRule) {
    let sortedElements = countAndRemoveDuplications(cssHierarchyWithoutRule);
    let cssHierarchyWithRule = [];
    let maxValue = sortedElements[0].count;

    for (let i = 0; i < sortedElements.length; i++) {
      cssHierarchyWithRule[i] = sortedElements[i].selector.concat(" { background-color: #ff" + calculateElementColor(sortedElements[i].count, maxValue) + "00 !important; background-image: none !important; outline: 1px solid #ff" + calculateElementColor(sortedElements[i].count, maxValue) + "00 !important; }");
    }
    return cssHierarchyWithRule;
  }

  function countAndRemoveDuplications(elementsArray) {
    let mapOfElements = {};
    let sortedElementsListIncludeCount = [];
    for (let i = 0; i < elementsArray.length; i++) {
      let selector = elementsArray[i];
      mapOfElements[selector] = mapOfElements[selector] ? mapOfElements[selector] + 1 : 1;
    }

    for (let sel in mapOfElements) {
      sortedElementsListIncludeCount.push({selector: sel, count: mapOfElements[sel]});
    }

    sortedElementsListIncludeCount.sort(function(sel1, sel2) {
      return sel2.count - sel1.count;
    });
    return sortedElementsListIncludeCount;
  }
  
  function calculateElementColor(cssElementCount, maxValue) {
    let value = cssElementCount / maxValue;
    let elementColorHex = (parseInt((1 - Number(value)) * 255)).toString(16);

    if (elementColorHex.length == 1) {
      elementColorHex = '0' + elementColorHex;
    }
    return elementColorHex;
  }

  return {
    getCSSSelectorsWithCalculatedRules: getCSSSelectorsWithCalculatedRules
  };
});
