import React from 'react'

export default function Text(props) {
    return (
        <span  data-testid="text"><b>{ props.label }</b>
        <span> - {props.count} ({props.percent}%); </span> 
        </span>
    )
}
