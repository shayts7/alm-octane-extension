angular.module('mainApp').factory('prismInject', function prismInject() {

  function _addStyleToHead(cssHierarchyWithRules) {
    let message = {
      type: 'prism-msg',
      cssStyleRules: cssHierarchyWithRules,
      action: 'add style to header'
    };
    _sendMessage(message);
  }

  function _removeStyleFromHead() {
    _sendMessage({type: 'prism-msg', action: 'remove style from header'});
  }
  
  function _sendMessage(message) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
      });
    });
  }

  function addColoringToAUT(cssHierarchyWithRules) {
	  _addStyleToHead(cssHierarchyWithRules)
  }

  function removeColoringFromAUT() {
	  _removeStyleFromHead();
  }

  return {
    addColoringToAUT: addColoringToAUT,
    removeColoringFromAUT: removeColoringFromAUT
  };
});
