angular.module('mainApp').factory('prismLogsRetriever', function prismLogsRetriever($http) {

	function retrieveJobsLog(jobList, cb) {
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
		retrieveJobsLog: retrieveJobsLog
	};

});
