import React from 'react'
// width = 1.93670886076 * height

export default (props) => {
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
