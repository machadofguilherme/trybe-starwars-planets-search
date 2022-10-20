import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import AppContext from './AppContext';

function GlobalProvider({ children }) {
  const [data, setData] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [itemSelected, setItemSelected] = useState('population');
  const [compare, setCompare] = useState('maior que');
  const [numberValue, setNumberValue] = useState(0);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

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

  const selectData = useMemo(() => ({ target }) => {
    const selected = target.value;
    setItemSelected(selected);
  }, []);

  const compareSelect = useMemo(() => ({ target }) => {
    const selected = target.value;
    setCompare(selected);
  }, []);

  const handleNumber = useMemo(() => ({ target }) => {
    const number = target.value;
    setNumberValue(number);
  }, []);

  const listFilter = useMemo(() => (collum, comparison, value) => {
    setFilterByNumericValues([...filterByNumericValues, {
      collum,
      comparison,
      value,
    }]);
  }, [filterByNumericValues]);

  const context = useMemo(() => ({
    data,
    setData,
    nameInput,
    handleNameInput,
    itemSelected,
    selectData,
    compare,
    compareSelect,
    numberValue,
    handleNumber,
    listFilter,
    filterByNumericValues,
    setFilterByNumericValues,
  }), [
    data,
    setData,
    nameInput,
    handleNameInput,
    itemSelected,
    selectData,
    compare,
    compareSelect,
    numberValue,
    handleNumber,
    listFilter,
    filterByNumericValues,
    setFilterByNumericValues,
  ]);

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
