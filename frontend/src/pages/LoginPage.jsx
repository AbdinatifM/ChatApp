import React, { useState } from 'react'

function LoginPage() {
    const [formState, setFormState] = useState("LOGIN");

    const switchForm = (e) => {
        e.preventDefault();
        setFormState(formState === "LOGIN" ? "REGISTER" : "LOGIN");
    }
    return (
        <div className='bg-[url(./assets/background.png)] bg-cover h-screen flex flex-col items-center justify-center gap-[22px]'>
            <div className='text-white bg-white/10 backdrop-filter backdrop-blur-lg border border-white/20 shadow-lg rounded-[15px] py-[10px] pl-[30px] w-[400px] flex flex-col items-start justify-center'>
                <p className='text-[20px]'>{formState === "LOGIN" ?  "LOGIN" : "REGISTER"}</p>
            </div>
            <form className='text-white bg-white/10 backdrop-filter backdrop-blur-lg border border-white/20 shadow-lg rounded-[15px] py-[20px] px-[30px] w-[400px] flex flex-col items-stretch justify-center gap-[21px]' action="">
                <div className='flex flex-col gap-[8px]'>
                    <label htmlFor="">USERNAME</label>
                    <input className='bg-white placeholder:text-[#B3B3B3] rounded-[8px] py-[6px] px-[16px] border-1 border-[#D9D9D9]' type="text" name="" id="" placeholder='johndoe'/>
                </div>
                <div className='flex flex-col gap-[8px]'>
                    <label htmlFor="">PASSWORD</label>
                    <input className='bg-white placeholder:text-[#B3B3B3] rounded-[8px] py-[6px] px-[16px] border-1 border-[#D9D9D9]' type="password" name="" id="" placeholder='Enter your password'/>
                </div>
                <div className={`${formState === "LOGIN" ?  "hidden" : ""} flex flex-col gap-[8px]`}>
                    <label htmlFor="">CONFIRM PASSWORD</label>
                    <input className='bg-white placeholder:text-[#B3B3B3] rounded-[8px] py-[6px] px-[16px] border-1 border-[#D9D9D9]' type="password" name="" id="" placeholder='Reenter your password'/>
                </div>
                <div className="text-white bg-[#2C2C2C]/20 backdrop-filter backdrop-blur-lg border border-white/20 shadow-lg rounded-[15px] py-[10px] px-[20px] flex items-center justify-center gap-2 self-center">
                    <i class="ri-arrow-right-line"></i>
                    <button className=''>{formState === "LOGIN" ?  "LOGIN" : "REGISTER"}</button>
                </div>
                <button className='self-start underline underline-offset-5' onClick={switchForm}>{formState === "LOGIN" ?  "Create Account" : "Back to Login"}</button>
            </form>
        </div>
    )
}

export default LoginPage