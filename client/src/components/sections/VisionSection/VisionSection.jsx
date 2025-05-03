import React from 'react'
import VisionCard from './VisionCard'

const VisionSection = () => {
  return (

    // Vision Section
    <section className='flex flex-col md:flex-row gap-10 justify-center min-h-[calc(100vh-184px)] items-center '> 

      <div className='flex flex-col gap-10'>
        <VisionCard
          h1={'Vision'}
          p={`At Briskwalker, we imagine a world where walking is more than just movement — it’s a 
            daily ritual that brings joy, clarity, and well-being. We aim to make brisk walking a 
            simple, sustainable way for people to stay active and connected to their surroundings.`}
        />
        <VisionCard
          h1={'Mission'}
          p={`Our mission is to help people move with purpose. Briskwalker offers smart, easy-to-use 
            tools for planning walking routes, staying motivated, and making movement a natural part 
            of everyday life — one step at a time.`}
        />
      </div>
      <div className='flex justify-center items-center'>
        <VisionCard
          h1={'Core Values'}
          p={`At Briskwalker, we value simplicity, empowerment, and inclusivity. We design intuitive 
            tools that make walking easy and enjoyable, encouraging daily movement, exploration, 
            and well-being for everyone`}
        />
      </div>
    </section>
  )
}

export default VisionSection