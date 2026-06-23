import React from 'react'

function AddUserSection() {
  return (
      <div className='flex-1 px-5'>
          <label className='text-white block mb-2'>ADD USER FROM USERNAME</label>
          <div className='flex gap-2'>
              <input className='flex-1 bg-white rounded-md py-2 px-2' type="text" name="" id="" placeholder='You can add a user from their username.' />
              <button className='bg-[#F2F2F2]/20 text-white py-[6px] px-[1rem] rounded-md'>
                  <i class="ri-add-line mr-2"></i>
                  <span>ADD</span>
              </button>
          </div>
      </div>
  )
}

export default AddUserSection