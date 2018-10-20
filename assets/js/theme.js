import fitti from 'fitty'
import FontFaceObserver from 'fontfaceobserver'
import smoothscroll from 'smoothscroll-polyfill'

smoothscroll.polyfill()

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
  let first = true
  let scrollTop = 0
  const scrollListener = function () {
    const eventScrollTop = window.scrollY || window.scrollTop || document.getElementsByTagName('html')[0].scrollTop
    if (first) {
      first = false
      scrollTop = eventScrollTop
      setTimeout(function () {
        first = true
        scrollTop = 0
      }, 1000)
    } else {
      if (eventScrollTop - scrollTop > 200) {
        menuBar.classList.remove('active')
        menu.classList.remove('active')
        window.removeEventListener('scroll', scrollListener)
        first = true
        scrollTop = 0
      }
    }
  }

  menuButton.addEventListener('click', function () {
    if (menuBar.classList.contains('active')) {
      menuBar.classList.remove('active')
      menu.classList.remove('active')
      window.removeEventListener('scroll', scrollListener)
    } else {
      menuBar.classList.add('active')
      menu.classList.add('active')
      window.addEventListener('scroll', scrollListener, {passive: true})
    }
  }, false)

  const navHeight = document.querySelector('.fixed-nav').offsetHeight
  for (let menuItem of menuItems) {
    menuItem.addEventListener('click', function (e) {
      e.preventDefault()

      menuBar.classList.remove('active')
      menu.classList.remove('active')

      const clickTarget = e.currentTarget
      const scrollTarget = clickTarget.getAttribute('href')

      const targetElement = document.getElementById(scrollTarget.replace('#', ''))
      const rect = targetElement.getBoundingClientRect()
      const distance = rect.top - navHeight + 2
      window.scrollBy({top: distance, behavior: 'smooth'})

      history.replaceState({}, '', scrollTarget)
    }, false)
  }

}, false)
