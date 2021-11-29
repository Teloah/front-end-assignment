/**
 * @jest-environment jsdom
 */

const IMask = require('imask').default
const isInt = require('validator/lib/isInt')
const isNumeric = require('validator/lib/isNumeric')
const { getByText, queryByText, getByLabelText, fireEvent } = require('@testing-library/dom')

const Validator = require('./validator')

describe('Validator', () => {
  describe('Unmasked field', () => {
    const setupPostalCodeDOM = () => {
      const div = document.createElement('div')
      div.innerHTML = `
      <div class="inputField">
        <div class="inputWrapper">
          <label for="postalCode">
            Postal Code
          </label>
          <input id=postalCode name=postalCode placeholder="10001" data-mask="00000" />
        </div>
        <div id="postalCode-error" class="error"></div>
      </div>
      `
      return div
    }
    const errorMessage = 'Invalid postal code'
    const validatePostalCode = value => (/^[0-9]{5}$/.exec(value) ? null : errorMessage)
    const createValidator = () =>
      new Validator({
        name: 'postalCode',
        validator: validatePostalCode,
      })
    const labelText = /postal code/i
    const invalidPostalCode = '123'
    const validPostalCode = '12345'

    it('shows error on empty input', async () => {
      const container = setupPostalCodeDOM()
      const validator = createValidator()
      validator.setContainerNode(container)

      validator.validateField()

      getByText(container, errorMessage)
    })

    it('shows error on invalid input', async () => {
      const container = setupPostalCodeDOM()
      const input = getByLabelText(container, labelText)
      const validator = createValidator()
      validator.setContainerNode(container)

      fireEvent.change(input, { target: { value: invalidPostalCode } })
      validator.validateField()

      getByText(container, errorMessage)
    })

    it('does not show error on valid input', async () => {
      const container = setupPostalCodeDOM()
      const input = getByLabelText(container, labelText)
      const validator = createValidator()
      validator.setContainerNode(container)

      fireEvent.change(input, { target: { value: validPostalCode } })
      validator.validateField()

      const errorDiv = queryByText(container, errorMessage)
      expect(errorDiv).toBeNull()
    })

    it('validates on Blur event', async () => {
      const container = setupPostalCodeDOM()
      const input = getByLabelText(container, labelText)
      const validator = createValidator()
      validator.setContainerNode(container)

      fireEvent.blur(input)

      getByText(container, errorMessage)
    })

    it('clears error on valid input', async () => {
      const container = setupPostalCodeDOM()
      const input = getByLabelText(container, labelText)
      const validator = createValidator()
      validator.setContainerNode(container)

      // enter invalid value first...
      fireEvent.change(input, { target: { value: invalidPostalCode } })
      fireEvent.blur(input)
      getByText(container, errorMessage)
      // ...and then fix it
      fireEvent.input(input, { target: { value: validPostalCode } })

      const errorDiv = queryByText(container, errorMessage)
      expect(errorDiv).toBeNull()
    })

    it('isValid returns false on invalid input', () => {
      const container = setupPostalCodeDOM()
      const validator = createValidator()
      validator.setContainerNode(container)

      expect(validator.validateField().isValid()).toBeFalsy()
    })

    it('isValid returns false on invalid input', () => {
      const container = setupPostalCodeDOM()
      const input = getByLabelText(container, labelText)
      const validator = createValidator()
      validator.setContainerNode(container)

      fireEvent.change(input, { target: { value: validPostalCode } })

      expect(validator.validateField().isValid()).toBeTruthy()
    })
  })

  describe('Masked field', () => {
    const setupExpiryDateDOM = () => {
      const div = document.createElement('div')
      div.innerHTML = `
      <div class="inputField">
        <div class="inputWrapper">
          <label for="expDate">
            Expiration Date
          </label>
          <input id="expDate" name="expDate" data-mask="00 / 00" placeholder="MM / YY" />
        </div>
        <div id="expDate-error" class="error"></div>
      </div>
      `
      return div
    }
    const errorMessage = 'Please provide a valid expiration date'
    const validateExpiryDate = value =>
      isNumeric(value) && value.length === 4 && isInt(value.substring(0, 2), { min: 1, max: 12 })
        ? null
        : errorMessage
    const createValidator = mask =>
      new Validator({
        name: 'expDate',
        validator: validateExpiryDate,
        mask,
      })
    const maskOptions = { mask: '00 / 00' }
    const labelText = /expiration date/i
    const invalidExpiryDate = '987'
    const validExpiryDate = '1234'

    it('shows error on invalid input', () => {
      const container = setupExpiryDateDOM()
      const input = getByLabelText(container, labelText)
      const mask = IMask(input, maskOptions)
      const validator = createValidator(mask)
      validator.setContainerNode(container)

      fireEvent.change(input, { target: { value: invalidExpiryDate } })
      fireEvent.blur(input)

      getByText(container, errorMessage)
    })

    it('does not show error on valid input', () => {
      const container = setupExpiryDateDOM()
      const input = getByLabelText(container, labelText)
      const mask = IMask(input, maskOptions)
      const validator = createValidator(mask)
      validator.setContainerNode(container)

      fireEvent.change(input, { target: { value: validExpiryDate } })
      fireEvent.blur(input)

      const errorDiv = queryByText(container, errorMessage)
      expect(errorDiv).toBeNull()
    })
  })
})
