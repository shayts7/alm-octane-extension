angular.module('mainApp').factory('prismJobsRetriever', function prismJobsRetriever($http, generalStorage) {

  function retrieveSharedSpaces(cb) {
    let ssList = [];
    let authenticationData = generalStorage.load('generalAuthentication');
    let req = {
      method: 'GET',
      url: authenticationData.octaneURL + '/api/shared_spaces'
    };
    $http(req).then(function onHttpSuccess(response) {
      let res = response.data;
      for (let i = 0; i < res.data.length; i++) {
        let sharedSpaceObject = {id: '', name: '', workspaces: []};
        sharedSpaceObject.id = res.data[i].id;
        sharedSpaceObject.name = res.data[i].name;
        getWorkspaces(sharedSpaceObject, function(wsList) {
          sharedSpaceObject.workspaces = wsList;
          ssList.push(sharedSpaceObject);
          cb(ssList);
        });
      }
    }, function onHttpFailure(response) {
    });
  }

  function retrievePipelines(ss_id, ws_id, cb) {
    let plList = [];
    let authenticationData = generalStorage.load('generalAuthentication');
    let req = {
      method: 'GET',
      url: authenticationData.octaneURL + '/api/shared_spaces/' + ss_id + '/workspaces/' + ws_id + '/pipelines'
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

  function retrieveJobs(ss_id, ws_id, pipeline, cb) {
    let data = generalStorage.load('generalAuthentication');
    let retrievePipelinesQuery = 'pipelines?expand=$all{fields=name},author{fields=full_name}&inflate=true&query="(id=' + pipeline.pl_id + ')"';
    let jobsList = [];
    let req = {
      method: 'GET',
      url: data.octaneURL + '/api/shared_spaces/' + ss_id + '/workspaces/' + ws_id + '/' + retrievePipelinesQuery,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'HPECLIENTTYPE': 'HPE_MQM_UI',
        'HPSSO-HEADER-CSRF': data.cookies['HPSSO-HEADER-CSRF']
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

  function getJobs(piObject, jobsArray) {
    let isUIJob = false;
    piObject.forEach((pi) => {
      pi.jobs.forEach((job) => {
        if (job.phasesInternal.length === 0 && job.taxonomies.length > 0) {
          for (let i = 0; i < job.taxonomies.length; i++) {
            if (job.taxonomies[i].name === 'UI') {
              isUIJob = true;
              break;
            }
          }
          if (isUIJob === true) {
            jobsArray.push(job.jobCiId);
          }
        } else {
          getJobs(job.phasesInternal, jobsArray);
        }
      });
    });
  }

  function getWorkspaces(ssObject, cb) {
    let wsList = [];
    let authenticationData = generalStorage.load('generalAuthentication');
    let req = {
      method: 'GET',
      url: authenticationData.octaneURL + '/api/shared_spaces/' + ssObject.id + '/workspaces'
    };
    $http(req).then(function onHttpSuccess(response) {
      let res = response.data;
      res.data.forEach((ws) => {
        let wsObject = {id: '', name: ''};
        wsObject.id = ws.id;
        wsObject.name = ws.name;
        wsList.push(wsObject);
      });
      cb(wsList);
    });
  }

  return {
    retrieveSharedSpaces: retrieveSharedSpaces,
    retrievePipelines: retrievePipelines,
    retrieveJobs: retrieveJobs
  };
}
);
