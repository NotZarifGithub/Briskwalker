import React, { useState } from 'react'
import { GrSearch } from "react-icons/gr"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { FaArrowLeft } from 'react-icons/fa'
import Button from '../../common/Button'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import LocationInput from '../../../utils/LocationInput'

// Slide-up animation variants
const slideUpVariants = {
  hidden: {
    y: "100%",
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
}

const CreateRouteSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFrom, setCurrentFrom] = useState(false);
  const [currentTo, setCurrentTo] = useState(false);
  const navigate = useNavigate();

  // Callback function for locationInput
  const handleFromSelected = (place) => {
    if (place.geometry) {
      const updated = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        name: place.name || place.formatted_address
      };
      setCurrentFrom(updated);
    }
  }
  const handleToSelected = (place) => {
    if (place.geometry) {
      const updated = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        name: place.name || place.formatted_address
      };
      setCurrentTo(updated);
    }
  }

  // Star Planning button handler
  const handleStartPlanningButton = () => {
    if (currentFrom && currentTo) {
      navigate('/route-map', { state: { from: currentFrom, to: currentTo } });
    } else {
      alert('Please select both locations!');
    }
  }

  return (
    <div className='flex flex-col items-center justify-center text-center min-h-[calc(100vh-184px)] gap-8 lg:gap-5 relative overflow-hidden outline-1'>
      
      {/* Headline and subtext */}
      <div className='flex flex-col gap-3 max-w-[600px]'>
        <h1 className='font-extrabold text-4xl capitalize lg:text-5xl'>
          Your ultimate briskwalking planner
        </h1>
        <p className='capitalize'>
          customize your briskwalking trip
        </p>
      </div>

      {/* Search button */}
      <button 
        className='flex text-black rounded-3xl p-4 items-center gap-3 outline-1 bg-white shadow lg:hidden'
        onClick={() => setIsOpen(true)}
      >
        <GrSearch size={20}/>
        <p className='text-sm'>
          Where would you like to go?
        </p>
      </button>

      {/* Start Planning Button */}
      <motion.div
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.9 }}
      >
        <Button 
          className='px-5 py-3 outline-2 outline-black bg-[#232323] text-white lg:hidden'
          children={"Start Planning"}
          onClick={() => setIsOpen(true)}
        />
      </motion.div>

      {/* Input text */}
      <div className='w-full hidden lg:flex justify-center'>
        <p className='text-sm font-medium'>
          Where does your briskwalking trip start and end?
        </p>
      </div>

      {/* Input button - Large screen */}
      <div className='lg:flex justify-center items-center hidden'>
        <motion.div 
          className='flex flex-row items-center gap-3 outline py-3 px-3 rounded-l-lg bg-white'
        >
          <HiOutlineLocationMarker />
          <LocationInput 
            placeholder='Starting point'
            onPlaceSelected={handleFromSelected}
          />
        </motion.div>
        <motion.div 
          className='flex flex-row items-center gap-3 outline py-3 px-3 rounded-r-lg bg-white'
        >
          <HiOutlineLocationMarker />
          <LocationInput 
            placeholder='Final destination'
            onPlaceSelected={handleToSelected}
          />
        </motion.div>
      </div>

      {/* Start Planning Button - Lg screen */}
      <motion.div
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.9 }}
      >
        <Button 
          className='px-5 py-3 outline-2 outline-black bg-[#232323] text-white hidden lg:flex'
          children={"Start Planning"}
          onClick={handleStartPlanningButton}
        />
      </motion.div>

      {/* Floating Slide-Up Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="floating-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideUpVariants}
            className='absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center min-h-[calc(100vh-184px)] gap-7 w-full bg-[#f0f0ff] px-10 z-10 lg:hidden'
          >
            {/* Back button */}
            <Button
              children={<FaArrowLeft />}
              onClick={() => setIsOpen(false)}
              className='absolute top-5 left-5 px-3 py-3 outline-2 outline-black bg-[#232323] text-white'
            />

            {/* Input text */}
            <div className='w-full'>
              <p className='text-sm font-medium'>
                Where does your briskwalking trip start and end?
              </p>
            </div>

            {/* From Input */}
            <div className='w-full flex flex-col gap-4 max-w-[400px]'>
              <motion.div 
                className='flex flex-row items-center gap-3 outline py-4 px-4 rounded-2xl bg-white'
              >
                <HiOutlineLocationMarker />
                <LocationInput 
                  type="text" 
                  placeholder='Starting point'
                  className='outline-none w-full'
                  onPlaceSelected={handleFromSelected}
                />
              </motion.div>

              {/* To Input */}
              <motion.div 
                className='flex flex-row items-center gap-3 outline py-4 px-4 rounded-2xl bg-white'
              >
                <HiOutlineLocationMarker />
                <LocationInput 
                  type="text" 
                  placeholder='Final destination'
                  className='outline-none w-full'
                  onPlaceSelected={handleToSelected}
                />
              </motion.div>
            </div>

            {/* Plan Button */}
            <motion.div
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                className='px-5 py-3 outline-2 outline-black bg-[#232323] text-white'
                children={"Plan"}
                onClick={handleStartPlanningButton}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CreateRouteSection
