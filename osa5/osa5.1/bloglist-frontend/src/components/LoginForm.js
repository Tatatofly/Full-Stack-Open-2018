import React from 'react'
import PropTypes from 'prop-types'

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

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  handleLoginFieldChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm