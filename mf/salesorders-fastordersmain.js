/**
 * Name: salesorders-fastordersmain.js
 * Path: /ART/ie50/Sales/SalesOrders/FastOrders/FastOrdersMain.aspx
 * Mod: <script type="text/javascript" src="https://cdn.art.gmbh/mf/salesorders-fastordersmain.js"></script>
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
    addEventListeners();
    addHeaderButtons();
    togglePdfButton();
    addCopyButton();
  }

  function addEventListeners() {
    var contactIdSelect = document.getElementById('cboContactID');
    var contactNameInput = document.getElementById('txtContactName');
    var referenceInput = document.getElementById('txtReferenceText');
    var paymentConditionsSelect = document.getElementById('cboPaymentCondition');
    var shippingConditionsSelect = document.getElementById('cboShipmentCondition');

    addEvent(contactIdSelect, 'change', checkContactId);
    addEvent(contactNameInput, 'blur', checkContactName);
    addEvent(referenceInput, 'change', onReferenceInputBlur);
    addEvent(paymentConditionsSelect, 'change', checkPaymentConditions);
    addEvent(shippingConditionsSelect, 'change', checkShippingConditions);
  }

  // set new order
  window.mFrontendEventSetNewOrder = checkEverything;

  // enable controls
  window.mFrontendEventEnableControls = checkEverything;

  // before save
  window.mFrontendEventBeforeSave = beforeSave;

  // after save
  window.mFrontendEventAfterSave = afterSave;

  function onReferenceInputBlur() {
    checkReference();

    if (!window.duplicateWarningConfirmed) {
      checkForDuplicates();
    }
  }

  function beforeSave() {
    checkEverything();
  }

  function afterSave() {
    checkForDuplicates();
  }

  function checkEverything() {
    var orderType = document.getElementById('txtOrderTypeDesc').value;

    if (orderType === 'Auftragsbestätigung') {
      checkContactId();
      checkDeliveryDates();
      updateOrderInfo();
    }

    checkPaymentConditions();
    checkShippingConditions();
    checkOrderState();
    togglePdfButton();
  }

  function checkContactId() {
    var contactIdSelect = document.getElementById('cboContactID');

    if (contactIdSelect) {
      var contactIdLabel = document.getElementById('tdlabContactID');
      var txt = contactIdSelect.value ? 'Ansprechpartner' : 'Ansprechpartner <small class="red-circle">🔴</small>';

      contactIdLabel.innerHTML = txt;
    }

    checkContactName();
    checkReference();
  }

  function checkContactName() {
    var contactNameInput = document.getElementById('txtContactName');

    if (contactNameInput) {
      var contactNameLabel = document.getElementById('tdlabContactName');
      var txt = contactNameInput.value ? 'Zu Händen Text' : 'Zu Händen Text <small class="red-circle">🔴</small>';

      contactNameLabel.innerHTML = txt;
    }
  }

  function checkReference() {
    var referenceInput = document.getElementById('txtReferenceText');

    if (referenceInput) {
      var referenceLabel = document.getElementById('tdlabReferenceText');
      var txt = referenceInput.value ? 'Betreff' : 'Betreff <small class="red-circle">🔴</small>';

      referenceLabel.innerHTML = txt;
    }
  }

  function checkPaymentConditions() {
    var paymentConditionsSelect = document.getElementById('cboPaymentCondition');

    if (paymentConditionsSelect) {
      var paymentConditionsLabel = document.getElementById('tdlabPaymentCondition');
      var txt = paymentConditionsSelect.value ? 'Zahlungskondition' : 'Zahlungskondition <small class="red-circle">🔴</small>';

      paymentConditionsLabel.innerHTML = txt;
    }
  }

  function checkShippingConditions() {
    var shippingConditionsSelect = document.getElementById('cboShipmentCondition');

    if (shippingConditionsSelect) {
      var shippingConditionsLabel = document.getElementById('tdlabShipmentCondition');
      var txt = shippingConditionsSelect.value ? 'Versandart' : 'Versandart <small class="red-circle">🔴</small>';

      shippingConditionsLabel.innerHTML = txt;
    }
  }

  // delivery date check on focus
  window.mFrontendEventListViewInputOnFocus = checkDeliveryDates;

  function createPosDetailsButton() {
    var lstPositions = document.getElementById('tblListBody_lstPositions');
    var rows = lstPositions.rows;

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var firstCell = row.cells[0];

      if (firstCell.id === 'tdListField_lstPositions_0') {
        if (firstCell.children.length === 1) {
          var posDetailsButton = document.createElement('button');

          posDetailsButton.id = 'pos-details-button';
          posDetailsButton.innerHTML = 'D';
          posDetailsButton.style.width = '15px';
          posDetailsButton.style.marginTop = '2px';
          posDetailsButton.onclick = function() {
            var itemId = this.parentElement.parentElement.wfItemID;

            window.mPosDetails(itemId);
          };

          firstCell.appendChild(posDetailsButton);
        }
      }
    }
  }

  function checkDeliveryDates() {
    var inputs = document.getElementById('tblListBody_lstPositions').getElementsByTagName('input');

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      var isDeliveryDate = input.id === 'txtList_lstPositions_DeliveryDate';

      if (isDeliveryDate) {
        var isPastDate = checkIfPast(input);
        var clazz = isPastDate ? 'invalid' : '';

        input.className = clazz;
      }
    }
  }

  function checkIfPast(input) {
    var orderDateVal = document.getElementById('txtOrderDate').value.split('.');
    var documentDate = new Date(orderDateVal[2], orderDateVal[1] - 1, orderDateVal[0]);

    var inputVal = input.value.split('.');
    var deliveryDate = new Date(inputVal[2], inputVal[1] - 1, inputVal[0]);

    return deliveryDate < documentDate;
  }

  function addCustomCSS() {
    var style = document.createElement('style');
    var css = '.invalid { border: 3px solid #f00; } .red-circle { color: #f00; }';

    css += '#lblOrderState { display: inline !important; margin-right: 10px; }';

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.innerHTML = css;
    }

    document.getElementsByTagName('head')[0].appendChild(style);
  }

  function togglePdfButton() {
    var txtOrderTypeDesc = document.getElementById('txtOrderTypeDesc').value;
    var cmdPrint = document.getElementById('cmdPrint');
    var pdfButton = document.getElementById('pdf-button') || createPdfButton();

    var isValidType = txtOrderTypeDesc === 'Auftragsbestätigung' || txtOrderTypeDesc === 'Angebot' || txtOrderTypeDesc === 'Rechnung' || txtOrderTypeDesc === 'Gutschrift';
    var pdfButtonState = isValidType ? 'inline' : 'none';

    pdfButton.style.display = pdfButtonState;
    pdfButton.disabled = cmdPrint.disabled;

    var orderNumber = document.getElementById('txtOrderNumber').value;
    var isNewDocument = orderNumber.indexOf('*neu*') > -1;

    if (isNewDocument) {
      pdfButton.disabled = true;
    }
  }

  function createPdfButton() {
    var pnlButtonBarBottomRight = document.getElementById('pnlButtonBarBottomRight');
    var cmdPrintPreview = document.getElementById('cmdPrintPreview');
    var pdfButton = document.createElement('button');

    var formIds = {
      'Auftragsbestätigung': 21,
      'Angebot': 25,
      'Rechnung': 17,
      'Gutschrift': 29
    };

    pdfButton.id = 'pdf-button';
    pdfButton.className = 'cmdButton';
    pdfButton.innerHTML = 'PDF';
    pdfButton.onclick = function() {
      var txtOrderNumber = document.getElementById('txtOrderNumber').value;
      var txtOrderTypeDesc = document.getElementById('txtOrderTypeDesc').value;
      var formId = formIds[txtOrderTypeDesc];

      if (formId > 0) {
        var url = 'https://mf.artgmbh.com/ART/ie50/system/batchprint/order_download_direct.aspx?ClientID=' + window.msClientID + '&OrderID=' + window.mlOrderID + '&OrderType=Sales&OrderNumber=' + txtOrderNumber + '&FormID=' + formId + '&PDFFormat=-1';

        document.getElementById('cmdSave').click();

        setTimeout(function() {
          window.open(url, '_blank');
        }, 0);
      }
    };

    pnlButtonBarBottomRight.insertBefore(pdfButton, cmdPrintPreview);

    return pdfButton;
  }

  function addCopyButton() {
    var tditchOrderInfoRow = document.getElementById('tditchOrderInfoRow');
    var td = document.createElement('td');
    var copyButton = document.createElement('button');

    copyButton.id = 'copy-button';
    copyButton.className = 'cmdButton';
    copyButton.innerHTML = 'Kopieren';
    copyButton.onclick = function() {
      var txtitchOrderInfoRow = document.getElementById('txtitchOrderInfoRow');
      txtitchOrderInfoRow.select();

      setTimeout(function() {
        document.execCommand('copy');
      }, 0);
    }

    td.appendChild(copyButton);

    tditchOrderInfoRow.width = '100%';
    tditchOrderInfoRow.parentElement.appendChild(td);
  }

  function checkOrderState() {
    var orderType = document.getElementById('txtOrderTypeDesc').value;

    if (orderType === 'Auftragsbestätigung') {
      var orderNumber = document.getElementById('txtOrderNumber').value;
      var isNewOC = orderNumber.indexOf('*neu*') > -1;

      if (isNewOC) {
        var paymentCondition = document.getElementById('cboPaymentCondition').value;
        var isPrepayment = paymentCondition == 9 || paymentCondition == 22;

        if (isPrepayment) {
          var txtManualOrderState = document.getElementById('txtManualOrderState');

          txtManualOrderState.value = 7;
          window.mRefreshOrderState();
        }
      }
    } else if (orderType.indexOf('Rechnung') > -1) {
      var txtManualOrderState = document.getElementById('txtManualOrderState');
      var labelCell = document.getElementById('lblOrderState').parentElement;
      var warning = document.getElementById('no-status-warning');

      if (txtManualOrderState.value == 0) {
        if (!warning) {
          labelCell.innerHTML = labelCell.innerHTML + '<span id="no-status-warning" style="color: red; font-weight: bold;">Rechnung hat keinen Status!</span>';
        }
      } else {
        if (warning) {
          labelCell.removeChild(warning);
        }
      }
    }
  }

  function updateOrderInfo() {
    var orderType = document.getElementById('txtOrderTypeDesc').value;

    if (orderType === 'Auftragsbestätigung' || orderType === 'Rahmenauftrag') {
      var orderNumber = document.getElementById('txtOrderNumber').value;
      var referenceText = document.getElementById('txtReferenceText').value;
      var isNewOC = orderNumber.indexOf('*neu*') > -1;

      if (!isNewOC && orderNumber !== '' && referenceText !== '') {
        var txtitchOrderInfoRow = document.getElementById('txtitchOrderInfoRow');
        var isEnglish = document.getElementById('txtFooterText').value.indexOf('Thank you') > -1;
        var subjectLine = isEnglish ? 'Order Confirmation ' + orderNumber + ' · Your Reference: ' + referenceText : 'Auftragsbestätigung ' + orderNumber + ' · Ihre Referenz: ' + referenceText;

        txtitchOrderInfoRow.value = subjectLine;
      }
    }
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
  }

  function checkForDuplicates() {
    var orderType = document.getElementById('txtOrderTypeDesc').value;

    if (orderType === 'Auftragsbestätigung' || orderType === 'Rahmenauftrag') {
      var referenceInput = document.getElementById('txtReferenceText');
      var customerNumberInput = document.getElementById('txtCustomerIDExt');

      if (referenceInput && customerNumberInput) {
        var orderNumber = document.getElementById('txtOrderNumber').value;
        var referenceText = referenceInput.value;
        var customerNumber = customerNumberInput.value;

        if (orderNumber && referenceText && customerNumber) {
          var url = 'https://api.art.gmbh/mf/check-for-duplicates?orderNumber=' + orderNumber + '&referenceText=' + referenceText + '&customerNumber=' + customerNumber + '&t=' + new Date().getTime();

          getApi(url, function(res) {
            if (res) {
              var confirmed = confirm('Achtung!\n\nEs gibt einen ähnlichen Beleg für diesen Kunden (' + customerNumber + '):\n\n' + res + '\nBitte überprüfen. Danke.');

              if (confirmed) {
                window.duplicateWarningConfirmed = true;
              }
            }
          });
        }
      }
    }
  }

  window.checkForDuplicates = checkForDuplicates;

  function getApi(url, callback) {
    var xdr = new XDomainRequest(); // XMLHttpRequest();

    xdr.open('GET', url);

    xdr.onload = function() {
      if (callback) {
        callback(xdr.responseText)
      }
    }

    xdr.send();
  }

  window.getApi = getApi;

})();
