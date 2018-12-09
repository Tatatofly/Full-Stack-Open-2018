import React from 'react'

const BlogForm = ({ newBlog, newTitle, newAuthor, newUrl, handleBlogFieldChange }) => {
  return (
    <div>
      <h3>Create new</h3>
        <form onSubmit={newBlog}>
          <div>
            Title: &nbsp;
            <input
                  type="text"
                  name="newTitle"
                  value={newTitle}
                  onChange={handleBlogFieldChange}
                /> <br />

            Author: &nbsp;
            <input
                  type="text"
                  name="newAuthor"
                  value={newAuthor}
                  onChange={handleBlogFieldChange}
                /> <br />

            URL: &nbsp;
            <input
                  type="text"
                  name="newUrl"
                  value={newUrl}
                  onChange={handleBlogFieldChange}
                /> <br />
          </div>
          <button type="submit">Create</button>
        </form><br />
    </div>
  )
}

export default BlogForm