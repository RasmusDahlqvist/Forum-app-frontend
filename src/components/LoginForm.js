import React from 'react'

const LoginForm = ({
    handleLogin, username, handleUsernameChange,
    password, handlePassworChange
}) => {
    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                    value={username}
                    onChange={handleUsernameChange}
                    />
                    </div>
                    <div>
                        password
                        <input
                        value={password}
                        onChange={handlePassworChange}
                        />
                </div>
                <button type="submit">login</button>


            </form>
        </div>
    )
}

export default LoginForm 