import React from 'react'
import PropTypes from 'prop-types'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notificationChange } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.anecdoteCreation(e.target.anecdote.value)
    this.props.notificationChange('you created \'' + e.target.anecdote.value  + '\'')
    setTimeout(() => {
      this.props.notificationChange('')
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  anecdoteCreation,
  notificationChange
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
