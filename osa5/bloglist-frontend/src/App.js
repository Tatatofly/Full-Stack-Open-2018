import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

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
    const loginForm = () => {
      return (
        <div>
          <Togglable buttonLabel="Log in">
            <LoginForm
              username={this.state.username}
              password={this.state.password}
              handleLoginFieldChange={this.handleLoginFieldChange}
              login={this.login}
              /><br />
            </Togglable>
        </div>
      )
    }

  const sortedBlogs = this.state.blogs.sort(function (x, y) {
      return y.likes - x.likes
    })

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>{this.state.user.name} logged in <button onClick={this.handleLogout}>logout</button></p>
        <BlogForm
                newBlog={this.newBlog}
                newTitle={this.state.newTitle}
                newAuthor={this.state.newAuthor}
                newUrl={this.state.newUrl}
                handleBlogFieldChange={this.handleBlogFieldChange}
                /><br />
      {sortedBlogs.map(blog => 
        <Blog key={blog._id} blog={blog} user={this.state.user}/>
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
