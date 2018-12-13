import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !== action.newObject.id)
    const voted = store.find(a => a.id === action.newObject.id)
    return [...old, { ...voted, votes: voted.votes+1 } ]
  }
  if (action.type === 'CREATE') {
    return [...store, action.data ]
  }
  if (action.type === 'INIT') {
    return action.data
  }

  return store
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const anecdoteVoting = (id, newObject) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.vote(id, newObject)
    console.log(`HTTP status: ${votedAnecdote.status}`)
    dispatch({
      type: 'VOTE',
      newObject
    })
  }
}

export default reducer