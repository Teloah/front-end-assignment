const snackbar = document.querySelector('.snackbar')

/**
 * Updates snackbar's DOM node
 * Used only from showSuccess and showError
 *
 * @param {string} message
 * @param {"success" | "failed"} status
 */
const showSnackbar = (message, status) => {
  snackbar.textContent = message
  snackbar.classList.remove('hidden')
  snackbar.classList.add('visible', status)
  setTimeout(() => {
    snackbar.classList.remove('visible')
    snackbar.classList.add('hidden')
    setTimeout(() => {
      snackbar.classList.remove(status)
      snackbar.textContent = ''
    }, 400)
  }, 3000)
}

/**
 * Show success message in a snackbar
 *
 * @param {string} message
 */
export const showSuccess = message => {
  showSnackbar(message, 'success')
}

/**
 * Show failure message in a snackbar
 *
 * @param {string} message
 */
export const showError = message => {
  showSnackbar(message, 'failed')
}
