import React from 'react'

const LoginForm = ({ login, handleLoginFieldChange, username, password }) => {
  return (
    <div>
    <h2>Log in to application</h2>

      <form onSubmit={login}>
        <div>
          Username: &nbsp;
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleLoginFieldChange}
          />
        </div>
        <div>
          Password: &nbsp;
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleLoginFieldChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm