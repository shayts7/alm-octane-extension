(function(){
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.msg === 'init') {
			artemisCore.init();
		} else if (request.msg === 'clean') {
			artemisCore.clean();
		} else {
            let commands = JSON.parse(request.msg);
            artemisCore.run(commands);
        }
    });
})();
