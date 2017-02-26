(function(){
    let tabsToInject = [];
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.type === 'artemis-inject') {
            console.log('artemis-inject');
            let tab = request.msg;
			tabsToInject.push(tab);
            //TODO: handle the case when Tab is dead or the user would like to stop injecting
			console.log('Sending message to tab ' + tab.id + '. type: artemis-msg, msg: init' + request.msg);
			chrome.tabs.sendMessage(tab.id, {'type': 'artemis-msg', 'msg': 'init'}, function(res){});
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
