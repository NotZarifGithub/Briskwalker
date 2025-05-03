import React from 'react'

const VisionCard = ( {h1, p} ) => {
  return (

    // Vision Card
    <div className='flex flex-col gap-4 max-w-[350px]'>
      <h1 className='font-bold capitalize text-3xl md:text-4xl'>
        {h1}
      </h1>
      <p className='text-sm'>
        {p}
      </p>
      </div>
  )
}

export default VisionCard