import React from 'react'
import { Logo } from '../../components'
import './index.css'

const Login = () => {
  return (
    <div className='login'>
      <div className='header-login'>
        <Logo width={117} height={60} style={{ margin: 'auto' }} />
      </div>
      <div className='body-login'>
        <label for='username'>Tên người dùng</label>
        <input id='username' className='input-login' type='text'/>
        <label for='password'>Mật khẩu</label>
        <input id='password' className='input-login' type='password'/>
        <button className='btn-login'>Đăng nhập</button>
        <span className='forget-pass'>Quên mật khẩu ?</span>
      </div>
      <div className='dash dash-login' />
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <button className='btn-register'>Tạo tài khoản mới</button>
      </div>
    </div>
  )
}

export default Login