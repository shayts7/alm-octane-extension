chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  let data = request.data;
  if (data.actionType == 'add style to header') {
    let cssRules = data.cssStyleRules;
    let headElement = document.head;
    let style = document.createElement('style');
    let styleElement;
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = cssRules;
    } else {
      style.append(document.createTextNode(cssRules));
    }
    styleElement = headElement.appendChild(style);
    styleElement.setAttribute('id', data.styleID);
  }
  else if (data.actionType == 'remove style from header') {
    if (!(document.head.querySelector('[id="prism-style"]') == undefined)) {
      document.head.querySelector('[id="prism-style"]').remove();
    }
  }
  sendResponse({data: data, success: true});
});
