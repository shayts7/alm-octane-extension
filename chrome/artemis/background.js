(function(){
    var tabsToInject = [];
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        //console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension',request.msg);
        if (request.type === 'artemis-inject') {
            console.log('artemis-inject');
            tabsToInject.push(request.msg);
            //TODO: handle the case when Tab is dead or the user would like to stop injecting
        }
        else if (request.type === 'artemis-msg') {
            console.log('artemis-msg');
            tabsToInject.forEach(function(tab) {
                console.log('Sending msg ' + request.msg + ' to tab ' + tab.id);
                chrome.tabs.sendMessage(tab.id, {'type': 'artemis-msg', 'msg': request.msg}, function(res){});
            });
        }
    });
})();