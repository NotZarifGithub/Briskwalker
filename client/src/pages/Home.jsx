import React from 'react'
import Navbar from '../components/layout/Navbar'
import HeroSection from '../components/sections/HeroSection/HeroSection'
import VisionSection from '../components/sections/VisionSection/VisionSection'
import FaqSection from '../components/sections/FaqSection/FaqSection'
import Footer from '../components/layout/Footer'

const Home = () => {
  return (
    <main className='max-w-[800px] mx-auto '>
      <Navbar/>
      <HeroSection/>
      <VisionSection/>
      <FaqSection/>
      <Footer/>
    </main>
  )
}

export default Home