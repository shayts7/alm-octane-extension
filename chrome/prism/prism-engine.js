angular.module('mainApp').factory('prismEngine', function prismEngine() {
  
  function calculateElementColor(cssElementCount, maxValue) {
    var value = cssElementCount / maxValue;
    var elementColorHex = (parseInt((1 - Number(value)) * 255)).toString(16);

    if (elementColorHex.length == 1) {
      elementColorHex = '0' + elementColorHex;
    }
    return elementColorHex;
  }
  
  return {
    calculateElementColor: calculateElementColor
  }
});
