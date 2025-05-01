import React from 'react'

const StatsCard = ( {name, stats} ) => {
  return (

    <div className='flex flex-col gap-1'>
      <p className='capitalize font-medium text-xl'>
        {name}
      </p>
      <p className='font-bold text-2xl'>
        {stats}
      </p>
    </div>
  )
}

export default StatsCard