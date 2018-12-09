import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('SimpleBlog test', () => {

  const testBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 22
  }

  it('renders content', () => {
    const blogComponent = shallow(
      <SimpleBlog blog={testBlog}/>
    )

    expect(blogComponent.text()).toContain(testBlog.title)
    expect(blogComponent.text()).toContain(testBlog.author)
    expect(blogComponent.text()).toContain(testBlog.likes)
  })
})