angular.module('mainApp').factory('prismLogsRetriever', function prismLogsRetriever($http, generalStorage) {

  function retrieveJobsLog(jobList, cb) {
    let jobLogs = [];
    let logUrl = '';
    let counter = 0;
    let ciServersUrls = {
      jenkins: {prefix: '/job/', postfix: '/lastStableBuild/consoleText'},
      teamCity: {prefix: '', postfix: ''},
      bamboo: {prefix: '', postfix: ''}
    };
    let pipelinesData = generalStorage.load('almOctanePrismPipelines');
    function afterHttpDone(data) {
      counter++;
      jobLogs.push(data);
      if (counter === jobList.length) {
        cb(jobLogs);
      }
    }
    jobList.forEach(function(job) {
      pipelinesData.pipeline.forEach((pipeline) => {
        if (pipeline.id === job.parentPipelineId) {
          if (pipeline.ciData.serverType === 'jenkins') {
            logUrl = pipeline.ciData.serverUrl + ciServersUrls.jenkins.prefix + job.jobData.name + ciServersUrls.jenkins.postfix;
          } else if (pipeline.ciData.serverType === 'teamcity') {
            logUrl = '';
          } else if (pipeline.ciData.serverType === 'bamboo') {
            logUrl = '';
          }
        }
      });
      $http.get(logUrl).then(function onHttpSuccess(response) {
        afterHttpDone(response.data);
      }, function onHttpFailure(/*response*/) {
        console.log('Unable to retrieve data from url: ' + job.url);
        afterHttpDone(null);
      });
    });
  }

  return {
    retrieveJobsLog: retrieveJobsLog
  };

});
