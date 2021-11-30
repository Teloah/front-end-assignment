import masks from './mask'

const fields = [
  { name: 'firstName' },
  { name: 'lastName' },
  { name: 'email' },
  { name: 'country' },
  { name: 'postalCode' },
  { name: 'phone', isMasked: true },
  { name: 'creditCard', isMasked: true },
  { name: 'CVV' },
  {
    name: 'expDate',
    isMasked: true,
    formatter: value => `${value.substring(0, 2)}/${value.substring(2)}`,
  },
]

/**
 * Gathers values from all fields and puts them in FormData
 *
 * @returns {FormData}
 */
export const createFormData = () => {
  const data = new FormData()
  fields.forEach(field => {
    const input = document.querySelector(`[name=${field.name}]`)
    const value = field.isMasked ? masks[field.name].unmaskedValue : input.value
    const formattedValue = field.formatter ? field.formatter(value) : value
    data.append(field.name, formattedValue)
  })
  return data
}
