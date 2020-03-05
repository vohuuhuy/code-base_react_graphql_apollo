import React, { Component } from 'react'

const FormCreate = object => WrappedComponent => {
  return class FormHoc extends Component {
    constructor(props) {
      super(props)

      this.items = {}
      this.required = {}
    }

    setErrorRequired = (objectCreateItem, value) => {
      const { field, required, type } = objectCreateItem
      if (required) {
        if (!value) {
          document.querySelector(`#${object.name}-${field}`).classList.add(`${type}-required`)
          return true
        }
        else {
          const item = document.querySelector(`#${object.name}-${field}`)
          if (item.classList.contains(`${type}-required`)) {
            item.classList.remove(`${type}-required`)
          }
        }
      }
      return false
    }

    handleChangeItem = (objectCreateItem, e) => {
      const { value } = e.target
      const { field } = objectCreateItem
      this.items[field] = value
      if (this.setErrorRequired(objectCreateItem, value)) {
        console.error(`form error: ${field} is required`)
      }
    }

    createItem = (objectCreateItem) => (ComponentItem) => {
      const { field, required } = objectCreateItem
      const { props: { defaultValue }, type } = ComponentItem

      objectCreateItem.type = type

      if (!this.items[field] && this.items[field] !== defaultValue ) {
        this.items[field] = defaultValue || undefined
      }
      if (required) {
        this.required[field] = true
      }
      return (
        {
          ...ComponentItem,
          props: {
            ...ComponentItem.props,
            id: `${object.name}-${field}`,
            onChange: (e) => this.handleChangeItem(objectCreateItem, e)
          }
        }
      )
    }

    render () {
      const { props, items } = this
      return (
        <div name={object.name}>
          <WrappedComponent
            { ...props }
            form={{
              createItem: this.createItem,
              getValues: () => items
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