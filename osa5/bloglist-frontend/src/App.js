import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newTitle: '',
      newAuthor: '',
      newUrl: '',
      username: '',
      password: '',
      user: null,
      error: null,
      daijoubu: 1
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
        daijoubu: 0
      })
      setTimeout(() => {
        this.setState({ error: null , daijoubu: 1})
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

  handleBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  newBlog = async (event) => {
    event.preventDefault()
    try{
      await blogService.create({
        title: this.state.newTitle,
        author: this.state.newAuthor,
        url: this.state.newUrl
      })

      this.setState({ newTitle: '', newAuthor: '', newUrl: '', error: `a new blog '${this.state.newTitle}' by ${this.state.newAuthor} added`})
      setTimeout(() => {
        this.setState({error: null, daijoubu: 1})
      }, 3000)
    } catch(exception) {
      this.setState({
        error: 'Something went wrong..',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
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
      <h3>Create new</h3>
      <form onSubmit={this.newBlog}>
        <div>
          Title: &nbsp;
          <input
                type="text"
                name="newTitle"
                value={this.state.newTitle}
                onChange={this.handleBlogFieldChange}
              /> <br />

          Author: &nbsp;
          <input
                type="text"
                name="newAuthor"
                value={this.state.newAuthor}
                onChange={this.handleBlogFieldChange}
              /> <br />

          URL: &nbsp;
          <input
                type="text"
                name="newUrl"
                value={this.state.newUrl}
                onChange={this.handleBlogFieldChange}
              /> <br />
        </div>
        <button type="submit">Create</button>
      </form><br />
      {this.state.blogs.map(blog => 
        <Blog key={blog._id} blog={blog}/>
      )}
    </div>
  )

    return (
      <div>
        <Notification message={this.state.error} status={this.state.daijoubu}/>
        {this.state.user === null && loginForm()}
        {this.state.user !== null && blogList()}
      </div>
    );
  }
}

export default App;
