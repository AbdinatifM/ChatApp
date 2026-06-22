import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import LandingPage from './pages/LandingPage'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/login" element={<LoginPage />} />


        {/* <Route element={Protected/>}>    </Route>*/}
      </Routes>
    </>
  )
}

export default App
