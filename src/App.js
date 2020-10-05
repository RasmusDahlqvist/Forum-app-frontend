import React, {useState, useEffect } from 'react'
import Message from './components/Message'
import messageService from './services/messages'
//import LoginForm from './components/LoginForm'
import loginService from './services/login'
import signupService from './services/signup'
import Signup from './components/Signup'
import Notication from './components/Notification'
import './App.css'
import axios from 'axios'





const App = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [information, setInformation] = useState('')
 

  useEffect(() => {
    messageService
      .getAll().then(initialMessages => {
      setMessages( initialMessages )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedMessageappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      messageService.setToken(user.token)
    }
  }, [])

  const logout = () => {

    // tä toimiii. Pitää vaa suunitella käyttöliitymää. 
    window.localStorage.removeItem('loggedMessageappUser')
    setUser(null)
    console.log('<3')
  }

  const logoutButton = () => {
    return(
      <button className="logoutButton" onClick={logout}>LOG OUT</button>
    )
  }

  const loginForm = () => {
      return(
    <form className="loginform" onSubmit={handleLogin}>
      <p id="logintext" >Log in</p>
                <div>
                    <p className="formtext">username</p>
                    <input
                    className="input"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)} 
                    />
                    </div>
                    <div>
                    <p className="formtext">password</p>
                        <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                        />
                </div>
                <button className="loginButton" type="submit">LOG IN</button>


            </form>


      )} 
      
   


      const messageForm = () => {
        return(
          <form className="messageform" onSubmit={addMessage}>
          <textarea rows="8" cols="50" placeholder="Type a new message.."
          value={newMessage}
          onChange={handleMessageChange}
          />
          <button className="postButton" type="submit">CREATE POST</button>
        </form>
        )
      }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin in with', username, password)
    if(username.length > 0 && password.length > 0) 
    {
      try {
        const user = await loginService.login({
          username, password,
        })
  
        window.localStorage.setItem(
          'loggedMessageappUser', JSON.stringify(user)
        )
        messageService.setToken(user.token)
        setUser(user)
        setUsername(username)
        setPassword(password)
  
      } catch(e) {
        alert('Wrong username or password')
        console.log('wrong credentials')
      }

    } else { alert('Username or password was empty')}
   
   
  }

  const addMessage = (event) => {
    event.preventDefault()
    console.log('called add message')
    const messageObject = {
      content: newMessage,
      date: new Date().toISOString(),
      likes: 0,
      id: messages.length +1,

    }
    messageService
    .create(messageObject)
    .then(returnedMessage => {
      setMessages(messages.concat(returnedMessage))
      setNewMessage('')
    })
  }

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value)
  }

 

  return (
    <div>
      <h1>APPNAME</h1>
    
        

  {user == null ? <div> {loginForm()} <Signup/> </div> : 
        <div>
          <p id="user" >Hello, {user.username}</p>
          {messageForm()}
          {logoutButton()}
          </div>
          }
      
       
        {messages.map(message =>
        
          <Message
            
            key={message.id}
            message={message}
           
            
            
          />
        )}
    
   
      
    </div>
    
  )
}

export default App