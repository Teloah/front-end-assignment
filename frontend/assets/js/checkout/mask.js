import IMask from 'imask'

const masks = {}

document.querySelectorAll('input[data-mask]').forEach(input => {
  const mask = IMask(input, { mask: input.getAttribute('data-mask'), overwrite: true })
  masks[input.getAttribute('name')] = mask
})

export default masks
