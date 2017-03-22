angular.module('mainApp').factory('prismJobsRetriever', function prismJobsRetriever($http, prismStorage) {

  function retrieveJobs(cb) {
    let data = prismStorage.load('prismAuthentication');
    let retrievePipelinesQuery = 'pipelines?expand=$all{fields=name},author{fields=full_name}&inflate=true&query="(id=51001)"';
    let jobsList = [];
    let req = {
      method: 'GET',
      url: data.octaneURL.substring(0, data.octaneURL.indexOf('/authentication')) + '/api/shared_spaces/' + data.sharedSpaceID + '/workspaces/' + data.workspaceID + '/' + retrievePipelinesQuery,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'HPECLIENTTYPE': 'HPE_MQM_UI',
        'HPSSO-HEADER-CSRF': data.csrf_cookie
      },
    };

    $http(req).then(function check(response) {
      let res = response.data;
      let rootObject = res.data[0].current_model.structure.phasesInternal;
      getJobs(rootObject, jobsList);
      let jobsData = {octaneUrl: data.octaneURL, jobList: jobsList};
      prismStorage.save('almOctanePrismJobs', jobsData);
      cb();
    }
    );
  }

  function getJobs(piObject, jobsArray) {
    piObject.forEach((pi) => {
      pi.jobs.forEach((job) => {
        if (job.phasesInternal.length === 0) {
          if (job.classification && job.classification.name == 'Test') {
            jobsArray.push(job.jobCiId);
          }
        } else {
          getJobs(job.phasesInternal, jobsArray);
        }
      });
    });
  }

  return {
    retrieveJobs: retrieveJobs
  };

});
