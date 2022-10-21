import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

function Table() {
  const {
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
  } = useContext(AppContext);

  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [dataCopy, setDataCopy] = useState([]);

  const goFilter = async (collum, comparison, value) => {
    if (comparison === 'igual a') {
      const resultFilter = data.filter((e) => e[collum] === value);
      setDataCopy(data);
      setData(resultFilter);
    } else if (comparison === 'maior que') {
      const resultFilter = data.filter((e) => e[collum] > Number(value));
      setDataCopy(data);
      setData(resultFilter);
    } else if (comparison === 'menor que') {
      const resultFilter = data.filter((e) => e[collum] < Number(value));
      setDataCopy(data);
      setData(resultFilter);
    }

    const xablau = options.filter((e) => e !== collum);
    setOptions(xablau);
    setItemSelected(xablau[0]);
    listFilter(collum, comparison, value);
  };

  const delFilter = (filter) => {
    const newFilter = filterByNumericValues.filter((e) => (e.collum !== filter.collum)
        || (e.comparison !== filter.comparison)
        || (e.value !== filter.value));
    setFilterByNumericValues(newFilter);
    setOptions([filterByNumericValues[0].collum, ...options]);

    if (filterByNumericValues.length === 1) {
      setData(original);
    } else {
      setData(dataCopy);
    }
  };

  const delAllFilters = () => {
    setFilterByNumericValues([]);
    setOptions([...options, ...filterByNumericValues.map((e) => [e.collum])]);

    const req = async () => {
      const json2 = await fetch('https://swapi.dev/api/planets')
        .then((response) => response.json());
      const { results } = json2;
      const filteredResults = results.filter((item) => delete item.residents);
      setData(filteredResults);
    };

    req();
  };

  return (
    <main>
      <form>
        <input
          type="text"
          autoComplete="off"
          value={ nameInput }
          data-testid="name-filter"
          onChange={ handleNameInput }
          placeholder="Pesquise pelo nome"
        />

        <select
          onClick={ selectData }
          data-testid="column-filter"
        >
          {
            options.map((e) => (
              <option key={ e } value={ e }>
                { e }
              </option>
            ))
          }
        </select>

        <select
          onClick={ compareSelect }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          type="text"
          value={ numberValue }
          onChange={ handleNumber }
          data-testid="value-filter"
          placeholder="Digite um valor numérico"
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => goFilter(itemSelected, compare, numberValue) }
        >
          Filtrar
        </button>
      </form>

      {
        filterByNumericValues.map((e, i) => (
          <section type="button" key={ i } data-testid="filter">
            <span data-testid="filter">
              { `${e.collum} ${e.comparison} ${e.value}` }
              <button
                type="button"
                data-testid="filter"
                onClick={ () => delFilter(e) }
              >
                X
              </button>
            </span>
          </section>
        ))
      }

      <button
        type="button"
        onClick={ delAllFilters }
        data-testid="button-remove-filters"
      >
        Remover todas filtragens
      </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            data
              ?.filter((e) => e.name.toLowerCase().includes(nameInput.toLowerCase()))
              .map((item) => (
                <tr key={ item.name }>
                  <td>{ [item.name] }</td>
                  <td>{ [item.rotation_period] }</td>
                  <td>{ [item.orbital_period] }</td>
                  <td>{ [item.diameter] }</td>
                  <td>{ [item.climate] }</td>
                  <td>{ [item.gravity] }</td>
                  <td>{ [item.terrain] }</td>
                  <td>{ [item.surface_water] }</td>
                  <td>{ [item.population] }</td>
                  <td>{ [item.films] }</td>
                  <td>{ [item.created] }</td>
                  <td>{ [item.edited] }</td>
                  <td>{ [item.url] }</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </main>
  );
}

export default Table;
