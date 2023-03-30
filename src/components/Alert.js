import React from 'react'

function Alert(props) {
  return (
    <div style={{height: '50px'}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
      <center>👉&nbsp;{props.alert.message}</center>
      </div>}
    </div>
  )
}

export default Alert
