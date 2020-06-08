export const CR_getTypeNameValue = compo => {
  const { type } = compo.props
  if (type === 'checkbox') return 'defaultChecked'
  return 'defaultValue'
}