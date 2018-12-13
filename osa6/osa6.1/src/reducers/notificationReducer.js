const message = ''

const notificationReducer = (state = message, action) => {
  switch (action.type) {
  case 'MESSAGE':
    return action.data
  default:
    return state
  }
}

export const notificationChange = (content, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'MESSAGE',
      data: content
    })
    setTimeout(() => {
      dispatch({
        type: 'MESSAGE',
        data: ''
      })
    }, time*1000)
  }
}

export default notificationReducer