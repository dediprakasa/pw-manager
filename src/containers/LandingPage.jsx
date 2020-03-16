import React from 'react'
import landingImage from '../assets/landing.svg'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="h-screen bg-green-100">
      <div className="flex mx-auto max-w-6xl h-full items-center px-12 justify-between">
        <div className="">
          <h3
            data-testid="welcome-text"
            className="text-2xl font-bold text-gray-700">Welcome to Password Manager</h3>
          <h2
            data-testid="subtitle-text"
            className="text-lg font-bold text-gray-600 mb-4">Forget your passwords. Let us do the job.</h2>
          <Link
            data-testid="try-now-btn"
            to="/home" 
            className="rounded-md py-3 px-4 text-lg bg-green-500 text-white font-bold hover:bg-green-600">Try It Now</Link>
        </div>
        <div
          data-testid="img-container"
          className="max-w-xl">
          <img src={landingImage} alt="landing"/>
        </div>
      </div>
    </div>
  )
}

export default LandingPage