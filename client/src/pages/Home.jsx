import React from 'react'
import Navbar from '../components/layout/Navbar'
import HeroSection from '../components/sections/HeroSection'

const Home = () => {

  return (
    <main className='max-w-[1000px] mx-auto '>
      <Navbar/>
      <HeroSection/>
    </main>
  )
}

export default Home