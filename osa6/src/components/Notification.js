import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    const { message } = this.props
    return (
      <div style={style}>
        {message}
      </div>
    )
  }
}

Notification.contextTypes = {
  store: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification
