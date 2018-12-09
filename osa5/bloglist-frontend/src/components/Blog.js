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
    const changedBlog = { 
      user: this.props.blog.user._id,
      title: this.props.blog.title,
      author: this.props.blog.author,
      url: this.props.blog.url,
      likes: this.props.blog.likes + 1
    }
    blogService
      .update(this.props.blog._id, changedBlog)
      .then(response => {
        this.props.blog.likes = changedBlog.likes
        this.setState({ refresh: !this.state.refresh})
      })
      .catch(error => {
        console.log("Error: ")
        console.log(error)
      })
  }

  render() {
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      marginLeft: 5,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div style={blogStyle}>
      <strong onClick={this.toggleVisibility}>{this.props.blog.title}</strong> {this.props.blog.author} <br />
      <div style={showWhenVisible}>
        <a href={this.props.blog.url} target="blank">{this.props.blog.url}</a><br />
        {this.props.blog.likes} likes &nbsp; 
        <button onClick={this.addLike}>Like</button><br />
        added by {this.props.blog.user.name ? this.props.blog.user.name : "blank"}
      </div>
    </div>  
    )
  }
}

export default Blog