import React from 'react'

const Button = ({ children, onClick, className = ""}) => {
  return (
    <button 
      className={`text-[10px] font-medium hover:bg-white hover:text-black text-white rounded-3xl px-2.5 py-2 ${className} transition-all`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button