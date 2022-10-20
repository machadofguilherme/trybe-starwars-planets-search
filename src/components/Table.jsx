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
    // filterByNumericValues,
    // setFilterByNumericValues,
  } = useContext(AppContext);

  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const goFilter = async (collum, comparison, value) => {
    if (comparison === 'igual a') {
      const resultFilter = data.filter((e) => e[collum] === value);
      setData(resultFilter);
    } else if (comparison === 'maior que') {
      const resultFilter = data.filter((e) => e[collum] > Number(value));
      setData(resultFilter);
    } else if (comparison === 'menor que') {
      const resultFilter = data.filter((e) => e[collum] < Number(value));
      setData(resultFilter);
    }

    const xablau = options.filter((e) => e !== collum);
    setOptions(xablau);
    setItemSelected(xablau[0]);
    listFilter(collum, comparison, value);
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
