const message = ''

const notificationReducer = (state = message, action) => {
  switch (action.type) {
  case 'MESSAGE':
    return action.content
  default:
    return state
  }
}

export const notificationChange = (content) => {
  return {
    type: 'MESSAGE',
    content
  }
}

export default notificationReducer