angular.module('mainApp').factory('prismAggregator', function prismAggregator() {

	function aggregate(linesData) {
		let selectorsData = [];

		let map = {};
		linesData.forEach(function(ld) {
			ld.lines.forEach(function(l) {
				if (map[l]) {
					map[l] = {
						sources: map[l].sources.indexOf(ld.source) === -1 ? map[l].sources.push(ld.source) && map[l].sources : map[l].sources,
						count: map[l].count + 1
					}
				} else {
					map[l] = {
						sources: [ld.source],
						count: 1
					}
				}
			});
		});
		for (let sel in map) {
			selectorsData.push({
				selector: sel,
				selectorsCount: (sel.match(/\[/g) || []).length,
				hasXpath: false,
				count: map[sel].count,
				sources: map[sel].sources
			});
		}
		selectorsData.sort(function(sel1, sel2) {
			return sel2.count - sel1.count;
		});
		return selectorsData;
	}

	return {
		aggregate: aggregate
	};
});
