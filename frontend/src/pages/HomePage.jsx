import React, { useState } from 'react'
import MessagesSection from '../components/MessagesSection';
import AddUserSection from '../components/AddUserSection'

function HomePage() {
    const [toggle, setToggle] = useState(true);

    return (
        <div className='h-screen bg-[url(./assets/background.png)] bg-cover flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-2'>
                <div className='h-[50px] bg-white/10 backdrop-filter backdrop-blur-lg border border-white/20 shadow-lg rounded-[15px] py-[10px] px-[20px] flex flex-col items-center justify-center gap-2 self-start'>
                    <h2 className='font-poppins text-white font-bold'>MESSAGES</h2>
                </div>
                <div className='flex gap-2'>
                    <div className='h-[500px] w-[50px] bg-white/10 backdrop-filter backdrop-blur-lg border border-white/20 shadow-lg rounded-[15px] py-[10px] flex flex-col items-center justify-start gap-2'>
                        <i class="ri-chat-1-fill text-white text-[1.5rem]"></i>
                        <i class="ri-user-add-fill text-white text-[1.5rem]"></i>
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