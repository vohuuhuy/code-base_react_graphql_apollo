import { FormCreate } from './form'
import Logo from './Logo'

const validateInput = (value, required = false) => {
  if (required && !value) return true
  return false
}

export {
  Logo,
  validateInput,
  FormCreate,
}