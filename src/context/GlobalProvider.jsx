import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import AppContext from './AppContext';

function GlobalProvider({ children }) {
  const [data, setData] = useState([]);
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    // Delete é sensacional!
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete

    const requisition = async () => {
      const json = await fetch('https://swapi.dev/api/planets')
        .then((response) => response.json());
      const { results } = json;
      const filteredResults = results.filter((item) => delete item.residents);
      setData(filteredResults);
    };

    requisition();
  }, []);

  const handleNameInput = useMemo(() => ({ target }) => {
    setNameInput(target.value);
  }, []);

  const context = useMemo(() => ({
    data,
    nameInput,
    handleNameInput,
  }), [data, nameInput, handleNameInput]);

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.string.isRequired,
};

export default GlobalProvider;
