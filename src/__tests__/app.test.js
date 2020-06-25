import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {get_age, get_comments, change_filters, apply_filter} from '../App'

test("test function get_age", () => {
    const test_data = [{age: 1}, {age:0}, {age:1}]
    expect(get_age(test_data, 'age', {})).toEqual([1,2])
})

test("тест function get_comments", () => {
    const test_data = [{comment: 1}, {comment: 2}, {comment: 3}, {comment: ''}]
    expect(get_comments(test_data, 'comment')).toEqual([1,2,3])
})

test("тест изменения фильтров", () => {
    const filters = ({
        age: [true, true, true, true, true],
        gender: [true, true],
        experience: [true, true, true, true, true, true],
        q4: [true, true, true, true, true],
        q5: [true, true, true, true] 
    })

    expect(change_filters(filters, 'age', 1, false)).toEqual({
        age: [true, false, true, true, true],
        gender: [true, true],
        experience: [true, true, true, true, true, true],
        q4: [true, true, true, true, true],
        q5: [true, true, true, true] 
    })
})

test("применить фильтр к данным", () => {
    const data = [{age: 1, gender:1}, {age:1, gender:2}, {age:2, gender:2}, {age: 3, gender: 3}]
    const filter = { age: [false, true], gender: [false,false,true] }
    expect(apply_filter(data, filter)).toEqual([{age: 1, gender: 1}, {age: 1, gender:2}, {age:2, gender:2}])
    expect(apply_filter(data, {age: [false,false,false,true]})).toEqual([{age: 3, gender: 3}])
})
