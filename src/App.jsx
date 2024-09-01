import React, {useState} from 'react';
import Map from './Components/Map';
import Search from './Components/Search';
import RoutingControl from './Components/RoutingControl';
import L from "leaflet";
import SearchInfo from './Components/SearchInfo';

export default function App() {
  const [map, setMap] = useState(null);

  const [latSource, setLatSource] = useState(null);
  const [routingControl, setroutingControl] = useState(null);
  const [latDest, setLatDest] = useState(null);
  const [lonSource, setLonSource] = useState(null);
  const [lonDest, setLonDest] = useState(null);

  const [citySource, setcitySource] = useState('');
  const [cityDest, setcityDest] = useState('');
  const [infoRoute, setInfoRoute] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [selectedOptionSource, setSelectedOptionSource] = useState(null);
  const [selectedOptionDest, setSelectedOptionDest] = useState(null);

   
  function updateRoute() {
    if(latSource != null && lonSource != null &&
      latDest != null && lonDest != null) {
      const Waypoints = [
        L.latLng(latSource, lonSource),
        L.latLng(latDest, lonDest)
      ];
      routingControl.getPlan().setWaypoints(Waypoints);
      <RoutingControl Waypoints={Waypoints}/>
      setShowInfo(true);
      setSelectedOptionSource([]);
      setSelectedOptionDest([]);
    }
  }   

  return (
      <div>
        <h1>Routing Application</h1>
        <h3>Enter source and destination. Then press button Search.</h3>
        <div className="search-container">
          <Search setLatitude={setLatSource} 
             setLongitude={setLonSource} 
             setCity={setcitySource}
             selectedOption={selectedOptionSource}
             setSelectedOption={setSelectedOptionSource}
             origin="Source..."/>
        </div>
        <div className="search-container">
          <Search setLatitude={setLatDest}
             setLongitude={setLonDest} 
             setCity={setcityDest} 
             selectedOption={selectedOptionDest}
             setSelectedOption={setSelectedOptionDest}
             origin="Destination..."/>
        </div>
        <button onClick={updateRoute}>Search routes</button>
        <div className="info-container">
          {showInfo ? (citySource && cityDest && infoRoute &&     
            (<SearchInfo citySource={citySource}
            cityDest={cityDest} infoRoute={infoRoute}/>)): (<div/>)}
        </div>
        <div>
          <Map setMap={setMap} setroutingControl={setroutingControl}
               setInfoRoute={setInfoRoute}/>
        </div>
      </div>
  );
}
