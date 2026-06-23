import React from 'react'
import MessageBox from './MessageBox'

function MessagesSection() {
    

  return (
    <div className='flex-1 flex'>
          <div className='flex-1 flex flex-col px-2'>
              <input className='bg-white rounded-md py-2 px-2' type="text" name="" id="" placeholder='Search for user' />
              <div className='flex-1 flex flex-col items-center py-2'>
                  <button className='bg-[#F2F2F2]/20 text-white py-[6px] px-[5rem] rounded-md'>
                      <i class="ri-user-fill mr-2"></i>
                      <span>johndoe</span>
                  </button>
              </div>
          </div>
          <div className='flex-2  flex items-center justify-center'>
              {/* <p className='text-white text-center'>Select a user from the list to start a conversation or continue an existing one.</p> */}
              <MessageBox />
          </div>
    </div>
  )
}

export default MessagesSection