import React, { useEffect, useState } from 'react'
import MessageBox from './MessageBox'
import { api } from '../api/api';
import { io } from 'socket.io-client'
import { useRef } from 'react';
function MessagesSection() {
    const [friendList, setFriendList] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [selectedChatId, setSelectedChatId] = useState(null); 
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL.replace("/api", "");
    const filteredFriendList = friendList.filter(item => item.username.toLowerCase().includes(inputText.toLowerCase()));

    const loadFriendList = async() => {
        try {
            const res = await api.get("/user/list");
            console.log("FriendList Data: ", res.data);
            setFriendList(res.data);
        } catch (error) {
            console.log("Load friend list error: ", error);
            setFriendList([]);
        }
    }

    const handleSendMessage = async(e, message, setMessage) => {  
        if (event.key === "Enter" && !event.shiftKey) {
            e.preventDefault();
            if (message.trim() !== '' && selectedChatId) {
                const payload = {
                    chatId: selectedChatId,
                    message: message
                }

                socketRef.current.emit("private message", payload);
                setMessage('');
            }
        }
    }
    const handleJoinChat = async(friend) => {
        setSelectedChatId(friend.chatId);
        setMessages([]);
        setSelectedFriend(friend);
        socketRef.current.emit('join chat', friend.chatId);  
    }

    useEffect(() => {
        loadFriendList();
        socketRef.current = io(BACKEND_URL, {
            withCredentials: true
        });

        socketRef.current.on('chat history', (history) => {
            console.log(history);
            setMessages(history)
        });
        
        socketRef.current.on('private message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [])

    return (
        <div className='flex-1 flex'>
            <div className='flex-1 flex flex-col px-2'>
                <input className='bg-white rounded-md py-2 px-2' type="text" name="" id="" placeholder='Search for user' 
                    value={inputText}
                    onChange={(e) => { 
                        const pattern = "^[A-Z][a-z]{2,7}$"

                        const nextValue = e.target.value
                        if (pattern.test(nextValue)){ 
                            setInputText(nextValue);
                        }
                    }}
                />
                <div className='flex-1 flex flex-col items-center py-2'>
                    {filteredFriendList.map((friend, index) => (
                        <button key={index} className='bg-[#F2F2F2]/20 text-white py-[6px] px-[5rem] rounded-md'
                            onClick={() => handleJoinChat(friend)}
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
                    <MessageBox username={selectedFriend.username} friendId={selectedFriend._id} handleMessage={handleSendMessage} messages={messages}/>
                }
            </div>
        </div>
    )
}

export default MessagesSection