import fitti from 'fitty'
import FontFaceObserver from 'fontfaceobserver'

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
}, false)
