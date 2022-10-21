import React from 'react';
import { render, screen } from '@testing-library/react';

import App from '../App'; 
import GlobalProvider from '../context/GlobalProvider';
import userEvent from '@testing-library/user-event';

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

  test('I am your test', () => {
    render(
    <GlobalProvider>
      <App />
    </GlobalProvider>
    );
    
    const inputSelect = screen.getByTestId("column-filter");
    expect(inputSelect).toBeVisible();
  });

  test('I am your test', () => {
    render(
    <GlobalProvider>
      <App />
    </GlobalProvider>
    );
    
    const otherInputselect = screen.getByTestId("comparison-filter");
    expect(otherInputselect).toBeVisible();
  });

  test('I am your test', () => {
    render(
    <GlobalProvider>
      <App />
    </GlobalProvider>
    );
    
    const name = screen.getByRole('columnheader', { name: /name/i });
    expect(name).toBeVisible();
  });

  test('I am your test', () => {
    render(
    <GlobalProvider>
      <App />
    </GlobalProvider>
    );
    
    const inputName = screen.getByTestId("name-filter");
    userEvent.type(inputName, 'Naboo');
    expect(inputName.value).toBe('Naboo');
  });

  test('I am your test', () => {
    render(
    <GlobalProvider>
      <App />
    </GlobalProvider>
    );

    const number = 200000;
    const input = screen.getByTestId("value-filter");
    const button = screen.getByTestId("button-filter");
    
    expect(screen.getByRole('option', { name: 'population' }).selected).toBe(true)

    userEvent.type(input, number);
    userEvent.click(button);

    expect(screen.getByRole('option', { name: 'orbital_period' }).selected).toBe(true)
  });
})
