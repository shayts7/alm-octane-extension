(function(){
    var octaneArtemisChannelElement = document.createElement('SPAN');
	octaneArtemisChannelElement.id = 'octane-artemis-channel';
    document.body.appendChild(octaneArtemisChannelElement);
	octaneArtemisChannelElement.addEventListener('send', function(e) {
	    console.log('Octane-Artemis Content Page: Sending message to Artemis');
	    chrome.runtime.sendMessage({msg: e.detail, type: 'artemis-msg'}, function(response) {
            console.log('Octane-Artemis Content Page: Message sent to Artemis');
        });
    });

})();