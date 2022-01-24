/**
 * Name: listviewfilter.js
 * Path: /ART/ie50/system/search/listviewfilter/listviewfilter.aspx
 * Mod: <script src="https://kasperlkopf.github.io/mf/listviewfilter.js"></script>
 */

(function() {

  document.getElementById('cmdOK').onclick = function() {
    var input = document.getElementById('txtValue');

    input.value = input.value.replace(/^\s+|\s+$/g, '');

    window.mOnOK();
  };

})();
