import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import NavBar from '../navbar'

test("тест навигационной кнопки", () => {
    render( <NavBar filters={{}} labels={{}} /> )
    expect(screen.getByTestId('navbar')).toHaveTextContent('ДМС')

})
