import React, {useState} from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';

const Search = (props) => {
    const {setLatitude, setLongitude, origin, setCity, 
           selectedOption, setSelectedOption} = props;

    const loadOptions = (inputValue, callback) => {
        if(inputValue.length > 2) {
           axios.get(`https://nominatim.openstreetmap.org/search??addressdetails=1&format=jsonv2&limit=3&q=${inputValue}`)
            .then(response => {
                // console.log(response);
                const options = response.data.map(item => ({
                label: item.display_name,
                value: [item.lat, item.lon, item.name],
                }));
                callback(options);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                callback([]);
            });
        }    
    };
        
    const handleChange = (option) => {
        setLatitude(option.value[0]);
        setLongitude(option.value[1]);
        setCity(option.value[2]);
        setSelectedOption(option);
    };
    
    return (
        <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        onChange={handleChange}
        value={selectedOption}
        placeholder={origin}
        /> 
    );
  };
  
  export default Search;
