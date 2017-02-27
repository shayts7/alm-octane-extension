chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  let data = request.data;
  if (data.msgType === 'prism-msg') {
    if (data.actionType == 'add style to header') {
      if (localStorage.getItem('almOctanePrismCSSRules')) {
        if (!(data.cssStyleRules === localStorage.getItem('almOctanePrismCSSRules').parsedCSSRules)) {
          localStorage.removeItem('almOctanePrismCSSRules');
          let cssRulesInLocalStorage = {parsedCSSRules: data.cssStyleRules};
          localStorage.setItem('almOctanePrismCSSRules', JSON.stringify(cssRulesInLocalStorage));
        }
      } else {
        let cssRulesInLocalStorage = {parsedCSSRules: data.cssStyleRules};
        localStorage.setItem('almOctanePrismCSSRules', JSON.stringify(cssRulesInLocalStorage));
      }
      pageRefresh();
    } else if (data.actionType == 'remove style from header') {
      if (document.head.querySelector('[id="prism-style"]')) {
        document.head.querySelector('[id="prism-style"]').remove();
      }
    }
  }
  sendResponse({data: data, success: true});
});

function loadCssRulesFromLocalStorage() {
  let cssRules = localStorage.getItem('almOctanePrismCSSRules');
  if (cssRules) {
    let data = JSON.parse(cssRules);
    if (data.parsedCSSRules) {
      return data.parsedCSSRules;
    }
  }
}

function colorUI() {
  if (document.head.querySelector('[id="prism-style"]')) {
    document.head.querySelector('[id="prism-style"]').remove();
  }
  let cssStyle = loadCssRulesFromLocalStorage();
  let headElement = document.head;
  let style = document.createElement('style');
  let styleElement;
  style.type = 'text/css';

  if (style.styleSheet) {
    style.styleSheet.cssText = cssStyle;
  } else {
    style.append(document.createTextNode(cssStyle));
  }
  styleElement = headElement.appendChild(style);
  styleElement.setAttribute('id', 'prism-style');

}

function pageRefresh() {
  if (localStorage.getItem('almOctanePrismCSSRules')) {
    colorUI();
  }
}

pageRefresh();