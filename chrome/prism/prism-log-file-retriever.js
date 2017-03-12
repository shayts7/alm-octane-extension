angular.module('mainApp').factory('prismLogRetriever', function prismLogRetriever($http) {

	function retrieveAutomationLogs(jobList, cb) {
		let counter = 0;
		let jobsLogAggregator = [];

		function afterHttpDone() {
			counter++;
			if (counter === jobList.length) {
				cb(jobsLogAggregator);
			}
        }
		jobList.forEach(function(j) {
			$http.get(j.url).then(function onHttpSuccess(response) {
				jobsLogAggregator.push(response.data);
				afterHttpDone();
			}, function onHttpFailure(/*response*/) {
			    alert('Unable to retrieve data from url: ' + j.url);
				afterHttpDone();
			});
        });
	}

	return {
		retrieveAutomationLogs: retrieveAutomationLogs
	};

});
