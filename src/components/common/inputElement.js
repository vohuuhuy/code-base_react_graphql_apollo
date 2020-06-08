export const IE_getValues = target => {
  const { type, value, checked } = target
  if (type === 'checkbox') return checked
  return value
}

export const IE_getTypeNameValue = target => {
  const { type } = target
  if (type === 'checkbox') return 'defaultChecked'
  return 'defaultValue'
}
