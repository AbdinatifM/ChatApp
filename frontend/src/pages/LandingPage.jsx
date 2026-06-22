
import React from 'react'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate("/login");
    }
  return (
    <div className='bg-[url(./assets/background.png)] bg-cover h-screen flex flex-col items-center justify-center gap-[38px] font-poppins'>
        <div className='text-white bg-wihte/10 backdrop-filter backdrop-blur-lg border border-white/20 shadow-lg rounded-[15px] py-[10px] px-[50px] flex flex-col items-center justify-center'>
            <h2 className='text-[36px]'>CHAT APPLICATION</h2>
        </div>
        <div className='text-white bg-wihte/10 backdrop-filter backdrop-blur-lg border border-white/20 shadow-lg rounded-[15px] py-[10px] px-[50px]  flex flex-col items-center justify-center gap-5'>
        <button className='' onClick={goToLogin}>LOGIN</button>
        </div>
    </div>
  )
}

export default LandingPage