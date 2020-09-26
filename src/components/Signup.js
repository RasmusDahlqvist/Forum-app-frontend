import React, { useState } from 'react'
// import signupService from '/src/services/signup'
import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const Signup = () => {
    const  [username, setUsername] = useState('')
    const  [password, setPassword] = useState('')


    const signUp = async credentials => {
        const response = await axios.post(baseUrl, credentials)
        console.log(credentials, 'credentials')
        return response.data
    }


    const handleSignup = async (event) => {
        event.preventDefault()
        try {
           signUp({
             username, password
           })
          
        } catch(e) {
          console.log('Creating a new user failed', e)
        }
      }

  return(
        <form onSubmit={handleSignup}>
        <div>
        <input 
        type="text"
        value={username}
        name="NewUsername"
        onChange={({ target }) => setUsername(target.value)}
    />
    </div>
    <div>
    <input 
        type="password"
        value={password}
        name="NewPassword"
        onChange={({ target }) => setPassword(target.value)}
    />
    </div>
    <button type="submit">signup</button>
    </form>


  )}


   export default Signup