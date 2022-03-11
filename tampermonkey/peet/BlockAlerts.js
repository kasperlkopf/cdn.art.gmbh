// ==UserScript==
// @name         PEET Block Alerts
// @namespace    http://tampermonkey.net/
// @version      20220127-0
// @description  Replaces alerts in PEET with a custom toast
// @author       Manuel
// @match        https://mf.artgmbh.com/Logistik/CreateDelivery
// @icon         https://www.google.com/s2/favicons?sz=64&domain=artgmbh.com
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
