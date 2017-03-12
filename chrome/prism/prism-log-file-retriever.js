angular.module('mainApp').factory('prismLogRetriever', function prismLogRetriever($http) {

	function retrieveAutomationLogs(jobList, cb) {
		let jobLogs = [];
		let counter = 0;
		function afterHttpDone(data) {
			counter++;
			jobLogs.push(data);
			if (counter === jobList.length) {
				cb(jobLogs);
			}
        }
		jobList.forEach(function(j) {
			$http.get(j.url).then(function onHttpSuccess(response) {
				afterHttpDone(response.data);
			}, function onHttpFailure(/*response*/) {
			    console.log('Unable to retrieve data from url: ' + j.url);
				afterHttpDone(null);
			});
        });
	}

	return {
		retrieveAutomationLogs: retrieveAutomationLogs
	};

});
