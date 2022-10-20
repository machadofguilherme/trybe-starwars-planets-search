import React from 'react';
import { render, screen } from '@testing-library/react';

import App from '../App'; 
import GlobalProvider from '../context/GlobalProvider';

describe('Testes para 30%', () => {
  test('I am your test', () => {
    render(
    <GlobalProvider>
      <App />
    </GlobalProvider>
    );
    
    const inputName = screen.getByTestId("name-filter");
    expect(inputName).toBeVisible();
  });
})
