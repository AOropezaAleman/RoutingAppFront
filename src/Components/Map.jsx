import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import {
  TileLayer,
  MapContainer,
  LayersControl
} from "react-leaflet";

import RoutingControl from './RoutingControl'

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const Map = (props) => {
  const {map, setMap, setroutingControl, setInfoRoute} = props;

  const Waypoints = [
    L.latLng(38.9072, -77.036),
    L.latLng(37.7749, -122.4194)
  ];
  
  return (
    <>
      <MapContainer
        center={[37.0902, -95.7129]}
        zoom={3}
        zoomControl={false}
        style={{ height: "80vh", width: "80%", padding: 0}}
        whenCreated={map => setMap(map) }
      >
        <RoutingControl Waypoints={Waypoints} setroutingControl={setroutingControl}
                        setInfoRoute={setInfoRoute}/>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.base}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </>
  );
};

export default Map;