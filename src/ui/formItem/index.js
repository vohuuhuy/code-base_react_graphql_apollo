import React from 'react'

const FormItem = props => {
  const { label, field } = props
  return (
    <div className='form-item' data-field={`${field}`}>
      { label && <span>{ label }:</span> }
      { props.children }
    </div>
  )
}

export default FormItem