import React from 'react'
import Navbar from '../components/layout/Navbar'
import HeroSection from '../components/sections/HeroSection/HeroSection'
import VisionSection from '../components/sections/VisionSection/VisionSection'

const Home = () => {

  return (
    <main className='max-w-[1000px] mx-auto '>
      <Navbar/>
      <HeroSection/>
      <VisionSection/>
    </main>
  )
}

export default Home