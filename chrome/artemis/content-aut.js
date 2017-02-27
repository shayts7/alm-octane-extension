(function(){
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

       	if (request['type'] === 'artemis-msg') {
       		if (request.msg === 'clear') {
				artemisCore.clearCommands();
			} else {
				let commands = JSON.parse(request.msg);
				artemisCore.runCommands(commands);
			}
		}
    });
})();
