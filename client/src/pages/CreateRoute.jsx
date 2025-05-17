import React from 'react'
import { GrSearch } from "react-icons/gr";
import Button from '../components/common/Button';
import { motion } from 'motion/react';

const CreateRoute = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center min-h-[calc(100vh-184px)] gap-5'>
      <div className='flex flex-col gap-3'>
        <h1 className='font-extrabold text-4xl capitalize'>
        Your ultimate briskwalking planner
        </h1>
        <p className='capitalize'>
        customize your briskwalking trip
        </p>
      </div>
      <button className='flex bg-black text-white rounded-3xl p-4 items-center gap-2'>
        <GrSearch size={20}/>
        <p className='text-sm'>
          Where would you like to go?
        </p>
      </button>
      <motion.div
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.9 }}
      >
        <Button 
          className='px-5 py-3 outline-2 outline-black bg-[#232323] hover:rounded-'
          children={"Watch Video"}
        />
      </motion.div>
    </div>
  )
}

export default CreateRoute