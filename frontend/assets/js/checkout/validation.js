import isCreditCard from 'validator/lib/isCreditCard'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import isInt from 'validator/lib/isInt'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isNumeric from 'validator/lib/isNumeric'

import masks from './mask'
import Validator from './validator'

// create validators for all fields that require validation
const validators = [
  new Validator({
    name: 'firstName',
    validator: value => (isEmpty(value) ? 'Please provide your First Name' : null),
  }),
  new Validator({
    name: 'lastName',
    validator: value => (isEmpty(value) ? 'Please provide your Last Name' : null),
  }),
  new Validator({
    name: 'email',
    validator: value => (isEmail(value) ? null : 'Please provide a valid email'),
  }),
  new Validator({
    name: 'postalCode',
    validator: value => (isNumeric(value) && value.length === 5 ? null : 'Must be 5 digits'),
  }),
  new Validator({
    name: 'phone',
    validator: value => (isMobilePhone(value) ? null : 'Please provide a valid phone number'),
    mask: masks.phone,
  }),
  new Validator({
    name: 'creditCard',
    validator: value => (isCreditCard(value) ? null : 'Please provide a valid credit card number'),
    mask: masks.creditCard,
  }),
  new Validator({
    name: 'CVV',
    validator: value => (isNumeric(value) && value.length === 3 ? null : 'Must be 3 digits'),
  }),
  new Validator({
    name: 'expDate',
    validator: value =>
      isNumeric(value) && value.length === 4 && isInt(value.substring(0, 2), { min: 1, max: 12 })
        ? null
        : 'Please provide a valid expiration date',
    mask: masks.expDate,
  }),
]

/**
 * Calls all validators and returns validation result and the first invalid input
 * @returns {{ isValid: boolean, input: HTMLInputElement= }}
 */
const checkValidity = () =>
  validators.reduce(
    (result, validator) => {
      const isValid = validator.validateField().isValid()
      return {
        isValid: isValid && result.isValid,
        input: isValid ? result.input : result.input ?? validator.input,
      }
    },
    { isValid: true, input: undefined }
  )

export default checkValidity
