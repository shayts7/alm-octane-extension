angular.module('mainApp').factory('prismInject', function prismInject() {

  function addStyleToHead(cssHierarchyWithRules) {
    var message = {
      type: 'prism-msg',
      cssStyleRules: cssHierarchyWithRules,
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
  return {
    addStyleToHead: addStyleToHead,
    removeStyleFromHead: removeStyleFromHead
  };
});
