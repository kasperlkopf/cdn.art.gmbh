/**
 * Name: collectivedeliverybatchesmain.js
 * Path: /ART/ie50/sales/collectivedelivery/collectivedeliverybatches/collectivedeliverybatchesmain.aspx
 * Mod: <script type="text/javascript" src="https://cdn.art.gmbh/mf/collectivedeliverybatchesmain.js"></script>
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
     checkCommissioningStatus();
     handleMousemoves()
   }

   function handleMousemoves() {
     var listView = document.getElementById('divListView_lstMain');

     listView.onmouseenter = function() {
       setTimeout(checkCommissioningStatus, 0);
     }
   }

   function checkCommissioningStatus() {
     var listBody = document.getElementById('tblListBody_lstMain');
     var tableRows = listBody.getElementsByTagName('tr');

     for (var i = 0; i < tableRows.length; i++) {
       var tableRow = tableRows[i];
       var rowChildren = tableRow.children;

       if (tableRow.style.backgroundColor === '#ffff9a') {
         tableRow.style.backgroundColor === '#eeeeee';
       }
     }
   }

 })();
