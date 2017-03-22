angular.module('mainApp').factory('prismJobsRetriever', function prismJobsRetriever($http, generalStorage) {

  function retrieveJobs(cb) {
    let data = generalStorage.load('generalAuthentication');
    let retrievePipelinesQuery = 'pipelines?expand=$all{fields=name},author{fields=full_name}&inflate=true&query="(id=51001)"';
    let jobsList = [];
    let req = {
      method: 'GET',
      url: data.octaneData.authenticationUrl.substring(0, data.octaneData.authenticationUrl.indexOf('/authentication')) + '/api/shared_spaces/' + data.octaneData.sharedSpaceID + '/workspaces/' + data.octaneData.workspaceID + '/' + retrievePipelinesQuery,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'HPECLIENTTYPE': 'HPE_MQM_UI',
        'HPSSO-HEADER-CSRF': data.authenticationData.cookies['HPSSO-HEADER-CSRF']
      },
    };

    $http(req).then(function check(response) {
      let res = response.data;
      let rootObject = res.data[0].current_model.structure.phasesInternal;
      getJobs(rootObject, jobsList);
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
    let jobsData = generalStorage.load('almOctanePrismJobs');
    jobsData.jobList = jobsArray;
    generalStorage.save('almOctanePrismJobs', jobsData);
  }

  return {
    retrieveJobs: retrieveJobs
  };

});
