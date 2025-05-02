import React from 'react'
import Navbar from '../components/layout/Navbar'
import HeroSection from '../components/sections/HeroSection/HeroSection'
import VisionSection from '../components/sections/VisionSection/VisionSection'
import FaqSection from '../components/sections/FaqSection/FaqSection'
import Footer from '../components/layout/Footer'
import JourneySection from '../components/sections/JourneySection/JourneySection'

const Home = () => {
  return (
    <div className='py-8 flex flex-col gap-5 px-6 sm:px-12'>
      <Navbar/>
      <HeroSection/>
      <Footer/>
    </div>
  )
}

export default Home