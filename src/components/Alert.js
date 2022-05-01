import React from 'react'

const Alert = (props) => {
  return (
    <div style={{height:'10px'}}>
{props.alert && <div className={`alert alert-${props.alert.typ} alert-dismissible fade show role="alert"`}>
    <p>{props.alert.typ} : <strong>{props.alert.msg}</strong></p>
 </div>}

    </div>
  )
}

export default Alert