const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(formatBlog))
})

blogsRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
      response.json(formatBlog(blog))
    } else {
      response.status(404).end()
    }

  } catch (exception) {
    //console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes
    })

    const savedBlog = await blog.save()
    response.json(savedBlog)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went bananas :think:' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
  } catch (exception) {
    //console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const originalBlog = await Blog.findById(request.params.id)


  const blog = {
    title: body.title === undefined ? originalBlog.title : body.title,
    author: body.author === undefined ? originalBlog.author : body.author,
    url: body.url === undefined ? originalBlog.url : body.url,
    likes: body.likes === undefined ? originalBlog.likes : body.likes
  }

  Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(formatBlog(updatedBlog))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

module.exports = blogsRouter