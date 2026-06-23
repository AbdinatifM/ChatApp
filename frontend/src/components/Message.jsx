import React from 'react'

function Message({ isFlipped = false, message = "example", timestamp = "00:00:00" }) {
  return (
    <div className={`relative bg-blue-400 text-white rounded-lg flex flex-col p-2 ${ isFlipped ? "self-end" : "self-start"}`}>
        <p className='break-all'>{message}</p>
        <p className={`${isFlipped ? 'text-start' : 'text-end'}`}>{timestamp}</p>
        <div className={`absolute h-5 w-5  bottom-[-10px] ${isFlipped ? "right-3" : "left-3"
            }  rotate-45 bg-blue-400`}></div>
    </div>
  )
}

export default Message