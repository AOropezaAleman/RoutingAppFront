import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SearchInfo(props) {
  const {citySource, cityDest, infoRoute} = props; 
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRoute(source, dest) {
        const url = `https://oropezaas.pythonanywhere.com/routing?source=${source}&destination=${dest}`;
        
        try {
          setIsLoading(true);
          setRoutes([]);
          const response = await axios.get(url);
          const options = response.data.map(item => ({
            label: item.currier + " Truck/Day: " + item.trucks_day,
            value: item.id,
          }));
          console.log(options);
          setRoutes(options);
        } catch (error) {
            console.log('error happened: ', error.message)
        } finally {
            setIsLoading(false); 
        }
    }
    loadRoute(citySource, cityDest);
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
    <div>
        <div>
           <h3>Last Search Performed</h3>
           <label>Source: {citySource} - </label>
           <label>Destination: {cityDest} </label>
        </div>
        <div>
          <h4>Transport Statistics</h4>
          {routes.map((item) => (
                <div>
                <label>{item.label}</label>
                </div>
          ))}
        </div>
        <h4>Principal Route Statistics</h4>
        <label>{infoRoute}</label>
    </div> 
    )
  }
}
