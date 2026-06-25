import React, { useState } from 'react'
import { api } from '../api/api';
import toast from 'react-hot-toast';

function AddUserSection() {
    const [inputText, setInputText] = useState('');

    const addFriend = async() => {
        console.log("inputText: ", inputText);
        if (inputText.length < 3) return;
        const friendName = inputText;

        try {
            const res = await api.post("/user/add",  {
                friendUsername: friendName,
            })

            if (res.status === 200) {
                toast.success("You've successfully added: " + friendName + " as a friend." );
            }
        } catch (error) {
              toast.error("You are unable to add " + friendName + " as a friend." );
        }
    }
    return (
        <div className='flex-1 px-5'>
            <label className='text-white block mb-2'>ADD USER FROM USERNAME</label>
            <div className='flex gap-2'>
                <input className='flex-1 bg-white rounded-md py-2 px-2' 
                    type="text" 
                    name="" 
                    id=""
                    placeholder='You can add a user from their username.' 
                    pattern="^[A-Z][a-z]{2,7}$"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <button className='bg-[#F2F2F2]/20 text-white py-[6px] px-[1rem] rounded-md'
                    onClick={addFriend}
                >
                    <i class="ri-add-line mr-2"></i>
                    <span>ADD</span>
                </button>
            </div>
        </div>
    )
}

export default AddUserSection