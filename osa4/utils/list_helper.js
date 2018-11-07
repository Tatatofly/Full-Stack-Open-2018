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

const favoriteBlog  = (blogs) => {
  const likes = blogs.map((blog) => {
    return blog.likes
  })
  if(likes.length > 0){
    const indexOfMostLikes = likes.reduce((best, x, i, like) => x > like[best] ? i : best, 0)
    const theResult = {
      title: blogs[indexOfMostLikes].title,
      author: blogs[indexOfMostLikes].author,
      likes: blogs[indexOfMostLikes].likes
    }
    return theResult
  } else {
    return {}
  }
}

const mostBlogs  = (blogs) => {
  const authors = blogs.map((blog) => {
    return blog.author
  })
  if(authors.length > 0) {
    var freqList = {}
    var mostFreq = authors[0]
    var freqCount = 1
    for(var i = 0; i < authors.length; i++) {
      var x = authors[i]
      if(!freqList[x]) {
        freqList[x] = 1
      } else {
        freqList[x]++
      }

      if(freqCount < freqList[x]) {
        mostFreq = x
        freqCount = freqList[x]
      }
    }
    const theResult = {
      author: mostFreq,
      blogs: freqCount
    }
    return theResult
  } else {
    return {}
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}