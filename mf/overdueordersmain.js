/**
 * Name: overdueordersmain.js
 * Path: /ART/ie50/Purchase/OrderReminder/OverdueOrders/OverdueOrdersMain.aspx
 * Mod: <script src="https://kasperlkopf.github.io/mf/overdueordersmain.js"></script>
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
    handleClicks()
  }

  function handleClicks() {
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

      var orderNumberCell = null;
      var orderDateCell = null;
      var deliveryDate = '';

      for (var j = 0; j < rowChildren.length; j++) {
        var rowChild = rowChildren[j];
        var colId = rowChild.wfColID;

        if (colId === 'po.OrderNumber') {
          orderNumberCell = rowChild;
        } else if (colId === 'po.OrderDate') {
          orderDateCell = rowChild;
        } else if (colId === 'DeliveryDate') {
          deliveryDate = rowChild.innerText;
        }
      }

      if (orderDateCell) {
        var orderDate = orderDateCell.innerText.split('.');
        orderDate = new Date(orderDate[2], orderDate[1] - 1, orderDate[0]);

        var twoWeeksAgo = new Date()
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

        var isSuperLate = orderDate < twoWeeksAgo && !deliveryDate.length

        if (isSuperLate) {
          orderNumberCell.style.color = 'red';
          orderNumberCell.style.fontWeight = 'bold';
          orderNumberCell.title = 'Seit 14 Tagen unbestätigt';

          orderDateCell.style.color = 'red';
          orderDateCell.style.fontWeight = 'bold';
        }
      }
    }
  }

})();
