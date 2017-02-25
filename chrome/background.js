var tabsToInject = [];
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
            "from the extension",request.msg);
        if(request.type==="inject"){
            console.log("inject")
            tabsToInject.push(request.msg);
        }
        if(request.type==="msg"){
            console.log("msg")
            tabsToInject.forEach(function(tab) {
                console.log("sending to",tab.id);
                chrome.tabs.sendMessage(tab.id, {"do":request.msg},function(res){
                    //console.log("sendMsg",res);
                });

            });
        }
    });