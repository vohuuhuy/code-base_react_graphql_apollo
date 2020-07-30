import React, { useContext } from 'react'
import { Button } from 'antd'
import { ContextApp } from 'tools'

const Home = () => {
  const { logout } = useContext(ContextApp)
  return (
    <Button onClick={() => logout()} type='link'>Đăng xuất</Button>
  )
}

export default Home