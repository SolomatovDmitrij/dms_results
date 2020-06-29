import React, {useState} from 'react'
import Filter from './filter'
import './menu-filter.css'

export default function MenuFilter(props) {
    const [hidden_filter, set_hidden_filter] = useState(true)
    const [hover, set_hover] = useState(false)
//    console.log('menu-filter', props)
    return (
    <div role="menu-filter" id="logo" onMouseOver={()=> set_hover(true)} onMouseLeave={()=> set_hover(false)}>
            <img className={hover ? 'finger move-right' : 'finger'} id="finger" src="/dms/img/finger.png" alt="" />
            <svg viewBox="0 0 400 400" width="50" height="50" onClick={()=> set_hidden_filter(!hidden_filter)} data-testid='logo'>
                <path xmlns="http://www.w3.org/2000/svg" d="M400.858,11.427c-3.241-7.421-8.85-11.132-16.854-11.136H18.564c-7.993,0-13.61,3.715-16.846,11.136   c-3.234,7.801-1.903,14.467,3.999,19.985l140.757,140.753v138.755c0,4.955,1.809,9.232,5.424,12.854l73.085,73.083   c3.429,3.614,7.71,5.428,12.851,5.428c2.282,0,4.66-0.479,7.135-1.43c7.426-3.238,11.14-8.851,11.14-16.845V172.166L396.861,31.413   C402.765,25.895,404.093,19.231,400.858,11.427z"/>
            </svg>
            <h1 id="main_header">Результат опроса по полисам ДМС</h1>
        <div className={hidden_filter ? 'filter hid' : 'filter'} data-testid="filter" id="filters">
        { Object.entries(props.filters).map( (elem, i) => (
            <Filter label={elem[0]} key={i} list={props.labels[elem[0]]} filters={elem[1]} change_filters_state={props.change_filters_state} />
        ) ) }
        </div>
    </div>
    )
}
