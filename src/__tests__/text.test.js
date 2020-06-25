import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'

import Text from '../text'

test("тест текста", () => {
    render( <Text label="10-15" count="1" percent="0.33" /> )
    expect(screen.getByTestId('text')).toContainHTML('<b>10-15</b>')
    expect(screen.getByTestId('text')).toHaveTextContent('10-15 - 1 (0.33%);')
})
