import '../css/bacon.css'

const baconSection = document.querySelector('section:nth-child(2)')

// clone original image node for duplication
const clone = document.querySelector('img').cloneNode(true)

// Adds or removes required number of bacon images
const createImages = count => {
  const currentCount = baconSection.querySelectorAll('img').length
  // remove if there are too many images...
  for (let i = currentCount; i > count; i--) {
    baconSection.removeChild(baconSection.lastChild)
  }
  // ...or add if not enough
  for (let i = currentCount; i < count; i++) {
    baconSection.appendChild(clone.cloneNode(true))
  }
}

// Returns required image count from URL search params
const getImageCount = () => {
  const urlParams = new URLSearchParams(window.location.search)
  return parseInt(urlParams.get('count')) || 1
}

let count = getImageCount()
createImages(count)

// when the button is clicked, increase count, update URL and add image
document.querySelector('button').addEventListener('click', e => {
  count++
  window.history.pushState(null, 'Bacon factory', `?count=${count}`)
  createImages(count)
})

// update images on Back / Forward
window.onpopstate = () => {
  count = getImageCount()
  createImages(count)
}
