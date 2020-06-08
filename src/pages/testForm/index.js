import React, { useEffect } from 'react'
import { FormCreate } from '../../components'

const TestForm = FormCreate({ name: 'test-form' })(props => {
  const { createItem, getFieldErrors } = props.form
  useEffect(() => {
    console.log(getFieldErrors())
  }, [getFieldErrors])

  return (
    <>
    {createItem({
      field: 'test',
      required: true,
      requiredMessage: 'Bắt buộc',
      initValue: 'huy'
    })(
      <input />
    )}
    {createItem({
      field: 'checkbox',
      required: true,
      initValue: true
    })(
      <input type='checkbox' />
    )}
    </>
  )
})

export default  TestForm