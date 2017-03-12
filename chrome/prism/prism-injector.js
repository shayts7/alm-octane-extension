angular.module('mainApp').factory('prismInjector', function prismInjector() {

	function addStyleToHead(cssRules) {
		sendMessage({
			type: 'prism-msg',
			cssStyleRules: cssRules.join(''),
			action: 'add-colors-to-aut'
		});
	}

	function removeStyleFromHead() {
		sendMessage({
			type: 'prism-msg',
			action: 'remove-colors-from-aut'
		});
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
