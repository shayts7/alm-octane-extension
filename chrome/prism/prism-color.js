angular.module('mainApp').factory('prismColor', function prismColor() {
  
  function getCSSSelectorsWithCalculatedRules(cssHierarchyWithoutRules) {
    let cssHierarchyWithRules = [];
    let maxValue = cssHierarchyWithoutRules[0].count;
    for (let i = 0; i < cssHierarchyWithoutRules.length; i++) {
      cssHierarchyWithRules[i] = cssHierarchyWithoutRules[i].selector.concat(" { background-color: #ff" + calculateElementColor(cssHierarchyWithoutRules[i].count, maxValue) + "00 !important; background-image: none !important; outline: 1px solid #ff" + calculateElementColor(cssHierarchyWithoutRules[i].count, maxValue) + "00 !important; }");
    }
    return cssHierarchyWithRules;
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
