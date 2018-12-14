import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import usersService from './services/users'
import loginService from './services/login'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      users: [],
      user: null,
      username: '',
      password: '', 
      title: '',
      author: '',
      url: '',
      notification: null
    }
  }

  componentWillMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    usersService.getAll().then(users =>
      this.setState({ users })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  } 

  notify = (message, type = 'info') => {
    this.setState({
      notification: {
        message, type
      }
    })
    setTimeout(() => {
      this.setState({
        notification: null
      })     
    }, 10000)
  }

  like = (id) => async () => {
    const liked = this.state.blogs.find(b=>b._id===id)
    const updated = { ...liked, likes: liked.likes + 1 }
    await blogService.update(id, updated)
    this.notify(`you liked '${updated.title}' by ${updated.author}`)
    this.setState({
      blogs: this.state.blogs.map(b => b._id === id ? updated : b)
    })
  }

  remove = (id) => async () => {
    const deleted = this.state.blogs.find(b => b._id === id)
    const ok = window.confirm(`remove blog '${deleted.title}' by ${deleted.author}?`)
    if ( ok===false) {
      return
    }

    await blogService.remove(id)
    this.notify(`blog '${deleted.title}' by ${deleted.author} removed`)
    this.setState({
      blogs: this.state.blogs.filter(b=>b._id!==id)
    })
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
    }
    
    const result = await blogService.create(blog) 
    this.notify(`blog '${blog.title}' by ${blog.author} added`)
    this.setState({ 
      title: '', 
      url: '', 
      author: '',
      blogs: this.state.blogs.concat(result)
    })
  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.notify('logged out')
    this.setState({ user: null })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.notify('welcome back!')
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.notify('käyttäjätunnus tai salasana virheellinen', 'error')
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleLoginChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  
  getUser = (id) => {
    const userObject = this.state.users.find(function(user) {
        return user._id === id 
    })
    return userObject
  }

  getBlog = (id) => {
    const blogObject = this.state.blogs.find(function(blog) {
        return blog._id === id 
    })
    return blogObject
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <Notification notification={this.state.notification} />
          <h2>Kirjaudu sovellukseen</h2>
          <form onSubmit={this.login}>
            <div>
              käyttäjätunnus
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginChange}
              />
            </div>
            <div>
              salasana
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleLoginChange}
              />
            </div>
            <button type="submit">kirjaudu</button>
          </form>
        </div>
      )
    }

    const byLikes = (b1, b2) => b2.likes - b1.likes

    const blogsInOrder = this.state.blogs.sort(byLikes)

    const Home = () => (
      <div>
      <h2>blogs</h2>
        {blogsInOrder.map(blog => 
          <Blog 
            key={blog._id} 
            blog={blog} 
            like={this.like(blog._id)}
            remove={this.remove(blog._id)}
            deletable={blog.user === undefined || blog.user.username === this.state.user.username}
          />
        )}
    </div>
    )

    const Users = () => (
      <div> 
        <h2>Users</h2> 
        <ul>
          <h4>Name - blogs added</h4>
        {this.state.users.map(user => 
          <li key={user._id}>
          <Link to={`/users/${user._id}`}>{user.name}</Link> - {user.blogs.length}
          </li> 
        )}
        </ul>
      </div>
    )

    const SingleUser = (user) => {
      if(user.user){
        return(
          <div>
            <h2>{user.user.name}</h2>
            <h3>Added blogs</h3>
            <ul>
              {user.user.blogs.map(blog => 
                <li key={blog._id}>{blog.title} by {blog.author}</li> 
              )}
            </ul>
          </div>
          )
      } else {
        return(
          <div>
            Loading ...
          </div>
          )
        }
    }

    const SingleBlog = (blog) => {
      console.log(blog)
      if(blog.blog){
        return(
          <div>
            <h2>{blog.blog.title}</h2>
            <p>
              <a href={blog.blog.url} target="blank">{blog.blog.url}</a><br />
              {blog.blog.likes} likes <button onClick={this.like(blog.blog._id)}>like</button><br />
              added by {blog.blog.user.name}
            </p>
          </div>
          )
      } else {
        return(
          <div>
            Loading ...
          </div>
          )
        }
    }

    return (
      <div>
        <Notification notification={this.state.notification} />

        {this.state.user.name} logged in <button onClick={this.logout}>logout</button>

        <Togglable buttonLabel='uusi blogi'>
          <BlogForm 
            handleChange={this.handleLoginChange}
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
            handleSubmit={this.addBlog}
          />
        </Togglable>
        <Router>
          <div>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/users" render={() => <Users />} />
            <Route path="/users/:id" render={({match}) =>
              <SingleUser user={this.getUser(match.params.id)}/>}
            />
            <Route exact path="/blogs/:id" render={({match}) =>
              <SingleBlog blog={this.getBlog(match.params.id)}/>}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;