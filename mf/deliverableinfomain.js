/**
 * Name: deliverableinfomain.js
 * Path: /ART/ie50/Purchase/Info/DeliverableInfo/DeliverableInfoMain.aspx
 * Mod: <script src="https://kasperlkopf.github.io/mf/deliverableinfomain.js"></script>
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
    compareDeliveryDates();
    handleMousemoves()
  }

  function handleMousemoves() {
    var listView = document.getElementById('divListView_lstMain');

    listView.onmouseenter = function() {
      setTimeout(compareDeliveryDates, 0);
    }
  }

  function compareDeliveryDates() {
    var listBody = document.getElementById('tblListBody_lstMain');
    var tableRows = listBody.getElementsByTagName('tr');

    for (var i = 0; i < tableRows.length; i++) {
      var tableRow = tableRows[i];
      var rowChildren = tableRow.children;

      var confirmedDeliveryDateCell = null;
      var requestedDeliveryDateCell = null;
      var deliveryPossible = '';

      for (var j = 0; j < rowChildren.length; j++) {
        var rowChild = rowChildren[j];
        var colId = rowChild.wfColID;

        if (colId === 'sop.DeliveryDate') {
          confirmedDeliveryDateCell = rowChild;
        } else if (colId === 'so.DeliveryRequestDate' || colId === 'Wunschtermin') {
          requestedDeliveryDateCell = rowChild;
        } else if (colId === 'IsPossible') {
          deliveryPossible = rowChild.innerText;
        }
      }

      if (confirmedDeliveryDateCell && requestedDeliveryDateCell) {
        var confirmedDeliveryDate = confirmedDeliveryDateCell.innerText.split('.');
        confirmedDeliveryDate = new Date(confirmedDeliveryDate[2], confirmedDeliveryDate[1] - 1, confirmedDeliveryDate[0]);

        var requestedDeliveryDate = requestedDeliveryDateCell.innerText.split('.');
        requestedDeliveryDate = new Date(requestedDeliveryDate[2], requestedDeliveryDate[1] - 1, requestedDeliveryDate[0]);

        var isFulfillable = requestedDeliveryDate < confirmedDeliveryDate && deliveryPossible === 'Ja';

        if (isFulfillable) {
          requestedDeliveryDateCell.style.color = 'green'
          requestedDeliveryDateCell.style.fontWeight = 'bold';
          requestedDeliveryDateCell.title = 'Wunschtermin vor Liefertermin';
        }
      }
    }
  }

})();
