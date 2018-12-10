import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      refresh: true
    }
  }


  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  addLike = async () => {
    let changedBlog
    if(this.props.blog.user){
      changedBlog = { 
        user: this.props.blog.user._id,
        title: this.props.blog.title,
        author: this.props.blog.author,
        url: this.props.blog.url,
        likes: this.props.blog.likes + 1
      }
    } else {
      changedBlog = { 
        title: this.props.blog.title,
        author: this.props.blog.author,
        url: this.props.blog.url,
        likes: this.props.blog.likes + 1
      }
    }
    blogService
      .update(this.props.blog._id, changedBlog)
      .then(response => {
        this.props.blog.likes = changedBlog.likes
        this.setState({ refresh: !this.state.refresh})
      })
      .catch(error => {
        console.log(error)
      })
  }

  deleteBlog = async () => {
      if (window.confirm(`Do you really want to delete blog: ${this.props.blog.title}?`)) {
      blogService
        .deleteBlog(this.props.blog._id)
        .then(response => {
          this.setState({ refresh: !this.state.refresh})
        })
        .catch(error => {
          console.log(error)
        })
      }
  }

  render() {
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    let username = "anonymous"

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      marginLeft: 5,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    if(this.props.blog.user){
      username = this.props.blog.user.name
    }

    const deleteButton = () => {
      return (
        <button onClick={this.deleteBlog}>Delete</button>
      )
    }

    return (
      <div style={blogStyle}>
      <strong onClick={this.toggleVisibility}>{this.props.blog.title}</strong> {this.props.blog.author} <br />
      <div style={showWhenVisible}>
        <a href={this.props.blog.url} target="blank">{this.props.blog.url}</a><br />
        {this.props.blog.likes} likes &nbsp; 
        <button onClick={this.addLike}>Like</button><br />
        added by {username}<br />
        {!this.props.blog.user || this.props.blog.user._id === this.props.user.id && deleteButton()}
        {!this.props.blog.user && deleteButton()}
      </div>
    </div>  
    )
  }
}

export default Blog