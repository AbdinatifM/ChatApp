import React from 'react'

function HomePage() {
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
                        <div className='h-full w-full bg-black/20 flex'>
                            <div className='flex-1 bg-red-400/10 flex flex-col'>
                                <input className='bg-white rounded-md py-2' type="text" name="" id=""  placeholder='Search for user'/>
                                <div className='flex-1 flex flex-col items-center py-2'>
                                    <button className='bg-[#F2F2F2]/20 text-white py-[6px] px-[5rem] rounded-md'>
                                        <i class="ri-user-fill mr-2"></i>
                                        <span>johndoe</span>
                                    </button>
                                </div>
                            </div>
                            <div className='flex-2 bg-green-400/10 flex items-center justify-center'>
                                <p className='text-white text-center'>Select a user from the list to start a conversation or continue an existing one.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage