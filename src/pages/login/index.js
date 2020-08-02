import React, { useRef, useReducer, useContext } from 'react'
import { Input, Form, Button } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { store } from 'react-notifications-component'
import * as CryptoJS from 'crypto-js'
import { MUTATION_LOGIN, MUTATION_REGISTER } from './gql'
import { notification } from '../../common/notification'
import { ContextApp } from 'tools'

const Login = () => {
  const contextApp = useContext(ContextApp)
  const reducer = useRef((state, action) => {
    if (action.type) {
      switch (action.type) {
        default: return state
      }
    }
    return { ...state, ...action }
  })
  const initState = useRef({
    mode: 'login'
  })

  const [state, setState] = useReducer(
    reducer.current,
    initState.current
  )

  const processingRef = React.useRef(false)
  const [form] = Form.useForm()

  const [verifyLoginMutation] = useMutation(MUTATION_LOGIN)
  const [verifyRegisterMutation] = useMutation(MUTATION_REGISTER)

  const verifyLogin = () => {
    if (processingRef.current) return
    processingRef.current = true
    form.validateFields()
      .then(async (values) => {
        verifyLoginMutation({
          variables: {
            ...values,
            password: CryptoJS.SHA256(values.password).toString()
          }
        })
          .then(({ data: { login } }) => {
            store.addNotification({
              ...notification,
              message: 'Đăng nhập thành công!',
              type: 'success',
            })
            if (login.authorization) {
              contextApp.login()
            }
            processingRef.current = false
          })
          .catch(error => {
            const errorString = error.toString()
            if (errorString.includes('userName not found')) {
              store.addNotification({
                ...notification,
                message: 'Tài khoản không tồn tại',
                type: 'warning',
              })
            } else if (errorString.includes('password not success')) {
              store.addNotification({
                ...notification,
                message: 'Mật khẩu không chính xác',
                type: 'warning',
              })
            }
            processingRef.current = false
          })
      })
      .catch(() => {
        processingRef.current = false
      })
  }

  const verifyRegister = () => {
    if (processingRef.current) return
    processingRef.current = true
    form.validateFields()
      .then(values => {
        if (values.password !== values.confirmPassword) {
          store.addNotification({
            ...notification,
            message: 'Mật khẩu xác nhận không chính xác',
            type: 'danger',
          })
          form.setFields([
            { name: 'password', value: '' },
            { name: 'confirmPassword', value: '' }
          ])
        } else {
          delete values.confirmPassword
          verifyRegisterMutation({
            variables: { inputUser: values }
          })
            .then(({ data: { register } }) => {
              store.addNotification({
                ...notification,
                message: 'Đăng ký thành công!',
                type: 'success',
              })
              changeMode('login')
              form.setFields([
                { name: 'userName', value: register?.userName },
                { name: 'password', value: '' }
              ])
              processingRef.current = false
            })
            .catch(error => {
              const errorString = error.toString()
              if (errorString.includes('userName existed')) {
                store.addNotification({
                  ...notification,
                  message: 'Tài khoản đã tồn tại',
                  type: 'warning',
                })
              } else if (errorString.includes('password not success')) {
                store.addNotification({
                  ...notification,
                  message: 'Email đã tồn tại',
                  type: 'warning',
                })
              }
              processingRef.current = false
            })
        }
        processingRef.current = false
      })
  }

  const changeMode = mode => {
    setState({ mode })
    form.resetFields()
  }

  if (state.mode === 'register') {
    return (
      <div className='login register-animation'>
        <Form
          form={form}
          name='login'
        >
          <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item
              name='firstName'
              rules={[{ required: true, message: 'Chưa nhập họ!' }]}
              style={{ display: 'inline-block', width: 'calc(40% - 8px)' }}
            >
              <Input type='text' placeholder='Họ' />
            </Form.Item>
            <Form.Item
              name='lastName'
              rules={[{ required: true, message: 'Chưa nhập tên!' }]}
              style={{ display: 'inline-block', width: 'calc(60%)', marginLeft: 8 }}
            >
              <Input type='text' placeholder='Tên' />
            </Form.Item>
          </Form.Item>
          <Form.Item
            name='email'
            rules={[
              { required: true, message: 'Chưa nhập email!' },
              { type: 'email', message: 'Email không đúng định dạng!' }
            ]}
          >
            <Input type='email' placeholder='Email' />
          </Form.Item>
          <Form.Item
            name='userName'
            rules={[{ required: true, message: 'Chưa nhập tài khoản!' }]}
          >
            <Input type='text' placeholder='Tài khoản' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Chưa nhập mật khẩu!' }]}
          >
            <Input type='password' placeholder='Mật khẩu' />
          </Form.Item>
          <Form.Item
            name='confirmPassword'
            rules={[{ required: true, message: 'Chưa xác nhận mật khẩu!' }]}
          >
            <Input type='password' placeholder='Xác nhận mật khẩu' />
          </Form.Item>
          <Button onClick={verifyRegister} block>Đăng ký</Button>
          <Button type='link' style={{ paddingLeft: 0, marginTop: 7 }} onClick={() => changeMode('login')}>Đăng nhập</Button>
        </Form>
      </div>
    )
  }

  // if (state.mode === 'forget') {
  //   return (
  //     <div className='login forget-animation' style={{ width: 320 }}>
  //       <Form
  //         form={form}
  //         name='login'
  //       >
  //         <Form.Item style={{ marginBottom: 0 }}>
  //           <Form.Item
  //             name='email'
  //             rules={[
  //               { required: true, message: 'Chưa nhập email!' },
  //               { type: 'email', message: 'Email không đúng định dạng!' }
  //             ]}
  //             style={{ display: 'inline-block', width: 'calc(70% - 8px)' }}
  //           >
  //             <Input type='email' placeholder='Nhập email của bạn' onPressEnter={verifyLogin} />
  //           </Form.Item>
  //           <Form.Item
  //             style={{ display: 'inline-block', width: 'calc(30%)', marginLeft: 8 }}
  //           >
  //             <Button type='primary'>Gửi</Button>
  //           </Form.Item>
  //         </Form.Item>
  //         <Button type='link' style={{ paddingLeft: 0, marginTop: 7 }} onClick={() => changeMode('login')}>Đăng nhập</Button>
  //       </Form>
  //     </div>
  //   )
  // }

  return (
    <div className='login login-animation'>
      <Form
        form={form}
        name='login'
      >
        <Form.Item
          name='userName'
          rules={[{ required: true, message: 'Chưa nhập tài khoản!' }]}
        >
          <Input type='text' placeholder='Tài khoản' onPressEnter={verifyLogin} />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Chưa nhập mật khẩu!' }]}
        >
          <Input type='password' placeholder='Mật khẩu' onPressEnter={verifyLogin} />
        </Form.Item>
        <Button onClick={verifyLogin} block>Đăng nhập</Button>
        <div style={{ marginTop: 7, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button type='link' style={{ paddingLeft: 0 }} onClick={() => changeMode('register')}>Tài khoản mới</Button>
          {/* <Button type='link' style={{ paddingLeft: 0 }} onClick={() => changeMode('forget')}>Quên mật khẩu</Button> */}
        </div>
      </Form>
    </div>
  )
}

export default Login