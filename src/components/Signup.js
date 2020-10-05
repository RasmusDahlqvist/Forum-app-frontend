import React, { useState } from 'react'
// import signupService from '/src/services/signup'
import axios from 'axios'
import Notification from './Notification'
const baseUrl = 'http://localhost:3001/api/users'

const Signup = () => {
    const  [username, setUsername] = useState('')
    const  [password, setPassword] = useState('')
    const  [information, setInformation] = useState('')


    const signUp = async credentials => {
        const response = await axios.post(baseUrl, credentials)
        console.log(credentials, 'credentials')
        return response.data
    }


    const handleSignup = async (event) => {
        event.preventDefault()
        if(username.length > 0 && password.length > 0 ) 
        {
            try {
                signUp({
                  username, password
                })
               
             } catch(e) {
               console.log('Creating a new user failed', e)
             }
             alert('New user created. Please Log in.')
             setTimeout(()=> {
                 setInformation(null)
             },5000)

        } else {
            alert('Username or password was too short')
        }
        
       
      }

  return(
        
        <form className="signupform" onSubmit={handleSignup}>
        <p id="signintext">Sign up</p>
        <div>
            <p className="formtext">username</p>
        <input 
        type="text"
        value={username}
        name="NewUsername"
        onChange={({ target }) => setUsername(target.value)}
    />
    </div>
    <div>
   
    <p class="formtext">password</p>
    <input 
        type="password"
        value={password}
        name="NewPassword"
        onChange={({ target }) => setPassword(target.value)}
    />
    </div>
    <button className="signupButton" type="submit">SIGN UP</button>
    <Notification information={information}/> 
    </form>


  )}


   export default Signup