import React, { PureComponent } from 'react'
import { FormCreate } from '../../components'
import { movePageDidmount } from '../../common'

class Register extends PureComponent {

  async componentDidMount () {
    movePageDidmount()
  }

  render () {
    const { createItem, getValues } = this.props.form
    return (
      <div className='page-hide'>
        {
          createItem({
            field: 'username',
            required: true
          })(<input defaultValue='aaa' />)
        }
        {
          createItem({
            field: 'password',
            required: true
          })(<input type='password' />)
        }
        <button onClick={() => console.log(getValues())}></button>
      </div>
    )
  }
}

export default FormCreate({ name: 'register-form' })(Register)