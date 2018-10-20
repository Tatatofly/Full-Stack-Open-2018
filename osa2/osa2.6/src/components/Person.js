import React from 'react'
import ReactDOM from 'react-dom'

const Person = ({ person }) => {
  return (
    <li>{person.name}</li>
  )
}

export default Person