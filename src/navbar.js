import React from 'react'
import './navbar.css'
import MenuFilter from './menu-filter'

export default function NavBar(props) {
    console.log('navbar')
    return (
        <div className='navbar' data-testid='navbar'>
            <MenuFilter labels={props.labels} filters={props.filters} change_filters_state={props.change_filters_state} set_filters={props.set_filters} />
        </div>
    )
}
