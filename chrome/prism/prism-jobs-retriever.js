angular.module('mainApp').factory('prismJobsRetriever', function prismJobsRetriever($http, prismStorage) {

  function retrieveJobs(cb) {
    let data = prismStorage.load('prismAuthentication');
    let retrievePipelinesQuery = 'pipelines?expand=$all{fields=name},author{fields=full_name}&inflate=true&query="(id=1002)"';
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
      for (let i = 0; i < res.data[0].current_model.structure.phasesInternal.length; i++) {
        for (let j = 0; j < res.data[0].current_model.structure.phasesInternal[i].jobs.length; j++) {
          jobsList.push(res.data[0].current_model.structure.phasesInternal[i].jobs[j].name);
        }
      }
      let jobsData = {octaneUrl: data.octaneURL, jobList: jobsList};
      prismStorage.save('almOctanePrismJobs', jobsData);
      cb();
    }
    );
  }
  
  return {
    retrieveJobs: retrieveJobs
  };

});
