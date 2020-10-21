import React from 'react'

export default function MessageBox(props) {
    return ( 
        <div className={`alert alert-${props.variant || 'info'}`}>
        {/* if props.variant exists, use that. Otherwise use info.
        If error, display red message. If info, display blue message */}
        {props.children}
        {/* children is a special props which shows 
        the message box in the place it has been used */}           
        </div>
    )
}
