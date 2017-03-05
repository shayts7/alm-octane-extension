angular.module('mainApp').factory('prismParser', function prismParser($http, $filter, prismEngine) {

  function getAutomationLogs(jobsList, cb) {
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
            cb(returnedParsedOutput(jobsLogAggregator, jobsList));
          }
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      }
    }
  }

  function returnedParsedOutput() {
    var fullLog = "13:25:38.113 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [new session: Capabilities [{name=Testing Selenium, loggingPrefs=org.openqa.selenium.logging.LoggingPreferences@4e7a1266, browserName=chrome, chromeOptions={args=[--start-maximized, --incognito], extensions=[]}, version=ANY, platform=WINDOWS}]])\n13:25:38.115 INFO [352] org.openqa.selenium.remote.server.DefaultDriverProvider - Creating a new session for Capabilities [{name=Testing Selenium, loggingPrefs=org.openqa.selenium.logging.LoggingPreferences@4e7a1266, browserName=chrome, chromeOptions={args=[--start-maximized, --incognito], extensions=[]}, version=ANY, platform=WINDOWS}]\n13:25:40.060 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [new session: Capabilities [{name=Testing Selenium, loggingPrefs=org.openqa.selenium.logging.LoggingPreferences@4e7a1266, browserName=chrome, chromeOptions={args=[--start-maximized, --incognito], extensions=[]}, version=ANY, platform=WINDOWS}]]"
    + "\n13:25:40.095 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [implicitly wait: 30000])"
    + "\n13:25:40.097 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [implicitly wait: 30000]"
    + "\n13:25:40.101 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [get: https://www.youtube.com])"
    + "\n13:25:42.666 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [get: https://www.youtube.com]"
    + "\n13:25:42.677 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [find element: By.id: masthead-positioner])"
    + "\n13:25:42.690 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [find element: By.id: masthead-positioner]"
    + "\n13:25:42.697 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [find child element: 0 [[ChromeDriver: chrome on WIN8_1 (728829a30b6b8856992a07d3b2646555)] -> id: masthead-positioner], By.cssSelector: input[id=masthead-search-term]])"
    + "\n13:25:42.710 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [find child element: 0 [[ChromeDriver: chrome on WIN8_1 (728829a30b6b8856992a07d3b2646555)] -> id: masthead-positioner], By.cssSelector: input[id=masthead-search-term]]"
    + "\n13:25:42.714 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [click: 1 [[[[ChromeDriver: chrome on WIN8_1 (728829a30b6b8856992a07d3b2646555)] -> id: masthead-positioner]] -> css selector: input[id=masthead-search-term]]])"
    + "\n13:25:42.749 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [click: 1 [[[[ChromeDriver: chrome on WIN8_1 (728829a30b6b8856992a07d3b2646555)] -> id: masthead-positioner]] -> css selector: input[id=masthead-search-term]]]"
    + "\n13:25:42.755 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [delete session: a61db11d-71c4-485c-9f80-65fd6999c72b])"
    + "\n13:25:43.519 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [delete session: a61db11d-71c4-485c-9f80-65fd6999c72b]"
    + "\n13:25:43.526 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [new session: Capabilities [{name=Testing Selenium, loggingPrefs=org.openqa.selenium.logging.LoggingPreferences@4a479e21, browserName=chrome, chromeOptions={args=[--start-maximized, --incognito], extensions=[]}, version=ANY, platform=WINDOWS}]])"
    + "\n13:25:43.527 INFO [361] org.openqa.selenium.remote.server.DefaultDriverProvider - Creating a new session for Capabilities [{name=Testing Selenium, loggingPrefs=org.openqa.selenium.logging.LoggingPreferences@4a479e21, browserName=chrome, chromeOptions={args=[--start-maximized, --incognito], extensions=[]}, version=ANY, platform=WINDOWS}]"
    + "\n13:25:45.489 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [new session: Capabilities [{name=Testing Selenium, loggingPrefs=org.openqa.selenium.logging.LoggingPreferences@4a479e21, browserName=chrome, chromeOptions={args=[--start-maximized, --incognito], extensions=[]}, version=ANY, platform=WINDOWS}]]"
    + "\n13:25:45.497 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [implicitly wait: 30000])"
    + "\n13:25:45.500 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [implicitly wait: 30000]"
    + "\n13:25:45.506 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [get: https://www.youtube.com])"
    + "\n13:25:47.811 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [get: https://www.youtube.com]"
    + "\n13:25:47.815 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [find element: By.id: masthead-positioner])"
    + "\n13:25:47.828 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [find element: By.id: masthead-positioner]"
    + "\n13:25:47.833 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [find child element: 0 [[ChromeDriver: chrome on WIN8_1 (f18c06274d921f744cbdcc1c69972c89)] -> id: masthead-positioner], By.name: search_query])"
    + "\n13:25:47.846 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [find child element: 0 [[ChromeDriver: chrome on WIN8_1 (f18c06274d921f744cbdcc1c69972c89)] -> id: masthead-positioner], By.name: search_query]"
    + "\n13:25:47.852 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [click: 1 [[[[ChromeDriver: chrome on WIN8_1 (f18c06274d921f744cbdcc1c69972c89)] -> id: masthead-positioner]] -> name: search_query]])"
    + "\n13:25:47.889 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [click: 1 [[[[ChromeDriver: chrome on WIN8_1 (f18c06274d921f744cbdcc1c69972c89)] -> id: masthead-positioner]] -> name: search_query]]"
    + "\n13:25:47.893 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [delete session: ee692b2e-cc91-4495-b6ad-622689864a6c])"
    + "\n13:25:48.711 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [delete session: ee692b2e-cc91-4495-b6ad-622689864a6c]"
    + "\n13:25:48.716 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [new session: Capabilities [{name=Testing Selenium, loggingPrefs=org.openqa.selenium.logging.LoggingPreferences@62a5e194, browserName=chrome, chromeOptions={args=[--start-maximized, --incognito], extensions=[]}, version=ANY, platform=WINDOWS}]])"
    + "\n13:25:48.717 INFO [370] org.openqa.selenium.remote.server.DefaultDriverProvider - Creating a new session for Capabilities [{name=Testing Selenium, loggingPrefs=org.openqa.selenium.logging.LoggingPreferences@62a5e194, browserName=chrome, chromeOptions={args=[--start-maximized, --incognito], extensions=[]}, version=ANY, platform=WINDOWS}]"
    + "\n13:25:50.736 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [new session: Capabilities [{name=Testing Selenium, loggingPrefs=org.openqa.selenium.logging.LoggingPreferences@62a5e194, browserName=chrome, chromeOptions={args=[--start-maximized, --incognito], extensions=[]}, version=ANY, platform=WINDOWS}]]"
    + "\n13:25:50.743 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [implicitly wait: 30000])"
    + "\n13:25:50.746 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [implicitly wait: 30000]"
    + "\n13:25:50.751 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [get: https://www.youtube.com])"
    + "\n13:25:53.363 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [get: https://www.youtube.com]"
    + "\n13:25:53.369 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [find element: By.id: masthead-positioner])"
    + "\n13:25:53.382 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [find element: By.id: masthead-positioner]"
    + "\n13:25:53.386 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [find child element: 0 [[ChromeDriver: chrome on WIN8_1 (951dd293aa03e79512c747fbf567bba2)] -> id: masthead-positioner], By.tagName: form])"
    + "\n13:25:53.399 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [find child element: 0 [[ChromeDriver: chrome on WIN8_1 (951dd293aa03e79512c747fbf567bba2)] -> id: masthead-positioner], By.tagName: form]"
    + "\n13:25:53.402 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [click: 1 [[[[ChromeDriver: chrome on WIN8_1 (951dd293aa03e79512c747fbf567bba2)] -> id: masthead-positioner]] -> tag name: form]])"
    + "\n13:25:53.438 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [click: 1 [[[[ChromeDriver: chrome on WIN8_1 (951dd293aa03e79512c747fbf567bba2)] -> id: masthead-positioner]] -> tag name: form]]"
    + "\n13:25:53.443 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [delete session: 25bf9cbb-09a4-4157-b00d-0acbbfacc09b])"
    + "\n13:25:54.260 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [delete session: 25bf9cbb-09a4-4157-b00d-0acbbfacc09b]"
    + "\n13:25:54.268 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [new session: Capabilities [{name=Testing Selenium, loggingPrefs=org.openqa.selenium.logging.LoggingPreferences@102b53e0, browserName=chrome, chromeOptions={args=[--start-maximized, --incognito], extensions=[]}, version=ANY, platform=WINDOWS}]])"
    + "\n13:25:59.872 INFO [388] org.openqa.selenium.remote.server.DefaultDriverProvider - Creating a new session for Capabilities [{name=Testing Selenium, loggingPrefs=org.openqa.selenium.logging.LoggingPreferences@3fafd271, browserName=chrome, chromeOptions={args=[--start-maximized, --incognito], extensions=[]}, version=ANY, platform=WINDOWS}]"
    + "\n13:26:01.876 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [new session: Capabilities [{name=Testing Selenium, loggingPrefs=org.openqa.selenium.logging.LoggingPreferences@3fafd271, browserName=chrome, chromeOptions={args=[--start-maximized, --incognito], extensions=[]}, version=ANY, platform=WINDOWS}]]"
    + "\n13:26:01.885 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [implicitly wait: 30000])"
    + "\n13:26:01.889 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [implicitly wait: 30000]"
    + "\n13:26:01.895 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [get: https://www.youtube.com])"
    + "\n13:26:04.477 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [get: https://www.youtube.com]"
    + "\n13:26:04.481 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [find element: By.id: masthead-positioner])"
    + "\n13:26:04.494 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [find element: By.id: masthead-positioner]"
    + "\n13:26:04.499 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [find child element: 0 [[ChromeDriver: chrome on WIN8_1 (d7c3befc891ff32f6b7a0a4ffb69fa3c)] -> id: masthead-positioner], By.className: signin-container])"
    + "\n13:26:04.516 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [find child element: 0 [[ChromeDriver: chrome on WIN8_1 (d7c3befc891ff32f6b7a0a4ffb69fa3c)] -> id: masthead-positioner], By.className: signin-container]"
    + "\n13:26:04.522 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [click: 1 [[[[ChromeDriver: chrome on WIN8_1 (d7c3befc891ff32f6b7a0a4ffb69fa3c)] -> id: masthead-positioner]] -> class name: signin-container]])"
    + "\n13:26:05.420 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [click: 1 [[[[ChromeDriver: chrome on WIN8_1 (d7c3befc891ff32f6b7a0a4ffb69fa3c)] -> id: masthead-positioner]] -> class name: signin-container]]"
    + "\n13:26:05.429 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [delete session: ae65e69d-be09-4f2b-a952-f006e83c28da])"
    + "\n13:26:06.269 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [delete session: ae65e69d-be09-4f2b-a952-f006e83c28da]"
    + "\n13:26:06.275 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [new session: Capabilities [{name=Testing Selenium, loggingPrefs=org.openqa.selenium.logging.LoggingPreferences@69b0cd2a, browserName=chrome, chromeOptions={args=[--start-maximized, --incognito], extensions=[]}, version=ANY, platform=WINDOWS}]])"
    + "\n13:26:06.276 INFO [397] org.openqa.selenium.remote.server.DefaultDriverProvider - Creating a new session for Capabilities [{name=Testing Selenium, loggingPrefs=org.openqa.selenium.logging.LoggingPreferences@69b0cd2a, browserName=chrome, chromeOptions={args=[--start-maximized, --incognito], extensions=[]}, version=ANY, platform=WINDOWS}]"
    + "\n13:26:08.195 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [new session: Capabilities [{name=Testing Selenium, loggingPrefs=org.openqa.selenium.logging.LoggingPreferences@69b0cd2a, browserName=chrome, chromeOptions={args=[--start-maximized, --incognito], extensions=[]}, version=ANY, platform=WINDOWS}]]"
    + "\n13:26:08.203 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [implicitly wait: 30000])"
    + "\n13:26:08.208 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [implicitly wait: 30000]"
    + "\n13:26:08.213 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [get: https://www.youtube.com])"
    + "\n13:26:11.320 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [get: https://www.youtube.com]"
    + "\n13:26:11.325 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [find element: By.id: masthead-positioner])"
    + "\n13:26:11.343 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [find element: By.id: masthead-positioner]"
    + "\n13:26:11.348 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [find child element: 0 [[ChromeDriver: chrome on WIN8_1 (ef7722e61acd5e2cef5e2d5728233e6d)] -> id: masthead-positioner], By.id: yt-masthead-logo-fragment])"
    + "\n13:26:11.365 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [find child element: 0 [[ChromeDriver: chrome on WIN8_1 (ef7722e61acd5e2cef5e2d5728233e6d)] -> id: masthead-positioner], By.id: yt-masthead-logo-fragment]"
    + "\n13:26:11.369 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [click: 1 [[[[ChromeDriver: chrome on WIN8_1 (ef7722e61acd5e2cef5e2d5728233e6d)] -> id: masthead-positioner]] -> id: yt-masthead-logo-fragment]])"
    + "\n13:26:11.426 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [click: 1 [[[[ChromeDriver: chrome on WIN8_1 (ef7722e61acd5e2cef5e2d5728233e6d)] -> id: masthead-positioner]] -> id: yt-masthead-logo-fragment]]"
    + "\n13:26:11.430 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Executing: [delete session: 9fd8641a-2dd4-4815-bc89-dbee150cd52b])"
    + "\n13:26:12.319 INFO [16] org.openqa.selenium.remote.server.DriverServlet - Done: [delete session: 9fd8641a-2dd4-4815-bc89-dbee150cd52b]";
    var lines = fullLog.split('\n');
    var arrayOfCSSElementsIncludeXpath = lines.filter(function(line) {return line.includes('Done: [click:')});
    return countDuplications(arrayOfCSSElementsIncludeXpath);
  }

  function countDuplications(elementsArray) {
    var mapOfElements = {};
    var sortedElementList = [];
    for (var i = 0; i < elementsArray.length; i++) {
      var selector = elementsArray[i];
      mapOfElements[selector] = mapOfElements[selector] ? mapOfElements[selector] + 1 : 1;
    }

    for (var sel in mapOfElements) {
      sortedElementList.push({selector: sel, count: mapOfElements[sel]});
    }

    sortedElementList.sort(function(sel1, sel2) {
      return sel2.count - sel1.count;
    });
    return prismEngine.cssSelectorWithCalculatedRule(sortedElementList);
  }
  

  String.prototype.replaceAll = function replaceAll(search, replacement) {
    var target = this;
    for (var i = 0; i < search.length; i++) {
      target = target.replace(new RegExp(search[i], 'g'), replacement[i]);
    }
    return target;
  };

  return {
    returnedParsedOutput: returnedParsedOutput
  };
});