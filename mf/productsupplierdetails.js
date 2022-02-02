/**
 * Name: productsupplierdetails.js
 * Path: /ART/ie50/base/products/productsupplierdetails/ProductSupplierDetails.aspx
 * Mod: <script type="text/javascript" src="https://cdn.art.gmbh/mf/productsupplierdetails.js"></script>
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
    hideDiscounts();
    addTodayButton();
  }

  function hideTabHeaders() {
    var tabHeaders = document.getElementById('divTabDlgtabPages');

    tabHeaders.parentElement.parentElement.style.display = 'none';
  }

  function hideDiscounts() {
    var tabDlgPage2 = document.getElementById('tabDlgPage2');

    tabDlgPage2.cells[1].style.display = 'none';
  }

  function addTodayButton() {
    var txtPriceDate = document.getElementById('txtPriceDate');
    var txtCmdPriceDate = document.getElementById('txtCmdPriceDate');
    var parentCell = txtCmdPriceDate.parentElement;

    var todayButton = document.createElement('button');

    todayButton.id = 'today-button';
    todayButton.innerHTML = 'Heute';
    todayButton.onclick = function() {
      var d = new Date();
      var today = ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth()+1)).slice(-2) + '.' + d.getFullYear();

      txtPriceDate.value = today;
    }

    parentCell.insertBefore(todayButton, txtCmdPriceDate);
    parentCell.width = '';
    parentCell.parentElement.children[0].width = '100%';
  }

  function addCustomHeadings() {
    var bulk = document.getElementById('tblListView_lstPrices').parentElement;
    var h51 = document.createElement('div');

    h51.innerHTML = 'Staffelpreise';
    bulk.parentElement.insertBefore(h51, bulk);

    var history = document.getElementById('tblListHead_lstHistory').parentElement;
    var h52 = document.createElement('div');

    h52.innerHTML = 'Historie';
    history.parentElement.insertBefore(h52, history);
  }

  function addCustomCSS() {
    var style = document.createElement('style');
    var css = '#tabPageContent_tabPages { display: block!important; position: absolute; width: 50%; }';

    css += '#divTabDlgtabPages { display: none; }';
    css += '#tdlblText { padding-right: 0!important; }';

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.innerHTML = css;
    }

    document.getElementsByTagName('head')[0].appendChild(style);

    var tabPages = document.getElementsByName('tabPageContent_tabPages');

    tabPages[1].style.left = '50%'
    tabPages[1].style.height = '50%'

    tabPages[2].style.left = '50%'
    tabPages[2].style.height = '50%'
    tabPages[2].style.bottom = '25px'
  }

})();
