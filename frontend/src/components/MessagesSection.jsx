import React, { useEffect, useState } from 'react'
import MessageBox from './MessageBox'
import { api } from '../api/api';

function MessagesSection() {
    const [friendList, setFriendList] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);


    const loadFriendList = async() => {
        try {
            const res = await api.get("/user/list");
            setFriendList(res.data);
        } catch (error) {
            console.log("Load friend list error: ", error);
        }
    }

    useEffect(() => {
        loadFriendList();
    }, [])

    return (
        <div className='flex-1 flex'>
            <div className='flex-1 flex flex-col px-2'>
                <input className='bg-white rounded-md py-2 px-2' type="text" name="" id="" placeholder='Search for user' />
                <div className='flex-1 flex flex-col items-center py-2'>
                    {friendList.map((friend) => (
                        <button className='bg-[#F2F2F2]/20 text-white py-[6px] px-[5rem] rounded-md'
                            onClick={() => setSelectedFriend(friend)}
                        >
                            <i class="ri-user-fill mr-2"></i>
                            <span>{friend.username}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className='flex-2  flex items-center justify-center'>

                {selectedFriend === null ? 
                    <p className='text-white text-center'>Select a user from the list to start a conversation or continue an existing one.</p>
                    : 
                    <MessageBox username={selectedFriend.username}/>
                }
            </div>
        </div>
    )
}

export default MessagesSection