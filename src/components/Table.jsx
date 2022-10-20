import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Table() {
  const {
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
    // listFilter,
    // filterByNumericValues,
    // setFilterByNumericValues,
  } = useContext(AppContext);

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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
              .filter((e) => e.name.toLowerCase().includes(nameInput.toLowerCase()))
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
