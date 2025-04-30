import React from 'react'

const Logo = ({ onClick }) => {
  return (
    <button
      className='bg-orange-600 text-3xl font-bold rounded-sm px-2'
      onClick={onClick}
    >
      B
    </button>
  )
}

export default Logo