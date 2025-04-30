import React from 'react'

const VisionCard = ( {h1, p} ) => {
  return (

    // Vision Card
    <div className='flex flex-col gap-8 max-w-[350px]'>
      <h1 className='font-bold capitalize text-5xl'>
        {h1}
      </h1>
      <p>
        {p}
      </p>
      </div>
  )
}

export default VisionCard