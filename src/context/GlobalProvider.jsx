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
  const [original, setOriginal] = useState([]);

  useEffect(() => {
    // Delete é sensacional!
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete

    const requisition = async () => {
      const json = await fetch('https://swapi.dev/api/planets')
        .then((response) => response.json());
      const { results } = json;
      const filteredResults = results.filter((item) => delete item.residents);
      setData(filteredResults);
      setOriginal(filteredResults);
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
    const newFilterByNumericValues = [...filterByNumericValues, {
      collum,
      comparison,
      value,
    }];

    setFilterByNumericValues(newFilterByNumericValues);
  }, [filterByNumericValues]);

  const context = useMemo(() => ({
    data,
    setData,
    nameInput,
    handleNameInput,
    itemSelected,
    setItemSelected,
    selectData,
    compare,
    compareSelect,
    numberValue,
    handleNumber,
    listFilter,
    filterByNumericValues,
    setFilterByNumericValues,
    original,
    setOriginal,
  }), [
    data,
    setData,
    nameInput,
    handleNameInput,
    itemSelected,
    setItemSelected,
    selectData,
    compare,
    compareSelect,
    numberValue,
    handleNumber,
    listFilter,
    filterByNumericValues,
    setFilterByNumericValues,
    original,
    setOriginal,
  ]);

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
