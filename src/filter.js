import React, {useState} from 'react'
//import { change_filters } from './App'

export default function Filter(props) {
    if(!props.list) {
        return ""
    }
    console.log('props', props)
    
    return (
        <section className="tooltip">
            <h3>{props.list.name}</h3>
        {
            props.filters.map( (elem, i) => (
            <label key={i}>
                <input key={i.toString()+elem} type="checkbox" value={i} checked={ elem } onChange={
                    ({ target: {checked}}) => props.change_filters_state(props.label, i, !elem) }
                />
                {props.list.data[i]}
                <br />
            </label>
        ) )}
        </section>
    )
}
