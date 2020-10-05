import React from 'react'
const Notification = ({information}) => {
if(information === null) {
    return null
}

return(
    <div className="notification">
        {information}
        </div>
)}
export default Notification