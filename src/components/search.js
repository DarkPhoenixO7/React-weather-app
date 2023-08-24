import { useState } from "react"
import { AsyncPaginate } from "react-select-async-paginate"
import { url, geoApiOptions } from "../api"


const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    const response = await fetch(
      `${url}/cities?minPopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions
    );
    const response_1 = await response.json();
    return {
      options: response_1.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}` ,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    
        <AsyncPaginate
          placeholder="Search for city"
          debounceTimeout={600}
          value={search}
          onFocus={() => setSearch('')}
          onChange={handleOnChange}
          loadOptions={loadOptions}
          
        />
     
  );
};

export default Search;