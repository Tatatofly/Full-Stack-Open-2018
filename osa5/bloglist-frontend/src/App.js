import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
  
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'Username or password is incorrect!',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({ user: null})
  }

  handleLoginFieldChange = (event) => {
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value })
    } else if (event.target.name === 'username') {
      this.setState({ username: event.target.value })
    }
  }

  render() {
    const loginForm = () => (
      <div>
        <h2>Log in to application</h2>
            <form onSubmit={this.login}>
            <div>
              Username: &nbsp;
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginFieldChange}
              />
            </div>
            <div>
              Password: &nbsp;
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleLoginFieldChange}
              />
            </div>
            <button type="submit">kirjaudu</button>
          </form>
      </div>
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>{this.state.user.name} logged in <button onClick={this.handleLogout}>logout</button></p>
      {this.state.blogs.map(blog => 
        <Blog key={blog._id} blog={blog}/>
      )}
    </div>
  )

    return (
      <div>
        {this.state.user === null && loginForm()}
        {this.state.user !== null && blogList()}
      </div>
    );
  }
}

export default App;
