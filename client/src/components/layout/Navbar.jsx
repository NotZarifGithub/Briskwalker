import React from 'react'
import Button from '../common/Button'
import Logo from '../common/logo'

const Navbar = () => {
  return (
    <header
      className='flex justify-center items-center gap-2'
    >
      <div
        className='bg-[#232323] flex items-center p-1 rounded-md outline outline-black gap-2' 
      >
        <Logo />

        {/* Buttons */}
        <div className='flex'>

          {/* Home button */}
          <Button 
            onClick={() => console.log("hover")}
            children={"Home"}
          />

          {/* Journeys button */}
          <Button 
            onClick={() => console.log("hover")}
            children={"Journeys"}
          />

          {/* Vision button */}
          <Button 
            onClick={() => console.log("hover")}
            children={"Vision"}
          />

          {/* FAQ button */}
          <Button 
            onClick={() => console.log("hover")}
            children={"FAQ"}
          />
        </div>
      </div>

      {/* Comming soon Button */}
      <Button 
        className='px-5 py-3 outline-2 outline-black bg-[#232323] hover:rounded-'
        children={"Coming Soon"}
      />
   </header>
  )
}

export default Navbar