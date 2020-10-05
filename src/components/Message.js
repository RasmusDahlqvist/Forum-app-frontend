import React from 'react'
const Message = ({ message, handleUpvote }) => {
    return (
        <div className="messageStyle">
        <p>{message.content} </p>
        <p id="date">{message.date}</p> 
        <p id="like">{message.likes}</p>  
        {Object.values(message).map(user => 
            <p>{user.username}</p>
              )}
       
    </div>
    )
   
    }

export default Message