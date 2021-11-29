import '../css/checkout.css'

import checkValidity from './checkout/validation'

// Handle submit event to perform validation before submitting
document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault()

  const validity = checkValidity()
  if (!validity.isValid) {
    validity.input.focus()
    return
  }

  console.log('submitting...')
})
