import React, { Component } from 'react'
import { IE_getValues, CR_getTypeNameValue } from '../common'

const FormCreate = object => WrappedComponent => {
  return class FormHoc extends Component {
    constructor(props) {
      super(props)
      this.fields = {}
    }
    setErrorRequired = (field, value) => {
      const { required, type, name, requiredMessage } = field
      const idField = `#${object.name}-${name}`
      if (required) {
        if (!value) {
          document.querySelector(idField).classList.add(`${type}-required`)
          this.fields[name].errors.required = requiredMessage
          return true
        }
        else {
          const item = document.querySelector(idField)
          if (item.classList.contains(`${type}-required`)) {
            item.classList.remove(`${type}-required`)
          }
        }
      }
      return false
    }
    handleChangeItem = (e, field, callBackChange) => {
      const { target } = e
      const value = IE_getValues(target)
      this.fields[field.name].value = value
      if (this.setErrorRequired(field, value)) {
        console.error(`form error: ${field.name} is required`)
      }
      if (typeof callBackChange === 'function') callBackChange(value)
    }
    createItem = (objectCreateItem) => (ComponentItem) => {
      const { field, required = false, initValue, requiredMessage = 'required' } = objectCreateItem
      const { props: { onChange } } = ComponentItem
      const type = ComponentItem.props.type || ComponentItem.type
      const callBackChange = onChange

      if (!this.fields[field])
        this.fields[field] = {
          name: field,
          id: `${object.name}-${field}`,
          initValue,
          value: initValue,
          required,
          requiredMessage,
          type,
          errors: {}
        }
      else console.error(`form error: double keys field: ${field}`)
      return (
        {
          ...ComponentItem,
          props: {
            ...ComponentItem.props,
            id: this.fields[field].id,
            [CR_getTypeNameValue(ComponentItem)]: initValue,
            onChange: e => this.handleChangeItem(e, this.fields[field], callBackChange)
          }
        }
      )
    }
    getFieldValues = () => {
      const fieldValues = {}
      Object.keys(this.fields).forEach(key => fieldValues[key] = this.fields[key].value)
      return fieldValues
    }
    getFieldErrors = () => {
      const fieldErrors = {}
      Object.keys(this.fields).forEach(key => {
        const { name, errors } = this.fields[key]
        fieldErrors[name] = {}
        Object.keys(errors).forEach(keyErr => {
          fieldErrors[name][keyErr] = errors[keyErr]
        })
      })
      return fieldErrors
    }
    render () {
      const { props, getFieldValues, getFieldErrors } = this
      return (
        <div name={object.name}>
          <WrappedComponent
            { ...props }
            form={{
              createItem: this.createItem,
              getFieldValues,
              getFieldErrors
            }}
          />
        </div>
      )
    }
  }
}

export {
  FormCreate,
}