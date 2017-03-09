angular.module('mainApp').factory('prismLogRetrieval', function prismLogRetrieval($http) {

  function retrieveAutomationLogs(jobsList, cb) {
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
            cb(jobsLogAggregator);
          }
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      }
    }
  }

  return {
    retrieveAutomationLogs: retrieveAutomationLogs
  };
  
});
