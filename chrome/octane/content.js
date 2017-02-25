(function(){
    var hiddenElement = document.createElement("SPAN");
    hiddenElement.id = "OctaneArtemisChannel"
    document.body.appendChild(hiddenElement);
    hiddenElement.addEventListener("send",function(e){
        console.log("event.detail:",e.detail);
        chrome.runtime.sendMessage({msg: e.detail,type: "msg"}, function(response) {
            console.log("msg has been sent");
        });
    });
    //Fire event as Example
    // var event = new CustomEvent('send',
    //     {'detail': "works!"});
    // document.getElementById("OctaneArtemisChannel")
    //     .dispatchEvent(event);


})();