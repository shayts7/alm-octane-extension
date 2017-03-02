angular.module('mainApp').factory('prismParser', function prismParser($http, $filter, prismEngine) {

  function getAutomationLogs(jobsList, cb) {
    var counter = 0;
    var jobsLogAggregator = [];

    for (var j = 0; j < jobsList.length; j++) {
      if (jobsList[j].active === true) {
        $http.get(jobsList[j].url).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          jobsLogAggregator.push(response.data);
          counter++;
          if (counter === jobsList.length) {
            cb(returnedParsedOutput(jobsLogAggregator, jobsList));
          }
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      }
    }
  }

  function returnedParsedOutput(fullLog) {
    var joinedFullLog = fullLog.join('\n');
    var lines = joinedFullLog.split('\n');
    var arrayOfCSSElementsIncludeXpath = lines.filter(function(line) {return line.includes('INFO: Executing Clicking')});
    var arrayOfCSSElements = arrayOfCSSElementsIncludeXpath.filter(function(line) {
      return !line.includes('By.xpath:');
    })
    return countDuplications(arrayOfCSSElements);
  }

  function countDuplications(elementsArray) {
    var mapOfElements = {};
    var sortedElementList = [];
    for (var i = 0; i < elementsArray.length; i++) {
      var selector = elementsArray[i];
      mapOfElements[selector] = mapOfElements[selector] ? mapOfElements[selector] + 1 : 1;
    }

    for (var sel in mapOfElements) {
      sortedElementList.push({selector: sel, count: mapOfElements[sel]});
    }

    sortedElementList.sort(function(sel1, sel2) {
      return sel2.count - sel1.count;
    });
    return prismEngine.cssSelectorWithCalculatedRule(sortedElementList);
  }
  

  String.prototype.replaceAll = function replaceAll(search, replacement) {
    var target = this;
    for (var i = 0; i < search.length; i++) {
      target = target.replace(new RegExp(search[i], 'g'), replacement[i]);
    }
    return target;
  };

  return {
    getAutomationLogs: getAutomationLogs
  };
});