import React, { useState } from 'react'
import briskwalk1 from '../../../assets/briskwalk1.jpg'
import StatsCard from './StatsCard'
import Button from '../../common/Button'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const journeys = [
  {
    image: briskwalk1,
    stats: [
      { name: 'distance', stats: '22.24 km' },
      { name: 'moving time', stats: '5:31:57' },
      { name: 'max elevation', stats: '65 m' },
      { name: 'avg pace', stats: '14:56 /km' },
      { name: 'elevation gain', stats: '213 m' },
      { name: 'steps', stats: '27,842' },
    ]
  },
]

const JourneySection = () => {
  const [index, setIndex] = useState(0);

  // carousell navigation logic
  const next = () => setIndex((prev) => (prev + 1) % journeys.length);
  const prev = () => setIndex((prev) => (prev - 1 + journeys.length) % journeys.length);
  const current = journeys[index];

  return (

    // Journey Section
    <section className='flex flex-col gap-15 py-[75px]'>
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
          {current.stats.map((s, i) => (
            <StatsCard
              key={i}
              name={s.name}
              stats={s.stats}
            />
          ))}
        </div>
      </div>

      {/* Button - switch to  */}
      <div className='flex flex-row gap-4'>
        <Button
          children={<FaArrowLeft/>}
          onClick={prev}
          className='px-3 py-3 outline-2 outline-black bg-[#232323] hover:rounded-'
        />
        <Button
          children={<FaArrowRight/>}
          onClick={next}
          className='px-3 py-3 outline-2 outline-black bg-[#232323] hover:rounded-'
        />
      </div>
    </section>
  )
}

export default JourneySection