import React from 'react'
import Button from '../../common/Button'
import { motion } from 'motion/react'

const HeroSection = () => {
  return (

    // Hero Section
    <main className='flex flex-col items-center justify-center text-center min-h-[calc(100vh-184px)] w-full mx-auto max-w-[300px] sm:max-w-[400px] gap-8'>

      <div>
        <h1 className='capitalize font-bold text-4xl sm:text-5xl'>
          plan your perfect briswalking adventure today
        </h1>
      </div>

      <div>
        <p className=''>
          Your simple tool for planning briskwalking routes. Get moving, map your path, and enjoy the fresh air!
        </p>
      </div>

      {/* Buttons */}
      <div className='gap-7 flex'>
        <motion.div
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.9 }}
        >
          <Button 
            className='px-5 py-3 outline-2 outline-black bg-[#232323] hover:rounded-'
            children={"Coming Soon"}
          />
        </motion.div>
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
    </main>
  )
}

export default HeroSection