import React from 'react'
import Text from './text'
import MyChart from './charts'
import Comment from './comment'
import './component1.css'

export default function Component1(props) {
    if(!props.data) {
        return (
            <div>Загрузка данных...</div>
        )
    }
    const data = props.data
    const name = props.name
    const labels = props.labels
    const data_chart = labels.map( (elem, i) => [elem, data[i]])
   //данные приходят в формате массива объектов где элемент - это массив из 
    //двух элементов - первый элемент это название столбца, а второй - его значение
    if(!props.data) {
        return <div>загрузка данных...</div>
    }

    const sum = data.reduce( (acc, elem) => acc + elem, 0 )
    return (
        <li role="component1" className="item">
            <span>{name}: </span>
                {labels.map( (elem,i) => (
                    <Text name={name} key={i} label={elem} count={data[i]} percent={(data[i]/sum*100).toFixed(2)} />
                 ))}
            <MyChart name={name} data={data_chart} />
            { props.comments && (
                <section>
                <Comment label="Комментарии" comments={props.comments} /> </section>)}
        </li>
    )
}

