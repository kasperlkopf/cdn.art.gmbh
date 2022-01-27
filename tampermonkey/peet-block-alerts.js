// ==UserScript==
// @name         Block alerts in PEET
// @namespace    http://tampermonkey.net/
// @version      20220127-1
// @author       Manuel
// @match        https://mf.artgmbh.com/Logistik/CreateDelivery
// @grant        none
// ==/UserScript==

(function() {
  'use strict'

  window.alert = (msg) => {
    const now = Date.now();
    const alert = `<div id="alert-${now}" class="loading-screen">
                    <div class="p-2 px-3" style="background: #45aa0f; border-radius: 3px; color: #fff;">${msg}</div>
                  </div>`;

    document.body.innerHTML += alert;
    setTimeout(() => document.querySelector('[id^="alert-"]').remove(), 4000);
  }

})();
