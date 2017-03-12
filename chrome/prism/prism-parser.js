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
			rules.push(line.substring(line.indexOf('({') + 2, line.indexOf('})')).replaceAll(['By.cssSelector:', ',', 'By.className: '], ['', '', " \."]));
		});
		return rules;
	}

	function parseLog(job, log) {
	  //TODO:parse based on job info
      return parseOctaneLog(log);
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
