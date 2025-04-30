import React from 'react'
import Logo from '../common/logo'
import { FaFacebook } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='flex justify-between items-center py-[75px]'>

      <div>
        <p className='font-bold italic'>
          Briswalker
        </p>
      </div>
      <div>
        <Logo/>
      </div>
      <div className='flex gap-3'>
        <FaFacebook size={20}/>
        <FaTiktok size={20}/>
        <FaTelegram size={20}/>
      </div>
    </footer>
  )
}

export default Footer