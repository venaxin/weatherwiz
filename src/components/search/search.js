import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";
const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null); //initial state is null

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };
  const handleOnChange = (searchData) => {
    setSearch(searchData); //set the state to the value of the input
    onSearchChange(searchData); //pass the value to the parent component (App.js
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600} //because we dont want to send api req on every key press
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};
export default Search;
