angular.module('mainApp').factory('prismInjector', function prismInjector() {

	function addStyleToHead(cssRules) {
		let message = {
			type: 'prism-msg',
			cssStyleRules: cssRules.join(''),
			action: 'add-colors-to-aut'
		};
		sendMessage(message);
	}

	function removeStyleFromHead() {
		let message = {
			type: 'prism-msg',
			action: 'remove-colors-from-aut'
		};
		sendMessage(message);
	}

	function sendMessage(message) {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
			});
		});
	}

	function addColoringToAUT(cssHierarchyWithRules) {
		addStyleToHead(cssHierarchyWithRules)
	}

	function removeColoringFromAUT() {
		removeStyleFromHead();
	}

	return {
		addColoringToAUT: addColoringToAUT,
		removeColoringFromAUT: removeColoringFromAUT
	};
});
