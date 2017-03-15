angular.module('mainApp').factory('prismColors', function prismColors() {

	function getCSSRules(selectorsData) {
		let cssRules = [];
		let maxValue = selectorsData[0].count;
		for (let i = 0; i < selectorsData.length; i++) {
			let value = selectorsData[i].count / maxValue;
		    let color = (parseInt((1 - Number(value)) * 15)).toString(16);
			cssRules[i] = selectorsData[i].selector.concat("{background:#f" + color + "0 none !important;outline: 1px solid #f" + color + "0 !important;}");
		}
		return cssRules;
	}

	return {
		getCSSRules: getCSSRules
	};
});
