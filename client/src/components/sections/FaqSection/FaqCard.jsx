import React, { useState } from 'react'
import { IoAdd, IoRemove } from "react-icons/io5";

const FaqCard = ( {question, answer} ) => {
  const [isOpen, setIsOpen] = useState(false);

  return (

    // FAQ Card
    <div 
      className=''
      onClick={() => setIsOpen(!isOpen)}
    >

      <div className='flex flex-row items-center bg-white justify-between px-6 py-4'>

        {/* Question */}
        <p>
          {question}
        </p>

        {/* button [+] */}
        <span>
          {isOpen ? <IoRemove/> : <IoAdd/>}
        </span>
      </div>

      {/* Answer */}
      {isOpen && 
        <p className='flex flex-row items-center bg-white justify-between px-6 py-4'>
          {answer}
        </p>
      }
    </div>
  )
}

export default FaqCard