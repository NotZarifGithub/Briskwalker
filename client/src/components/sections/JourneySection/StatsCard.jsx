import React from 'react'

const StatsCard = ( {name, stats} ) => {
  return (

    <div className='flex flex-col items-center'>
      <p className='capitalize font-medium text-md sm:text-lg'>
        {name}
      </p>
      <p className='font-bold text-lg'>
        {stats}
      </p>
    </div>
  )
}

export default StatsCard