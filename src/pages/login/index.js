import React, { useRef, useReducer, useContext } from 'react'
import { Input, Form, Button } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { MUTATION_LOGIN, MUTATION_REGISTER } from './gql'
import { store } from 'react-notifications-component'
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
    isLogin: true
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
      .then(values => {
        verifyLoginMutation({
          variables: values
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
              setState({ isLogin: true })
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

  const changeMode = boolean => {
    setState({ isLogin: boolean })
    form.resetFields()
  }

  if (state.isLogin) {
    return (
      <div className='login'>
        <Form
          form={form}
          name='login'
        >
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
          <Button onClick={verifyLogin} block>Đăng nhập</Button>
          <Button type='link' style={{ paddingLeft: 0, marginTop: 7 }} onClick={() => changeMode(false)}>Tài khoản mới</Button>
        </Form>
      </div>
    )
  }

  return (
    <div className='login'>
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
        <Button type='link' style={{ paddingLeft: 0, marginTop: 7 }} onClick={() => changeMode(true)}>Đăng nhập</Button>
      </Form>
    </div>
  )
}

export default Login