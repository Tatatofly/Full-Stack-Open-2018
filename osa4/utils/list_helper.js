const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => {
    return blog.likes
  })
  const reducer = (sum, like) => {
    return sum + like
  }
  return likes.length === 0 ? 0 : likes.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes
}