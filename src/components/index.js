import React from 'react'
import '../common/css/index.css'

// width = 1.93670886076 * height
const Logo = (props) => {
  const { width, height, style } = props
  return (
    <div
      className='logo'
      alt=''
      style={{
        width,
        height,
        ...style
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