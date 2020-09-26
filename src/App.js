import React, {useState, useEffect } from 'react'
import Message from './components/Message'
import messageService from './services/messages'
//import LoginForm from './components/LoginForm'
import loginService from './services/login'
import signupService from './services/signup'

import Signup from './components/Signup'





const App = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  

  useEffect(() => {
    messageService
      .getAll().then(initialMessages => {
      setMessages( initialMessages )
      console.log('lol', initialMessages)
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
    
    console.log('<3')
  }

  const logoutButton = () => {
    return(
      <button onClick={logout}>logout</button>
    )
  }

  const loginForm = () => {
      return(
    <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)} 
                    />
                    </div>
                    <div>
                        password
                        <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                        />
                </div>
                <button type="submit">login</button>


            </form>


      )} 
      
   


      const messageForm = () => {
        return(
          <form onSubmit={addMessage}>
          <input
          value={newMessage}
          onChange={handleMessageChange}
          />
          <button type="submit">save</button>
        </form>
        )
      }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin in with', username, password)
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
      console.log('wrong credentials')
    }
  }

  

 

  const addMessage = (event) => {
    event.preventDefault()
    console.log('called add message')
    const messageObject = {
      content: newMessage,
      date: new Date().toISOString(),
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
      <h2>forum</h2>
      
        {logoutButton()}

        {user == null ? loginForm() : 
        <div>
          <p>{user.username}</p>
          {messageForm()}
          </div>
          }

        <Signup/>
          <ul>
            {messages.map(message => 
          <li key={message.id}>
           <p>{message.content}</p> 
            <p>{message.author}</p>
          </li>
        )}
      </ul>
      
    </div>
  )
}

export default App