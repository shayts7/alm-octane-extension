angular.module('mainApp').factory('prismJobsRetriever', function prismJobsRetriever($http, generalStorage) {

  function retrieveJobs(pipeline, cb) {
    let data = generalStorage.load('generalAuthentication');
    let retrievePipelinesQuery = 'pipelines?expand=$all{fields=name},author{fields=full_name}&inflate=true&query="(id=' + pipeline.pl_id + ')"';
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
      pipeline.pl_jobs = jobsList;
      pipeline.pl_ciServerType = res.data[0].ci_server.server_type;
      pipeline.pl_ciServerUrl = res.data[0].ci_server.url;
      cb(pipeline);
    }
    );
  }

  function retrievePipelines(cb) {
    let plList = [];
    generalStorage.save('almOctanePrismJobs', plList);
    let authenticationData = generalStorage.load('generalAuthentication');
    let req = {
      method: 'GET',
      url: authenticationData.octaneData.authenticationUrl.substring(0, authenticationData.octaneData.authenticationUrl.indexOf('/authentication')) + '/api/shared_spaces/' + authenticationData.octaneData.sharedSpaceID + '/workspaces/' + authenticationData.octaneData.workspaceID + '/pipelines',
    };
    $http(req).then(function check(response) {
      let res = response.data;
      res.data.forEach((pl) => {
        let pipeLineObject = {pl_id: '', pl_name: '', pl_jobs: [], pl_ciServerType: '', pl_ciServerUrl: ''};
        pipeLineObject.pl_id = pl.id;
        pipeLineObject.pl_name = pl.name;
        plList.push(pipeLineObject);
      });
      cb(plList);
    });
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
    retrieveJobs: retrieveJobs,
    retrievePipelines: retrievePipelines
  };

});
