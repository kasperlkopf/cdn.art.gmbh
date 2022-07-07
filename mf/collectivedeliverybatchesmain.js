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
     document.getElementById('chkBatchPrint').disabled = true;
     document.getElementById('chkStock').disabled = true;
     document.getElementById('cmdCheckAll').disabled = true;

     window.mOnUnCheckAll();

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

       var commissionedQuantity = '';
       var checkbox = null;

       for (var j = 0; j < rowChildren.length; j++) {
         var rowChild = rowChildren[j];
         var colId = rowChild.wfColID;

         if (colId === 'Kommissioniert') {
           commissionedQuantity = rowChild.innerText;
         } else if (colId === 'IncludePos') {
           checkbox = rowChild.getElementsByTagName('input')[0];
         }
       }

       if (commissionedQuantity !== '') {
         if (checkbox.checked) {
           checkbox.click();
         }

         checkbox.checked = false;
         checkbox.disabled = true;
       }
     }
   }

 })();
