import React, { useContext, useState } from 'react'
import MessagesSection from '../components/MessagesSection';
import AddUserSection from '../components/AddUserSection'
import { AuthContext } from '../context/authContext';

function HomePage() {
    const [toggle, setToggle] = useState(true);
    const { logout } = useContext(AuthContext);
    return (
        <div className='h-screen bg-[url(./assets/background.png)] bg-cover flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-2'>
                <div className='h-[50px] bg-white/10 backdrop-filter backdrop-blur-lg border border-white/20 shadow-lg rounded-[15px] py-[10px] px-[20px] flex flex-col items-center justify-center gap-2 self-start'>
                    <h2 className='font-poppins text-white font-bold'>{toggle ? "MESSAGE" : "ADD FRIEND"}</h2>
                </div>
                <div className='flex gap-2'>
                    <div className='h-[500px] w-[50px] bg-white/10 backdrop-filter backdrop-blur-lg border border-white/20 shadow-lg rounded-[15px] py-[10px] flex flex-col items-center justify-between gap-2 text-[1.5rem]'>
                        <div className='flex flex-col'>
                            <i class="ri-chat-1-fill text-white"
                                onClick={() => setToggle(true)}
                            ></i>
                            <i class="ri-user-add-fill text-white"
                             onClick={() => setToggle(false)}
                            ></i>
                        </div>
                        <i class="ri-logout-box-r-fill text-red-400"
                            onClick={logout}
                        ></i>
                    </div>
                    <div className='h-[500px] w-[800px] bg-white/10 backdrop-filter backdrop-blur-lg border border-white/20 shadow-lg rounded-[15px] py-[10px] flex flex-col items-center justify-start gap-2'>
                        <div className='h-full w-full  flex'>
                            {toggle ? <MessagesSection /> : <AddUserSection />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage