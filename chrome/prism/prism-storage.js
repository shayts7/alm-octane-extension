angular.module('mainApp').factory('prismStorage', function prismStorage() {

	function load() {
		let data = {};
		let str = localStorage.getItem('almOctanePrismJobs');
		if (str) {
			data = JSON.parse(str);
		}
		return data;
	}

	function save(data) {
		localStorage.setItem('almOctanePrismJobs', JSON.stringify(data));
	}

	return {
		load: load,
		save: save
	}
});