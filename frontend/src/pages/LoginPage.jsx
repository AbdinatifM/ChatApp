import React, { useState } from 'react'
import { api } from '../api/api';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useRef } from 'react';

function LoginPage() {
    const [formState, setFormState] = useState("LOGIN");
    const confirmPasswordRef = useRef(null);
    const passwordRef = useRef(null);
    const { login } = useContext(AuthContext);


    const switchForm = (e) => {
        e.preventDefault();
        setFormState(formState === "LOGIN" ? "REGISTER" : "LOGIN");
    }

    const submitForm = async (e) => {
        e.preventDefault(); 
        const formData = new FormData(e.target);

        const username = formData.get("username");
        const password = formData.get("password");


        try {
            if (formState === "LOGIN") {
               await loginRequest(username, password);
            } else {
               await registerRequest(username, password);
            }

        } catch (error) {
            
        }
       
    }

    const validatePassword = () => {
        if (formState === "REGISTER") {
            if (passwordRef.current.value != confirmPasswordRef.current.value) {
                confirmPasswordRef.current.setCustomValidity("Passwords do not match");
            } else {
                confirmPasswordRef.current.setCustomValidity("");
            }
        }
    }

    const registerRequest = async( username, password ) => {
        try {
            const res = await api.post("/auth/register", {
                username: username,
                password: password
            });

            if (res.status === 200) {
                console.log("you've successfully registered an account.")
            }
        } catch (error) {
            
        }
    }

    const loginRequest = async( username, password ) => {
        try {
            const res = await api.post("/auth/login", {
                username: username,
                password: password
            })

            login(res.data.user, true);
        } catch (error) {
            
        }
    }

    return (
        <div className='bg-[url(./assets/background.png)] bg-cover h-screen flex flex-col items-center justify-center gap-[22px]'>
            <div className='text-white bg-white/10 backdrop-filter backdrop-blur-lg border border-white/20 shadow-lg rounded-[15px] py-[10px] pl-[30px] w-[400px] flex flex-col items-start justify-center'>
                <p className='text-[20px]'>{formState === "LOGIN" ?  "LOGIN" : "REGISTER"}</p>
            </div>
            <form  className='text-white bg-white/10 backdrop-filter backdrop-blur-lg border border-white/20 shadow-lg rounded-[15px] py-[20px] px-[30px] w-[400px] flex flex-col items-stretch justify-center gap-[21px]' 
                action=""
                onSubmit={submitForm}
            >
                <div className='flex flex-col gap-[8px]'>
                    <label htmlFor="">USERNAME</label>
                    <input className='bg-white placeholder:text-[#B3B3B3] text-black rounded-[8px] py-[6px] px-[16px] border-1 border-[#D9D9D9]' 
                        type="text" 
                        name="username" 
                        id="" 
                        placeholder='johndoe'
                        pattern="^[A-Z][a-z]{2,7}$"
                        title="Please use at least 3 letters to 8 letters, no spaces, Capitalize the first letter, no other special characters."
                        required 
                    />
                </div>
                <div className='flex flex-col gap-[8px]'>
                    <label htmlFor="">PASSWORD</label>
                    <input className='bg-white placeholder:text-[#B3B3B3] rounded-[8px]  text-black py-[6px] px-[16px] border-1 border-[#D9D9D9]' 
                        type="password" 
                        name="password" 
                        id=""
                        minLength={5}
                        placeholder='Enter your password'
                        onInput={validatePassword}
                        ref={passwordRef}
                        required
                    />
                </div>
                <div className={`${formState === "LOGIN" ?  "hidden" : ""} flex flex-col gap-[8px]`}>
                    <label htmlFor="">CONFIRM PASSWORD</label>
                    <input className='bg-white placeholder:text-[#B3B3B3] text-black rounded-[8px] py-[6px] px-[16px] border-1 border-[#D9D9D9]' 
                        type="password" 
                        name="confirmpassword" 
                        id="" 
                        minLength={5}
                        placeholder='Reenter your password'
                        onInput={validatePassword}
                        ref={confirmPasswordRef}
                        required
                    />
                </div>
                <div className="text-white bg-[#2C2C2C]/20 backdrop-filter backdrop-blur-lg border border-white/20 shadow-lg rounded-[15px] py-[10px] px-[20px] flex items-center justify-center gap-2 self-center">
                    <i className="ri-arrow-right-line"></i>
                    <button className='' type='submit' >{formState === "LOGIN" ?  "LOGIN" : "REGISTER"}</button>
                </div>
                <button className='self-start underline underline-offset-5' onClick={switchForm}>{formState === "LOGIN" ?  "Create Account" : "Back to Login"}</button>
            </form>
        </div>
    )
}

export default LoginPage