/**
 * Name: baseeditmain.js
 * Path: /ART/ie50/Base/BaseEditMain.aspx
 * Mod: <script src="https://kasperlkopf.github.io/mf/baseeditmain.js"></script>
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
    if (window.msEditName === 'BaseProducts') {
      //
    }
  }

  // save click
  window.mFrontendEventSaveClick = function() {
    if (window.msEditName === 'BaseProducts') {
      updateEAN();
    }

    if (window.msEditName === 'BaseCustomers') {
      updateDATEV();
    }
  };

  function updateEAN() {
    var EANNumberInput = document.getElementById('txtEANNumber');
    var productNumberInput = document.getElementById('txtProductNumber');

    if (EANNumberInput && productNumberInput) {
      EANNumberInput.value = productNumberInput.value;
    }
  }

  function updateDATEV() {
    var customerNumberInput = document.getElementById('txtCustomerNumber');
    var datevAccountInput = document.getElementById('txtDatevAccount');

    if (customerNumberInput && datevAccountInput) {
      if (datevAccountInput.value !== customerNumberInput.value + '00') {
        datevAccountInput.value = customerNumberInput.value + '00';
      }
    }
  }

})();
