

import React from 'react'

function LandingPage() {

//     bg-white/10 :Transparent background layer
// backdrop-blur-lg : Applies blur effect behind the element
// border border-white/20 : Adds subtle border for glass edges
// shadow-lg: Gives depth like floating glass.
  return (
    <div className='bg-[lab(20.90334%_.278696_-50.48866)] backdrop-blur- h-screen flex items-center justify-center'>
        <div className='text-white bg-wihte/10 backdrop-filter backdrop-blur-lg border border-white/20 shadow-lg rounded-md w-1/2 py-20 font-alata flex flex-col items-center justify-center gap-5'>
            <h2 className='text-5xl'>CHAT APPLICATION</h2>
            <button className='bg-black/50'>Login</button>
        </div>
    </div>
  )
}

export default LandingPage