import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Component1 from '../component1'

const labels = ["18-24","25-34","35-44","45-59","60 лет и старше"]
test('component1', () => {

    const test_data = [3,23,28,15,2]
/*
    const data = labels.map( (e, i) => {
        return {
            label: e,
            count: test_data[i],
        }
    } )
 */   
    render( 
        <Component1 name='Возраст' data={test_data} labels={labels} />
    )

    expect(screen.getByRole("component1")).toHaveTextContent("Возраст")
    labels.forEach( elem => {
        expect(screen.getByRole("component1")).toHaveTextContent(elem)
    })
})
test("component1 тест если передать пустую дату", () => {
    render( <Component1 data={null} labels={labels} /> )
    expect(screen.getByText(/загрузка/i)).toBeInTheDocument()
})

