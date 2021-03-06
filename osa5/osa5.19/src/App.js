import React from 'react';


class App extends React.Component {

  addAnecdote = (event) => {
    event.preventDefault()
    const generateId = () => Number((Math.random() * 1000000).toFixed(0))
    const content = event.target.anecdote.value
    this.props.store.dispatch({
      type: 'NEW',
      data: {
        content: content,
        id: generateId(),
        votes: 0
      }
    })
    event.target.anecdote.value = ''
  }

  addLike = (id) => () => {
    this.props.store.dispatch({
      type: 'LIKE',
      data: { id }
    })
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.addLike(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App