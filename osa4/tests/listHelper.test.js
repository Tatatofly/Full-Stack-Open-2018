const listHelper = require('../utils/list_helper')
const { initialBlogs, listOfOne } = require('./test_helper')

test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Blogs total likes', () => {
  const emptyList = []

  test('of multiple blogs', () => {
    const result = listHelper.totalLikes(initialBlogs)
    expect(result).toBe(36)
  })

  test('of list of just one blog', () => {
    const result = listHelper.totalLikes(listOfOne)
    expect(result).toBe(7)
  })

  test('of empty list of blogs', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })
})

describe('Blogs of most likes', () => {
  const emptyList = []

  test('of multiple blogs', () => {
    const result = listHelper.favoriteBlog(initialBlogs)
    const expectedBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    expect(result).toEqual(expectedBlog)
  })

  test('of list of just one blog', () => {
    const result = listHelper.favoriteBlog(listOfOne)
    const expectedBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7
    }
    expect(result).toEqual(expectedBlog)
  })

  test('of empty list of blogs', () => {
    const result = listHelper.favoriteBlog(emptyList)
    const expectedBlog = {}
    expect(result).toEqual(expectedBlog)
  })
})

describe('Author of most blogs', () => {
  const emptyList = []

  test('of multiple blogs', () => {
    const result = listHelper.mostBlogs(initialBlogs)
    const expectedBlog = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(result).toEqual(expectedBlog)
  })

  test('of list of just one blog', () => {
    const result = listHelper.mostBlogs(listOfOne)
    const expectedBlog = {
      author: 'Michael Chan',
      blogs: 1
    }
    expect(result).toEqual(expectedBlog)
  })

  test('of empty list of blogs', () => {
    const result = listHelper.mostBlogs(emptyList)
    const expectedBlog = {}
    expect(result).toEqual(expectedBlog)
  })
})

describe('Author of most most likes', () => {
  const emptyList = []

  test('of multiple blogs', () => {
    const result = listHelper.mostLikes(initialBlogs)
    const expectedBlog = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(result).toEqual(expectedBlog)
  })

  test('of list of just one blog', () => {
    const result = listHelper.mostLikes(listOfOne)
    const expectedBlog = {
      author: 'Michael Chan',
      likes: 7
    }
    expect(result).toEqual(expectedBlog)
  })

  test('of empty list of blogs', () => {
    const result = listHelper.mostLikes(emptyList)
    const expectedBlog = {}
    expect(result).toEqual(expectedBlog)
  })
})