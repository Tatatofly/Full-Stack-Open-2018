import React from 'react'

const Notification = ({ message, status }) => {
    if (message === null) {
      return null
    }
    let clasuNamae
    if (status === 1) {
      clasuNamae = "daijoubu"
    } else {
      clasuNamae = "notdaijoubu"
    }
    return (
      <div className={clasuNamae}>
        {message}
      </div>
    )
  }

export default Notification