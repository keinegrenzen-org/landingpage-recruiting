import fitti from 'fitty'
import FontFaceObserver from 'fontfaceobserver'
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

const font = new FontFaceObserver('League Gothic')

font.load().then(function () {
  fitti.fitAll()
})

document.addEventListener('DOMContentLoaded', function () {
  const flowTypes = document.querySelectorAll('.fitti')
  for (let flowType of flowTypes) {
    fitti(flowType, {
      minSize: 20,
      maxSize: 200
    })
  }

  const menuButton = document.querySelector('.menu')
  const menuBar = document.querySelector('.fixed-nav')
  const menu = document.querySelector('.big-nav')
  const menuItems = menu.querySelectorAll('ul > li > a')
  menuButton.addEventListener('click', function () {
    if (menuBar.classList.contains('active')) {
      menuBar.classList.remove('active')
      menu.classList.remove('active')
    } else {
      menuBar.classList.add('active')
      menu.classList.add('active')
    }
  }, false)

  for (let menuItem of menuItems) {
    menuItem.addEventListener('click', function (e) {
      e.preventDefault()

      menuBar.classList.remove('active')
      menu.classList.remove('active')

      const clickTarget = e.currentTarget
      const scrollTarget = clickTarget.getAttribute('href')

      document.getElementById(scrollTarget.replace("#", "")).scrollIntoView({ behavior: 'smooth' });
      window.location.hash = scrollTarget
    }, false)
  }

}, false)
