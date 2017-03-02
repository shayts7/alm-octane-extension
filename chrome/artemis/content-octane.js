(function(){
    var octaneArtemisChannelElement = document.createElement('input');
	octaneArtemisChannelElement.setAttribute('type', 'hidden');
	octaneArtemisChannelElement.id = 'octane-artemis-channel';
    document.body.appendChild(octaneArtemisChannelElement);
	octaneArtemisChannelElement.addEventListener('send', function(e) {
	    console.log('|ARTEMIS| Octane content page - Sending message: ' + e.detail);
	    chrome.runtime.sendMessage({type: 'artemis-msg', msg: e.detail}, function(response) {
           	console.log('|ARTEMIS| Octane content page - Message sent');
        });
    });

})();
