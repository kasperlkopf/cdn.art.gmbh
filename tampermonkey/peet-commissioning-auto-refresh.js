// ==UserScript==
// @name         PEET Commissioning Auto Refresh
// @namespace    http://tampermonkey.net/
// @version      0.2
// @author       Manuel
// @match        https://mf.artgmbh.com/ART/ie50/AddOn/ppit/PEETLogistics/Commissioning/PEETCommissioning.aspx*
// @grant        none
// ==/UserScript==

window.alert = (msg) => console.log(msg)

(function() {
  'use strict'

  let checkBtn
  let checkBtnTxt
  let timeout
  let counter

  let active = false

  document.querySelector('.sidebar__nav > ul > li:nth-child(2)').addEventListener('click', () => {
    console.log('nav item click')

    checkBtn = document.querySelector('.content__heading .btn-warning')
    checkBtnTxt = checkBtn.innerText

    if (!active) {
      active = true

      document.addEventListener('mousemove', () => {
        reset()
        timeout = setTimeout(start, 30000)
      })
    }
  })

  function start() {
    console.log('start')

    counter = 120
    tick()
  }

  function tick() {
    checkBtn.innerHTML = checkBtnTxt + '<span class="badge ml-1" style="background: #009ee0; color: #fff;">' + counter + '</span>'

    if (counter) {
      counter--
      timeout = setTimeout(tick, 1000)
    } else {
      console.log('refresh')

      checkBtn.click()
      reset()
      timeout = setTimeout(start, 30000)
    }
  }

  function reset() {
    clearTimeout(timeout)
    checkBtn.innerHTML = checkBtnTxt
  }
})()
