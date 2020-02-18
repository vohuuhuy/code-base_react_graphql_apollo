import React from 'react'
import './index.css'

const Logo = (props) => {
  const { width, height } = props
  return (
    <div
      className='logo'
      alt=''
      style={{
        width,
        height
      }}
    />
  )
}

const validateInput = (value, required = false) => {
  if (required && !value) return true
  return false
}

export {
  Logo,
  validateInput
}