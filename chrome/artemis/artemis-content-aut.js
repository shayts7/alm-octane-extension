(function(){
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
       	if (request['type'] === 'artemis-msg') {
			console.log('|ARTEMIS| AUT content page - Message received. type: ' + request['type'] + ', msg: ' + request.msg);
			artemisCore.execute(JSON.parse(request.msg));
		}
    });
})();
