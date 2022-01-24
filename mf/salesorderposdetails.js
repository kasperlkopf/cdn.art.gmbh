/**
 * Name: salesorderposdetails.js
 * Path: /ART/ie50/Sales/SalesOrders/SalesOrderPosDetails/SalesOrderPosDetails.aspx // SalesOrderPosDetails1.aspx
 * Mod: <script type="text/javascript" src="https://kasperlkopf.github.io/mf/salesorderposdetails.js"></script>
 */

(function() {
  // dom ready
  var isReady = document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll);

  if (isReady) {
    setTimeout(init, 0);
  } else {
    addEvent(window, 'load', function() {
      setTimeout(init, 0);
    });
  }

  // add event helper
  function addEvent(obj, type, fn) {
    if (obj.addEventListener) {
      obj.addEventListener(type, fn);
    } else if (obj.attachEvent) {
      obj.attachEvent('on' + type, fn);
    }
  }

  function init() {
    addCustomCSS();
    hideTabHeaders();
  }

  function hideTabHeaders() {
    var tabHeaders = document.getElementById('divTabDlg');

    tabHeaders.parentElement.parentElement.style.display = 'none';
  }

  function addCustomCSS() {
    var style = document.createElement('style');
    var css = '#tabPageContent { display: block!important; position: absolute; width: 50%; }';

    css += '#divTabDlg { display: none; }';

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.innerHTML = css;
    }

    document.getElementsByTagName('head')[0].appendChild(style);

    var tabPages = document.getElementsByName('tabPageContent');

    tabPages[1].style.left = '50%'
  }

})();
