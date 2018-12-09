import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }


  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
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
        <button>Like</button><br />
        added by {this.props.blog.user.name ? this.props.blog.user.name : "blank"}
      </div>
    </div>  
    )
  }
}

export default Blog