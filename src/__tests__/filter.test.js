import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Filter from '../filter'


test("test filter", () => {
    
    render( <Filter label={'age'} list={{name:'Возраст', data: ['1', '2']}} filters={[false, true]} /> )
    expect(screen.getByText(/Возраст/i)).toBeInTheDocument()

})
