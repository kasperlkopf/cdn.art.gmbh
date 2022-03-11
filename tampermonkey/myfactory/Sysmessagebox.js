// ==UserScript==
// @name         Sysmessagebox Autoconfirm
// @namespace    http://tampermonkey.net/
// @version      20220311-0
// @description  Automatically confirms the sysmessagebox
// @author       Manuel
// @match        https://mf.artgmbh.com/ART_PP/ie50/system/tools/sysmessagebox.aspx*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=artgmbh.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // Loading
  document.querySelector('table').innerHTML = '<tr><td>Lade...</td></tr>';

  // Click yes
  window.mYesClick();
})();
