(function(){
    let tabsToInject = [];
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.type === 'artemis-inject') {
            console.log('artemis-inject');
            let tab = request.msg;
            let found = false;
            for (let i = 0; i < tabsToInject.length; i++) {
				if (tabsToInject[i].id === tab.id) {
					found = true;
				}
			}
			if (!found) {
				tabsToInject.push(tab);
				//TODO: inject Artemis code
			}
			//TODO: handle the case when Tab is dead or the user would like to stop injecting
			tabsToInject.forEach(function(tab) {
				console.log('Sending message to tab ' + tab.id + '. type: artemis-clr, msg: ' + request.msg);
				chrome.tabs.sendMessage(tab.id, {'type': 'artemis-msg', 'msg': 'clear'}, function(res){});
			});
        }
        else if (request.type === 'artemis-msg') {
            console.log('artemis-msg');
			tabsToInject.forEach(function(tab) {
				console.log('Sending message to tab ' + tab.id + '. type: artemis-msg, msg: ' + request.msg);
				chrome.tabs.sendMessage(tab.id, {'type': 'artemis-msg', 'msg': request.msg}, function(res){});
            });
        }
    });
})();
