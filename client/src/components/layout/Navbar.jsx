import React, { useState, useEffect } from 'react'
import Button from '../common/Button'
import Logo from '../common/logo'
import { BsList, BsX } from "react-icons/bs";

const navbarList = [
  "Home",
  "Journeys",
  "Vision",
  "FAQ",
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu on screen resize >= sm
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      className='flex justify-center items-center gap-2'
    >
      <div className='flex items-center gap-2'>
      <div
        className='bg-[#232323] flex items-center p-1 rounded-md outline outline-black gap-2' 
      >
        <Logo />

        {/* Buttons */}
        <div className='hidden sm:flex'>
          {navbarList.map((item, index) => (
            <Button
              key={index}
              children={item}
              onClick={() => console.log(item)}
            />
          ))}
        </div>

        {/* Hamburger */}
        <div>
          {isOpen ? 
            <BsX
              size={30}
              onClick={() => (setIsOpen(!isOpen))}
              className='text-white sm:hidden'
            />
          :
            <BsList 
              size={30}
              onClick={() => (setIsOpen(!isOpen))}
              className='text-white sm:hidden'         
            />
          }
        </div>
      </div>

      {/* Comming soon Button */}
      <Button 
        className='px-5 py-3 outline-2 outline-black bg-[#232323] hover:rounded-'
        children={"Coming Soon"}
      />
      </div>

      {isOpen && (
      <div className='absolute bg-[#232323] flex flex-col mt-60 items-center sm:hidden p-3 rounded-md outline outline-black gap-2'>
        {navbarList.map((item, index) => (
          <Button
            key={index}
            children={item}
            onClick={() => console.log(item)}
          />          
        ))}
      </div>
      )}
   </header>
  )
}

export default Navbar