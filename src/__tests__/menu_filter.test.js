import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import MenuFilter from '../menu-filter'

test("menu filter", ()=> {

    //отрисовываем. меню скрыто
    render( <MenuFilter labels={{age: {name:'Возраст', data: [1,2,3]}}} filters={{age: [true, false, true]}}/> )

    expect(screen.getByTestId('filter')).toHaveClass('hid')

    //нажимаем на меню
    fireEvent.click(screen.getByTestId('logo'))

    //меню должно оборазится на экране
    expect(screen.getByTestId('filter')).not.toHaveClass('hid')
})
