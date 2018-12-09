import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div>
      <div class="title">{blog.title}</div><div class="author">{blog.author}</div>
    </div>
    <div>
      blog has <strong class="likes">{blog.likes}</strong> likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog