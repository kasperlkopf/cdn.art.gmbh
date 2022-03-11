// ==UserScript==
// @name         myfactory ProductPrices
// @namespace    http://tampermonkey.net/
// @version      20220311-0
// @description  Automatically opens product price list
// @author       Manuel
// @match        https://mf.artgmbh.com/ART_PP/ie50/Base/Products/Prices/ProductPrices.aspx?EditName=BaseProducts*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=artgmbh.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // Click the button
  document.querySelector('#cmdShowScale_R0').click();

  // Clear standard price
  document.querySelector('#txtPrice_R0').value = '';

})();
