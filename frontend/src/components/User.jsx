import React from 'react'

function User({username = "example"}) {
    return (
        <button className='bg-[#F2F2F2]/20 text-white py-[6px] px-[5rem] rounded-md'>
            <i class="ri-user-fill mr-2"></i>
            <span>{username}</span>
        </button>
    )
}

export default User