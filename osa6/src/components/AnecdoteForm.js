import React from 'react'
import PropTypes from 'prop-types'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notificationChange } from './../reducers/notificationReducer'

class AnecdoteForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.context.store.dispatch(
      anecdoteCreation(e.target.anecdote.value)
    ).anecdotes
    this.context.store.dispatch(
      notificationChange('you created \'' + e.target.anecdote.value  + '\'')
    ).message
    setTimeout(() => {
      this.context.store.dispatch(
        notificationChange('')
      ).message
    }, 5000)
    e.target.anecdote.value = ''
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

AnecdoteForm.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteForm
