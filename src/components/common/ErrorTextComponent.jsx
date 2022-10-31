import React from 'react'

const ErrorTextComponent = (props) => {
    return (
        <span style={{ fontSize: 14, fontWeight: '400', color: 'red' }}>{props.children}</span>
    )
}

export default ErrorTextComponent