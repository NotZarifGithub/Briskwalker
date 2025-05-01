import React from 'react'
import briskwalk1 from '../../../assets/briswalk1.jpg'
import StatsCard from './StatsCard'

const JourneySection = () => {
  return (

    // Journey Section
    <section className='flex flex-col gap-15'>
      <div>
        <h1 className='capitalize font-bold text-5xl'>
          the journeys
        </h1>
      </div>
      <div className='flex gap-20 items-center'>

        {/* Image */}
        <div className='w-full max-w-[350px]'>
          <img 
            src={briskwalk1} 
            alt="Briskwalk Image" 
            className='w-full h-auto rounded-lg'
          />
        </div>

        {/* Stats Card */}
        <div className='grid grid-cols-2 gap-10'>
          <StatsCard
            name={'distance'}
            stats={'22.24 km'}
          />
          <StatsCard
            name={'moving time'}
            stats={'5:31:57'}
          />
          <StatsCard
            name={'max elevation'}
            stats={'65 m'}
          />
          <StatsCard
            name={'avg pace'}
            stats={'14:56 /km'}
          />
          <StatsCard
            name={'elevation gain'}
            stats={'213 m'}
          />
          <StatsCard
            name={'steps'}
            stats={'27,842'}
          />
        </div>
      </div>
      <div>

      </div>
    </section>
  )
}

export default JourneySection