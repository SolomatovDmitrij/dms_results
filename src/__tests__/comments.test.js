import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import Comment from '../comment'

test("comment", () => {
    const comments = ["Астра-мед"," Врачебная практика"," ЖД поликлинника"," Здравица"]
    render( <Comment comments={comments} /> )
    
    expect(screen.getAllByTestId('comment')).toHaveLength(4)
})
