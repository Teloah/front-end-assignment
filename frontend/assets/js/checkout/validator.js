const validator = require('validator')

const ERROR_ATTRIBUTE = 'data-error'

/**
 * @typedef {object} ValidatorOptions
 * @property {string} name
 * @property {(value: string) => string | null} validator
 * @property {InputMask=} mask
 */

class Validator {
  /**
   * Handles validation and DOM updates for input fields
   *
   * @param {ValidatorOptions} options
   */
  constructor({ name, validator, mask }) {
    this.container = document
    this.name = name
    this.validator = validator
    this.mask = mask
    this.#setupDOM()
  }
  #setupDOM = () => {
    this.input = this.container.querySelector(`[name=${this.name}]`)
    this.label = this.container.querySelector(`#${this.name}-error`)
    this.#setupEventListeners()
  }
  #setupEventListeners = () => {
    // check validity on blur
    this.input &&
      this.input.addEventListener('blur', e => {
        this.validateField()
      })
    // check validity on change only for inputs with errors
    this.input &&
      this.input.addEventListener('input', e => {
        if (!this.isValid()) {
          this.validateField()
        }
      })
  }

  /**
   * Used only in tests.
   *
   * Allows to set root DOM node, as "document.querySelector" did not find
   * elements while running in Jest. Probably there's a proper configuration,
   * but for homework assignment this was an easy and quick solution.
   *
   * @param {HTMLDivElement} node
   */
  setContainerNode = node => {
    this.container = node
    this.#setupDOM()
  }

  /**
   * Depending on error either sets or removes attributes from DOM nodes
   *
   * @param {string | null} error
   */
  #updateDOM = error => {
    if (error) {
      // Updates error message text and sets data-error attribute to display message
      // Also sets aria-describedby attribute to improve accessibility
      this.input.setAttribute('aria-describedby', this.label.id)
      this.label.setAttribute(ERROR_ATTRIBUTE, true)
      this.label.textContent = error
    } else {
      // if there's no error remove attributes and error message
      this.input.removeAttribute('aria-describedby')
      this.label.removeAttribute(ERROR_ATTRIBUTE)
      this.label.textContent = ''
    }
  }

  /**
   * Calls provided validator function with current field value
   *
   * @returns {string | null}
   */
  #validate = () => {
    const value = this.mask ? this.mask.unmaskedValue : this.input.value
    return this.validator(validator.trim(value))
  }

  /**
   * Runs validation and updates DOM
   * Returns self for easier fluent API
   *
   * @returns {Validator}
   */
  validateField = () => {
    this.#updateDOM(this.#validate())
    return this
  }

  /**
   * Returns field validity status
   *
   * @returns {boolean}
   */
  isValid = () => !this.label.hasAttribute(ERROR_ATTRIBUTE)
}

module.exports = Validator
