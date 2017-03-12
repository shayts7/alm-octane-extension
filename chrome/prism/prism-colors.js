angular.module('mainApp').factory('prismColors', function prismColors() {

	function calculateColor(count, maxValue) {
		let value = count / maxValue;
		let elementColorHex = (parseInt((1 - Number(value)) * 255)).toString(16);
		if (elementColorHex.length == 1) {
			elementColorHex = '0' + elementColorHex;
		}
		return elementColorHex;
	}

	function getCSSRules(selectorsData) {
		let cssRules = [];
		let maxValue = selectorsData[0].count;
		for (let i = 0; i < selectorsData.length; i++) {
		    let color = calculateColor(selectorsData[i].count, maxValue);
			cssRules[i] = selectorsData[i].selector.concat(" { background-color: #ff" + color + "00 !important; background-image: none !important; outline: 1px solid #ff" + color + "00 !important; }");
		}
		return cssRules;
	}

	return {
		getCSSRules: getCSSRules
	};
});
