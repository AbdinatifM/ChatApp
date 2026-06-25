import React, { useEffect, useState } from 'react'
import { api } from '../api/api';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useRef } from 'react';
import toast from 'react-hot-toast';

function LoginPage() {
    const [formState, setFormState] = useState("LOGIN");
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const { login } = useContext(AuthContext);

    const clearForm = () => {
        setUsernameInput("");
        setPasswordInput("");
        setConfirmPasswordInput("");
    }
    const switchForm = (e) => {
        e.preventDefault();
        setFormState(formState === "LOGIN" ? "REGISTER" : "LOGIN");
        clearForm();
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

    // const validatePassword = () => {
    //     console.log("Password: ", passwordInput);
    //     console.log("Confirm Password: ", confirmPasswordInput);
    //     if (formState === "REGISTER") {
    //         if (passwordInput != confirmPasswordInput) {
    //             confirmPasswordRef.current.setCustomValidity("Passwords do not match");
    //         } else {
    //             confirmPasswordRef.current.setCustomValidity("");
    //         }
    //     }
    // }

    const registerRequest = async( username, password ) => {
        try {
            const res = await api.post("/auth/register", {
                username: username,
                password: password
            });

            if (res.status === 201) {
                console.log("you've successfully registered an account.")
                toast.success('You have successfully registered your account!', {
                    duration: 2000, 
                });
                clearForm();
                setFormState("LOGIN");
            }
        } catch (error) {
           toast.error('Registration failed. Please try again.');
        }
    }

    const loginRequest = async( username, password ) => {
        try {
            const res = await api.post("/auth/login", {
                username: username,
                password: password
            })

            toast.success('You have successfully logged your account!', {
                duration: 2000, 
            });
            login(res.data.user, true);
        } catch (error) {
            
        }
    }


    useEffect(() => {
        if (formState === "REGISTER") {
            if (passwordInput !== confirmPasswordInput) {
                confirmPasswordRef.current?.setCustomValidity("Passwords do not match");
            } else {
                confirmPasswordRef.current?.setCustomValidity("");
            }
        }
    }, [passwordInput, confirmPasswordInput, formState]);
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
                        onChange={(e) => setUsernameInput(e.target.value)}
                        value={usernameInput}
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
                        onChange={(e) => {
                            setPasswordInput(e.target.value)
                        }}
                        value={passwordInput}
                        ref={passwordRef}
                        required
                    />
                </div>
                {formState === "REGISTER" && (
                    <div className={`flex flex-col gap-[8px]`}>
                        <label htmlFor="">CONFIRM PASSWORD</label>
                        <input className='bg-white placeholder:text-[#B3B3B3] text-black rounded-[8px] py-[6px] px-[16px] border-1 border-[#D9D9D9]' 
                            type="password" 
                            name="confirmpassword" 
                            id="" 
                            minLength={5}

                            placeholder='Reenter your password'
                            onChange={(e) => {
                                setConfirmPasswordInput(e.target.value)
                            }}
                            value={confirmPasswordInput}
                            ref={confirmPasswordRef}
                            required
                        />
                    </div> 
                )}
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