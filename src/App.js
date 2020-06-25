import React, { useEffect, useState } from 'react'
import Comment from './comment'
import Component1 from './component1'
import NavBar from './navbar'
import './App.css'
import {fixData} from './fix-data'

//преобразование полученных данных в нужный вид с группировкой по ключу
export const get_age = (data_array, key, filters) => {
    if(!data_array) { return data_array }

//    console.log('data_array', data_array)
    
    const filter_keys = Object.keys(filters)

    const filter2 = Object.entries(filters).map( ([key, value]) => value.map( (e, i) => ( e ? i : null )).filter(e => e != null)).
        reduce((result, elem, i ) => {
            result[filter_keys[i]]= elem
            return result
        } , {} )

    const filter3 = Object.entries(filter2).filter( ([key, value]) => value.length > 0 )
/*
    console.log('key', key)
    console.log('filter3', filter3)
*/
    const new_obj = data_array.reduce( (result, elem)=>{
        //проверим попадает ли запись в фильтр
        const add = filter3.length == 0 || filter3.some( ([key, value]) => value.includes(elem[key]) ) ? 1 : 0

        if(result[elem[key]]) {
            result[elem[key]] += add
        } else {result[elem[key]] = add}
        return result
    }, {} )
 //   console.log('new_obj', new_obj)
    return Object.values(new_obj)
}

export const get_comments = (data_array, key) => {
    if(!data_array || !Array.isArray(data_array)) { return [] }

    return data_array.map((elem) => (elem[key])).filter(elem => elem)
}
export const change_filters = (filter, name, index, value) => {
    filter[name][index] = value
    return filter
}
export const apply_filter = (data, filter) => {

    return data.filter( elem => Object.entries(filter).some( ([key, value]) => 
       value.map( (e, i) => ( e ? i : null )).filter(e => e != null).includes(elem[key])
    ))
} 


function App() {

    const labels = {
        age:  {name: 'Возраст', data: ["18-24","25-34","35-44","45-59","60 лет и старше"]},
        gender: {name: 'Пол', data: ["Женский", "Мужской"]},
        experience: {name: "Опыт", data: ["до 1 года", "от года до 3 лет", "от 3 до 5 лет", "от 5 до 7 лет",
            "от 7 до 10 лет", "от 10 и более лет"]},
        q_4: {name: "Обращения", data: ["не обращался", "1-3 раза", "4-6 раз", "более 6 раз", "был в стационаре"]},
        q_5: {name: "Удовлетворение", data: ["абсолютно не удовлетворён", "скорее не удовлетворён", "скорее удовлетворен", "полностью удовлетворен"]},
        q_9: {name: "Желание", data: ["Да", "Нет"]}
    }

    const [data, setData] = useState(null)
    const [error, setError] = useState({
        is_error: false, 
        text_error: 'ok'
    })
    //фильтры
    const [filters, set_filters] = useState({
        age: [false, false, false, false, false],
        gender: [false, false],
        experience: [false, false, false, false, false, false],
        q_4: [false, false, false, false, false],
        q_5: [false, false, false, false],
        q_9: [false, false],
    })

    
    const change_filters_state = (name, index, value) => {
        set_filters( {...change_filters(filters, name, index, value) })
//        setData(apply_filter(data, filters))
    }
    
    const fetch_data = () => {
        /*
        fetch("http://192.168.0.208:8008/admin/json")
        .then( res => res.json() )
        .then( res => { 
//            console.log(res)
//            setData(apply_filter(res, filters)) 
            setData(res)
            //start_data = res
        } )
        .catch( err => setError({
            is_error: true, 
            text_error: 'Ошибка при загрузке данных'
        }) )
        */
        setData(fixData)
            
    }

    useEffect( () => {
        fetch_data()
    }, [filters] )


    if(error.is_error) {
        return (<div role="error">{error.text_error}</div>)
    }
    if(!data) {
        return <div>загрузка данных...</div>
    }
    return (
        <div className="App">
        <title>Анкета по исследованию мнения об оказании услуг по полису ДМС</title>
        <NavBar labels={labels} filters={filters} change_filters_state={change_filters_state} set_filters={set_filters} />
        <h2 id='h2'>Всего опрошенных: {data.length}</h2>
        <ol>
            <Component1 name={'Возраст'} data={get_age(data, 'age', filters)} labels={labels.age.data} />
            <Component1 name={'Пол'} data={get_age(data, 'gender', filters)} labels={labels.gender.data} />
            <Component1 name={'Стаж работы в компании'} data={get_age(data, 'experience', filters)} labels={labels.experience.data} />
            <Component1 name={'Получали с июля 2019 года медпомощь по полису ДМС'} data={get_age(data, 'q_4', filters)} labels={labels.q_4.data} />
            <Component1 name={'Удовлетворены полученными медуслугами в рамках ДМС'} data={get_age(data, 'q_5', filters)} labels={labels.q_5.data}
                comments={get_comments(data, "q_5_comment")} />
            <li>
                <Comment label="Основные проблемы при получении услуг в рамках ДМС" 
                    comments={get_comments(data, "q_6_1_comment").concat(get_comments(data, "q_6_2_comment"), get_comments(data, "q_6_3_comment"))} />
            </li>
            <li>
                <Comment label="Медучреждения, в которых получали амбулаторно-поликлиническую помощь" 
                    comments={get_comments(data, "q_7_1_comment").concat(get_comments(data, "q_7_2_comment"), get_comments(data, "q_7_3_comment"))} />
            </li>
            <li>
                <Comment label="Медучреждения, в которых получали стоматологическую помощь" 
                    comments={get_comments(data, "q_8_1_comment").concat(get_comments(data, "q_8_2_comment"), get_comments(data, "q_8_3_comment"))} />
            </li>
            <Component1 name={'Желание продолжать пользоваться услугами ДМС'} data={get_age(data, 'q_9', filters)} labels={labels.q_9.data} />
            <li>
                <Comment label="Какими услугами можно дополнить существующую систему ДМС" 
                    comments={get_comments(data, "q_10_1_comment").concat(get_comments(data, "q_10_2_comment"), get_comments(data, "q_10_3_comment"))} />
            </li>
        </ol>
        </div>
    )
}

export default App;
