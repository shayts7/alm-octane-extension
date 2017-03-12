angular.module('mainApp').factory('prismInjector', function prismInjector() {

	function addStyleToHead(cssRules) {
		let message = {
			type: 'prism-msg',
			cssStyleRules: cssRules.join(''),
			action: 'add style to header'
		};
		sendMessage(message);
	}

	function removeStyleFromHead() {
		sendMessage({type: 'prism-msg', action: 'remove style from header'});
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
