import React, { useState } from 'react'
import Message from './Message'
import { useRef } from 'react';
import { useEffect } from 'react';

function MessageBox({messages, username = "johndoe", friendId,  handleMessage}) {
    const [text, setText] = useState('');
    const chatContainer = useRef(null);

    useEffect(() => {
        if (chatContainer.current) {
            chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
        }
    }, [messages])

    return (
        <div className='flex-1 h-full'>
            <div className='flex-1 flex items-center h-[10%] gap-2 px-2'>
                <i class="ri-account-circle-2-fill text-white text-4xl"></i>
                <p className='text-white'>{username}</p>
            </div>
            <div className='flex-8 h-[80%] flex flex-col px-2 py-2 gap-4 overflow-y-auto chat-container'
                ref={chatContainer}
            >
                {messages?.map((message) => (
                    console.log(friendId, message),
                    <Message isFlipped={friendId === message.sender ? false : true}  message={message.content} timestamp={new Date(message.createdAt).toLocaleString()} />
                ))}
            </div>
            <div className='flex-1 flex items-center h-[10%]'>
                <div className='flex flex-1 bg-black/20  rounded-md p-2 text-white items-center'>
                    <textarea className='flex-1 text-white break-all resize-none focus:outline-none text-center max-h-7' type="text" name="" id="" placeholder='Type a message.' 
                        onChange={(e) => setText(e.target.value.substring(0, 200))}
                        value={text}
                        onKeyDown={
                            (e) => handleMessage(e, text, setText)
                        }
                    />
                    <i class="ri-arrow-right-s-line"></i>
                </div>
            </div>
        </div>
    )
}

export default MessageBox