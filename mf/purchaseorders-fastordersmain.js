/**
 * Name: purchaseorders-fastordersmain.js
 * Path: /ART/ie50/Purchase/PurchaseOrders/FastOrders/FastOrdersMain.aspx
 * Mod: <script type="text/javascript" src="https://kasperlkopf.github.io/mf/purchaseorders-fastordersmain.js"></script>
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
    // addCustomCSS();
    // addEventListeners();
    modifyLabels();
    addHeaderButtons();
  }

  function addEventListeners() {
    //
  }

  function modifyLabels() {
    document.getElementById('tdlabReferenceOrderNumber').innerHTML = 'Lieferanten AB / Angebot';
    document.getElementById('tdlabReferenceText').innerHTML = 'Lieferanten LS-Nummer WE';
  }

  function addCustomCSS() {
    //
  }

  function addHeaderButtons() {
    var cmdPositions = document.getElementById('cmdPositions');

    var detailsButton = document.createElement('button');

    detailsButton.id = 'details-button';
    detailsButton.className = 'cmdButton';
    detailsButton.innerHTML = 'Details';
    detailsButton.onclick = function() {
      window.OrderClick('1');
    };

    cmdPositions.parentElement.insertBefore(detailsButton, cmdPositions);

    var confirmButton = document.createElement('button');

    confirmButton.id = 'confirm-button';
    confirmButton.className = 'cmdButton';
    confirmButton.innerHTML = 'Terminbestätigung';
    confirmButton.style.width = '110px';
    confirmButton.onclick = function() {
      window.PositionsClick('8');
    };

    cmdPositions.parentElement.insertBefore(confirmButton, cmdPositions.nextSibling);
  }

})();
