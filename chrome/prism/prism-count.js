angular.module('mainApp').factory('prismCount', function prismCount() {

  function getCSSSelectors(cssHierarchyWithoutRule) {
    let sortedElements = countAndRemoveDuplications(cssHierarchyWithoutRule);
    let selectorsData = [];
    let selectorsCount = 0;

    for (let i = 0; i < sortedElements.length; i++) {
      if(sortedElements[i].selector.includes(' .')) {
        selectorsCount++;
      }
      selectorsCount += (sortedElements[i].selector.match(/\[/g) || []).length;
      selectorsData.push({selector: sortedElements[i].selector, count: sortedElements[i].count, hasXpath: false, selectorLength: selectorsCount});
      selectorsCount = 0;
    }
    return selectorsData;
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

  return {
    getCSSSelectors: getCSSSelectors
  };
});
