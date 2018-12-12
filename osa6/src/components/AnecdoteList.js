import React from 'react'
import PropTypes from 'prop-types'
import { anecdoteVoting } from './../reducers/anecdoteReducer'
import { notificationChange } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {

  getAnecdoteById(id) {
    const anecdotes = this.context.store.getState().anecdotes
    const theAnecdote = anecdotes.find(function (a) {
      return a.id === id
    })
    return theAnecdote.content
  }

  voteAnecdote = (id) => () => {
    this.context.store.dispatch(
      anecdoteVoting(id)
    ).anecdotes
    this.context.store.dispatch(
      notificationChange('you voted \'' + this.getAnecdoteById(id)  + '\'')
    ).message
    setTimeout(() => {
      this.context.store.dispatch(
        notificationChange('')
      ).message
    }, 5000)
  }

  render() {
    const anecdotes = this.context.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={ this.voteAnecdote(anecdote.id) }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteList
