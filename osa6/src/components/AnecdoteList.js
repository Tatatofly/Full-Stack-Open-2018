import React from 'react'
import PropTypes from 'prop-types'
import { anecdoteVoting } from './../reducers/anecdoteReducer'
import { notificationChange } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {

  getAnecdoteById(id) {
    const { anecdotes } = this.props
    const theAnecdote = anecdotes.find(function (a) {
      return a.id === id
    })
    return theAnecdote
  }

  voteAnecdote = (id) => async () => {
    this.props.anecdoteVoting(id)
    const updatedAnecdote = { ...this.getAnecdoteById(id), votes: this.getAnecdoteById(id).votes + 1 }
    const votedAnecdote = await anecdoteService.vote(id, updatedAnecdote)
    this.props.notificationChange('you voted \'' + votedAnecdote.data.content  + '\'')
    setTimeout(() => {
      this.props.notificationChange('')
    }, 5000)
  }

  filteredAnecdotes () {
    const { anecdotes, filter } = this.props
    return anecdotes.filter(anecdotes => anecdotes.content.toLowerCase().startsWith(filter.toLowerCase()))
  }

  render() {
    const anecdotes = this.filteredAnecdotes ()
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  anecdoteVoting,
  notificationChange
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
