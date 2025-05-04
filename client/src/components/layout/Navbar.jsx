import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../common/Button'
import Logo from '../common/logo'
import { BsList, BsX } from "react-icons/bs";
import { motion, AnimatePresence } from 'motion/react';

// Navbar list 
const navbarList = [
  "Home",
  "Journeys",
  "Vision",
  "FAQ",
]

// Variants for dropdown navbar animation
const dropdownVariants = {
  hidden: {
    opacity: 0,   
    y: -10,         
    transition: {
      duration: 0.1,
      ease: "easeIn"
    }
  },
  visible: {
    opacity: 1,    
    y: 0,      
    transition: {
      duration: 0.1,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -10,     
    transition: {
      duration: 0.1,
      ease: "easeIn"
    }
  }
};


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

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

      {/* Topbar */}
      <div className='flex items-center gap-2'>
        <div
          className='bg-[#232323] flex items-center p-1 rounded-md outline outline-black gap-2' 
        >
          <Logo />

          {/* Buttons */}
          <div className='hidden sm:flex'>
            {navbarList.map((item, index) => { 
              const path = `/${item.toLowerCase()}`;
              const isActive = location.pathname === path;

              return (
                <Link to={path} key={index}>
                  <Button
                    children={item}
                    onClick={() => console.log(item)}
                    className={isActive ? "bg-[#3b3b3b] text-black" : "text-white"}
                  />
                </Link>
              )
            })}
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
        <motion.div
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.9 }}
        >
          <Button 
            className='px-5 py-3 outline-2 outline-black bg-[#232323] hover:rounded-'
            children={"Coming Soon"}
          />
        </motion.div>
      </div>

      {/* Hamburger dropdown */}
      <AnimatePresence>
      {isOpen && (
      <motion.div 
        key="dropdown"
        className='absolute bg-[#232323] flex flex-col mt-60 items-center sm:hidden p-3 rounded-md outline outline-black gap-2'
        variants={dropdownVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {navbarList.map((item, index) => { 
          const path = `/${item.toLowerCase()}`;
          const isActive = location.pathname === path;

          return (
            <Link to={path} key={index}>
              <Button
                children={item}
                onClick={() => console.log(item)}
                className={isActive ? "bg-[#3b3b3b] text-black" : "text-white"}
              />
            </Link>
          )
        })}
      </motion.div>
      )}
      </AnimatePresence>

   </header>
  )
}

export default Navbar