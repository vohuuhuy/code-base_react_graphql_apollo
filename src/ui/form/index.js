import React, { useEffect, useState } from 'react'

const Form = props => {
  const [formState, setForm] = useState({})
  const { name, getForm } = props
  useEffect(() => {
    const getFieldValues = {}
    const form = document.querySelector(`#${name}`)
    const formItems = form.querySelectorAll('.form-item')
    const elements = form.querySelectorAll('.form-item > :nth-child(2)')
    const [fields, values] = [
      Array.from(formItems).map(item => item.dataset.field),
      Array.from(elements).map(element => element.value)
    ]
    fields.forEach((field, index) => getFieldValues[field] = values[index])
    setForm({ ...formState, getFieldValues })
  }, [])
  useEffect(() => {
    getForm(formState)
  }, [formState])
  return (
    <div id={`${name}`}>
      { props.children }
    </div>
  )
}

export default Form
