//TODO: modification to the manifest - Match this octane/content.js to Octane domain.
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
    //TODO: add in Octane -  send artemis command to AUT by utilizing:
    // var event = new CustomEvent('send',
    //     {'detail': "<command goes here>"});
    // document.getElementById("OctaneArtemisChannel")
    //     .dispatchEvent(event);


})();