angular.module('mainApp').factory('prismParser', function prismParser() {

  String.prototype.replaceAll = function replaceAll(search, replacement) {
    let target = this;
    for (let i = 0; i < search.length; i++) {
      target = target.replace(new RegExp(search[i], 'g'), replacement[i]);
    }
    return target;
  };

  function parseOctaneLog(log) {
    let rules = [];
    let lines = log.split('\n');
    let relevantLines = lines.filter(function(line) {
      return line.includes('INFO: Executing Clicking') && !line.includes('By.xpath:')
    });
    relevantLines.forEach(function(line) {
      line = line.substring(line.indexOf('({') + 2, line.indexOf('})')).replaceAll(['By.cssSelector:', ',', 'By.className: '], ['', '', " \."]);
      rules.push(line.trim());
    });
    return rules;
  }

  function parseSeleniumLog(log) {
    let rules = [];
    let arrayOfLineSelectors = [];
    let lines = log.split('\n');

    let relevantLines = lines.filter(function(line) {
      return line.includes('Done: [click:')
    });

    relevantLines.forEach(function(line) {
      line = line.substring(line.indexOf('->') + 3, line.length);
      line = line.replace(/: /g, '=');
      arrayOfLineSelectors = line.split('->');
      for (let i = 0; i < arrayOfLineSelectors.length; i++) {
        if (arrayOfLineSelectors[i].includes('class name')) {
          arrayOfLineSelectors[i] = arrayOfLineSelectors[i].replace('class name=', '\.');
          arrayOfLineSelectors[i] = arrayOfLineSelectors[i].replace(/\]/g, '');
        } else if (arrayOfLineSelectors[i].includes('tag name=')) {
          arrayOfLineSelectors[i] = arrayOfLineSelectors[i].replace('tag name=', '');
          arrayOfLineSelectors[i] = arrayOfLineSelectors[i].replace(/\]/g, '');
        } else if (arrayOfLineSelectors[i].includes('css selector')) {
          arrayOfLineSelectors[i] = arrayOfLineSelectors[i].replace('css selector=', '');
          arrayOfLineSelectors[i] = arrayOfLineSelectors[i].replace(/\]/g, '');
          arrayOfLineSelectors[i] = arrayOfLineSelectors[i].trim().concat(']');
        } else if (arrayOfLineSelectors[i].includes('id=')) {
          arrayOfLineSelectors[i] = arrayOfLineSelectors[i].replace(/\[/g, '');
          arrayOfLineSelectors[i] = arrayOfLineSelectors[i].replace(/\]/g, '');
          arrayOfLineSelectors[i] = '['.concat(arrayOfLineSelectors[i].trim().concat(']'));
        } else if (arrayOfLineSelectors[i].includes('name')) {
          arrayOfLineSelectors[i] = arrayOfLineSelectors[i].replace(/\[/g, '');
          arrayOfLineSelectors[i] = arrayOfLineSelectors[i].replace(/\]/g, '');
          arrayOfLineSelectors[i] = '['.concat(arrayOfLineSelectors[i].trim().concat(']'));
        }
      }
      line = arrayOfLineSelectors.join(' ');
      rules.push(line);
    });
    return rules;
  }

  function parseLog(job, log) {
    if (job.testToolType === 'selenium') {
      return parseSeleniumLog(log);
    }
    else {
      return parseOctaneLog(log);
    }
    //TODO:parse based on job info
  }

  function parseLogs(jobList, jobLogs) {
    let linesData = [];
    for (let i = 0; i < jobList.length; i++) {
      if (jobLogs[i]) {
        linesData.push({
          source: jobList[i].name,
          lines: parseLog(jobList[i], jobLogs[i])
        });
      }
    }
    return linesData;
  }

  return {
    parseLogs: parseLogs
  };
});
