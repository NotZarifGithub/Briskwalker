import React from 'react'
import Button from '../../common/Button'

const HeroSection = () => {
  return (

    // Hero Section
    <section className='flex flex-col items-center justify-center text-center min-h-[600px] pb-[100px] w-full mx-auto max-w-[400px] gap-8'>

      <div>
        <h1 className='capitalize text-5xl font-bold'>
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
        <Button 
          className='px-5 py-3 outline-2 outline-black bg-[#232323] hover:rounded-'
          children={"Coming Soon"}
        />
        <Button 
          className='px-5 py-3 outline-2 outline-black bg-[#232323] hover:rounded-'
          children={"Watch Video"}
        />
      </div>
    </section>
  )
}

export default HeroSection