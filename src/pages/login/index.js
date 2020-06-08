import React, { useState, useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Logo, validateInput } from '../../components'
import { MUTATION_CREATEUSER, QUERY_LOGIN } from './gql'
import './index.css'

const initFieldRegisters = {
  firstname: '', lastname: '', username: '', password: '', rePassword: ''
}

const initFieldLogins = { username: '', password: '' }

const Login = () => {
  const [createUser, { client }] = useMutation(MUTATION_CREATEUSER)

  const [fieldLogins, setFieldLogins] = useState(initFieldLogins)
  const [fieldRegisters, setFieldRegisters] = useState(initFieldRegisters)

  const handleLogin = useCallback(() => {
    const { username, password } = fieldLogins
    if (!username) { return }
    if (!password) { return }
    client.query({
      query: QUERY_LOGIN,
      variables: { username, password }
    })
      .then(({ data: { login } }) => {
        if (login) {
          const { token } = login
          localStorage.setItem('tqcSocialToken', token)
        } else console.log('dang nhap khong thanh cong')
      })
      .catch(errors => {
        console.log(errors)
      })
  }, [fieldLogins, client])

  const handleRegister = useCallback(() => {
    if (
      !Object.keys(fieldRegisters).some(key => {
        if (validateInput(fieldRegisters[key], true)) {
          console.log(key + ' không được để trống')
          return true
        }
        return false
      })
    ) {
      const fields = fieldRegisters
      delete fields.rePassword
      createUser({
        variables: { ...fields }
      })
        .then(({ data: { createUser: { username } } }) => {
          setFieldLogins({ ...initFieldLogins, username })
          setFieldRegisters(initFieldRegisters)
        })
        .catch(error => { console.log(error) })
    }
  }, [fieldRegisters, createUser])

  return (
    <div className='login'>
      <div className='content'>
        <Logo width={175} height={90} style={{ marginBottom: 20 }} />
        <div className='container'>
          <div className='login-area'>
            <div>
              <span className='title-login'>Đăng nhập bằng tài khoản</span>
              <input
                className='form-login-input form-login-usename'
                placeholder='Tên người dùng'
                onChange={event => setFieldLogins({ ...fieldLogins, username: event.target.value })}
                value={fieldLogins.username}
              />
              <input
                className='form-login-input form-login-password'
                placeholder='Mật khẩu'
                onChange={event => setFieldLogins({ ...fieldLogins, password: event.target.value })}
                type='password'
                value={fieldLogins.password}
              />
              <button
                className='tqc-ui-btn form-login-btn-submit'
                onClick={handleLogin}
              >
                Đăng Nhập
              </button>
              <span className='forget-password'>Quên mật khẩu?</span>
            </div>
            <div className='login-area-footer'>
              <div className='info'>
                <span className='info-item'>Giới thiệu về chúng tôi</span>
                <span className='info-item'>Trợ giúp </span>
                <span className='info-item'>Điều khoản</span>
              </div>
              <span style={{ color: '#796a6a', fontSize: '15px'}} >MXH TQC &copy; 2020</span>
            </div>
          </div>
          <div className='bar-center' />
          <div className='register-area'>
            <span className='register-title-1'>Đăng Ký Tài Khoản</span>
            <span className='register-title-2'>Nhanh chóng dễ dàng</span>
            <div>
              <div className='form-group-input-1'>
                <input
                  className='form-register-input group-input-1'
                  placeholder='Họ'
                  onChange={event => setFieldRegisters({ ...fieldRegisters, lastname: event.target.value })}
                  value={fieldRegisters.lastname}
                />
                <input
                  className='form-register-input group-input-1'
                  placeholder='Tên'
                  onChange={event => setFieldRegisters({ ...fieldRegisters, firstname: event.target.value })}
                  value={fieldRegisters.firstname}
                />
              </div>
              <input
                className='form-register-input input-max-width'
                placeholder='Tên người dùng'
                onChange={event => setFieldRegisters({ ...fieldRegisters, username: event.target.value })}
                value={fieldRegisters.username}
              />
              <input
                className='form-register-input input-max-width'
                placeholder='Mật khẩu'
                onChange={event => setFieldRegisters({ ...fieldRegisters, password: event.target.value })}
                type='password'
                value={fieldRegisters.password}
              />
              <input
                className='form-register-input input-max-width'
                placeholder='Nhập lại mật khẩu'
                onChange={event => setFieldRegisters({ ...fieldRegisters, rePassword: event.target.value })}
                type='password'
                value={fieldRegisters.rePassword}
              />
            </div>
            <div className='bottom-rigth'>
              <button
                className='tqc-ui-btn form-register-btn-submit'
                onClick={handleRegister}
              >
                Đăng ký
              </button>
              <span className='verify-policy'>Bằng cách đăng ký, bạn đồng ý với Điều khoản, Chính sách dữ liệu và Chính sách cookie của chúng tôi. </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login