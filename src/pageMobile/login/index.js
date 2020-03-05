import React, { Component } from 'react'
import { Logo } from '../../components'
import './index.css'

class Login extends Component {

  render () {
    return (
      <div className='login-mobile'>
        <div className='header-login'>
          <Logo width={117} height={60} style={{ margin: 'auto' }} />
        </div>
        <div className='body-login'>
          <label htmlFor='username'>Tên người dùng</label>
          <input id='username' className='input-login' type='text'/>
          <label htmlFor='password'>Mật khẩu</label>
          <input id='password' className='input-login' type='password'/>
          <button className='btn-login'>Đăng nhập</button>
          <span className='forget-pass'>Quên mật khẩu ?</span>
        </div>
        <div className='dash dash-login' />
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button className='btn-register' onClick={() => this.props.history.push('/register')}>Tạo tài khoản mới</button>
        </div>
      </div>
    )
  }
}

export default Login