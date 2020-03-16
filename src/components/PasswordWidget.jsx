import React from 'react'
import XIcon from './XIcon'
import TickIcon from './TickIcon'

function PasswordWidget(props) {

  function hasLowerCase(str) {
    return str.toUpperCase() !== str
  }

  function hasUpperCase(str) {
    return str.toLowerCase() !== str
  }

  function hasSpecialCharacter(str) {
    let special = /[`~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    return special.test(str)
  }

  function hasNumber(str) {
    return /\d/.test(str)
  }

  function hasMinimumCharacters(str) {
    let num = 5
    return str.length >= num
  }

  return (
    <div className={`px-8 flex ${props.display === 'row' ? 'flex-row mt-4' : 'flex-col'}`}>
      <h3 className="font-bold text-sm mb-1 text-gray-700">Password Strength (Contains): </h3>
      <div
        data-testid="lowercase-container"
        className={`flex items-center mb-1 mx-2 ${props.display === 'row' ? 'border px-1 rounded' : ''} ${hasLowerCase(props.password) ? 'border-green-500' : 'border-red-500'}`}>
        {
          hasLowerCase(props.password)
            ? <TickIcon />
            : <XIcon />
        }
        <p className="ml-1">Lower case</p>
      </div>
      <div
        data-testid="uppercase-container"
        className={`flex items-center mb-1 mx-2 ${props.display === 'row' ? 'border px-1 rounded' : ''} ${hasUpperCase(props.password) ? 'border-green-500' : 'border-red-500'}`}>
        {
          hasUpperCase(props.password)
            ? <TickIcon />
            : <XIcon />
        }
        <p className="ml-1">Upper case</p>
      </div>
      <div
        data-testid="special-container"
        className={`flex items-center mb-1 mx-2 ${props.display === 'row' ? 'border px-1 rounded' : ''} ${hasSpecialCharacter(props.password) ? 'border-green-500' : 'border-red-500'}`}>
        {
          hasSpecialCharacter(props.password)
            ? <TickIcon />
            : <XIcon />
        }
        <p className="ml-1">Special character (!@#$%...)</p>
      </div>
      <div
        data-testid="number-container"
        className={`flex items-center mb-1 mx-2 ${props.display === 'row' ? 'border px-1 rounded' : ''} ${hasNumber(props.password) ? 'border-green-500' : 'border-red-500'}`}>
        {
          hasNumber(props.password)
            ? <TickIcon />
            : <XIcon />
        }
        <p className="ml-1">Number</p>
      </div>
      <div
        data-testid="chars-container"
        className={`flex items-center mb-1 mx-2 ${props.display === 'row' ? 'border px-1 rounded' : ''} ${hasMinimumCharacters(props.password) ? 'border-green-500' : 'border-red-500'}`}>
        {
          hasMinimumCharacters(props.password)
            ? <TickIcon />
            : <XIcon />
        }
        <p className="ml-1">5 characters at minimum</p>
      </div>
    </div>
  )

}

export default PasswordWidget