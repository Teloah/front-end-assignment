import checkValidity from './validation'
import { showSuccess, showError } from './snackbar'
import { createFormData } from './formdata'

const submitButton = document.querySelector('button[type=submit]')

const submit = async e => {
  e.preventDefault()

  // check validity of all fields first
  const validity = checkValidity()
  if (!validity.isValid) {
    validity.input.focus()
    return
  }

  // validation passed, submitting
  submitButton.setAttribute('disabled', true)

  await fetch('/order', { method: 'POST', body: createFormData() })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to complete purchase')
      }
      return response.json()
    })
    .then(response => showSuccess(response.message))
    .catch(err => showError(err.message))
    .finally(() => submitButton.removeAttribute('disabled'))
}

export default submit
