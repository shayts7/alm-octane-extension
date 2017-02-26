(function(){
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

        alert('request type: ' + request.type + ', request.msg: ' + request.msg);
        // console.log(sender.tab ?
        // "from a content script:" + sender.tab.url :
        //     "from the extension",request);
    });
})();