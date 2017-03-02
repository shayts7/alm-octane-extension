(function(){
    let artemisEnabledTabs = [];

    function sendMessageToAllArtemisEnabledTabs(msg) {
		artemisEnabledTabs.forEach(function(tab) {
			console.log('|ARTEMIS| Extension background page - Sending message. tab: ' + tab.id + ', type: artemis-msg, msg: ' + msg);
			chrome.tabs.sendMessage(tab.id, {'type': 'artemis-msg', 'msg': msg}, function(res){});
		});
	}

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.type === 'artemis-inject') {
            console.log('|ARTEMIS| Extension background page - Message received. type: artemis-inject');
            let tab = request.msg;
            let filtered = artemisEnabledTabs.filter(function(t) {
            	return t.id === tab.id;
			});
            if (filtered.length === 0) {
				console.log('injecting artemis into tab ' + tab.id);
				artemisEnabledTabs.push(tab);
				//TODO: inject Artemis code
			}

			//TODO: handle the case when Tab is dead or the user would like to stop injecting

			sendMessageToAllArtemisEnabledTabs(
				JSON.stringify([{
					command: 'reset',
					data: null
				}])
			);
        }
        else if (request.type === 'artemis-msg') {
			console.log('|ARTEMIS| Extension background page - Message received. type: artemis-msg, msg: ' + request.msg);
			sendMessageToAllArtemisEnabledTabs(request.msg);
        }
    });
})();
