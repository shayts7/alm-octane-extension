chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'prism-msg') {
    if (request.action == 'add style to header') {
      if (localStorage.getItem('almOctanePrismCSSRules')) {
        if (!(request.cssStyleRules === localStorage.getItem('almOctanePrismCSSRules').parsedCSSRules)) {
          localStorage.removeItem('almOctanePrismCSSRules');
          let cssRulesInLocalStorage = {parsedCSSRules: request.cssStyleRules};
          localStorage.setItem('almOctanePrismCSSRules', JSON.stringify(cssRulesInLocalStorage));
        }
      } else {
        let cssRulesInLocalStorage = {parsedCSSRules: request.cssStyleRules};
        localStorage.setItem('almOctanePrismCSSRules', JSON.stringify(cssRulesInLocalStorage));
      }
      pageRefresh();
    } else if (request.action == 'remove style from header') {
      if (document.head.querySelector('[id="prism-style"]')) {
        document.head.querySelector('[id="prism-style"]').remove();
      }
      localStorage.removeItem('almOctanePrismCSSRules');
    }
  }
  sendResponse({data: request, success: true});
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