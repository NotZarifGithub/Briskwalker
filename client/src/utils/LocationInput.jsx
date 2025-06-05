import React, { useRef, useEffect, useState } from 'react'

// Add autocomple for inputs
const LocationInput = ({ placeholder, onPlaceSelected, defaultValue }) => {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState(defaultValue || '');

   useEffect(() => {
    if (!window.google) return;

    const autocomple = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['geocode']
    })

    autocomple.addListener('place_changed', () => {
      const place = autocomple.getPlace()
      if (place) {
        onPlaceSelected(place);
        setInputValue(place.name || place.formatted_address || '');
      }
    })
  }, [onPlaceSelected]);

  useEffect(() => {
    setInputValue(defaultValue || '');
  }, [defaultValue]);

  const handleFocus = () => {
    setInputValue('');
  }

  const handleBlur = () => {
    if (inputValue.trim() === '') {
      setInputValue(defaultValue || '');
    }
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  return (
    <input 
      ref={inputRef}
      type='text'
      placeholder={placeholder}
      value={inputValue}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      className='outline-none w-full text-sm leading-none'
    />
  )
}

export default LocationInput;