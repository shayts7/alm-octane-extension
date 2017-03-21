angular.module('mainApp').factory('prismStorage', function prismStorage() {

	function load(storageItem) {
		let data = {};
		let str = localStorage.getItem(storageItem);
		if (str) {
			data = JSON.parse(str);
		}
		return data;
	}

	function save(storageItem, data) {
		localStorage.setItem(storageItem, JSON.stringify(data));
	}

	return {
		load: load,
		save: save
	}
});
