import React from 'react'

export default function Comment(props) {
   // console.log(props.comments)
    if(!props.comments) {
        return ""
    }
    return (
            <ul>
                <h3>{props.label}:</h3>
                {props.comments.map((elem,i) => (<li data-testid='comment' key={i}>{elem}</li>))}
            </ul>
    )
}
