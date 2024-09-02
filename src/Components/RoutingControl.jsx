import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

const createRoutineMachineLayer = (props) => {
  const { Waypoints, setroutingControl, setInfoRoute } = props;

  const instance = L.Routing.control({
    position: 'topleft',
    waypoints: Waypoints,
    router: new L.Routing.osrmv1({
      serviceUrl: 'https://router.project-osrm.org/route/v1',
      language: 'en',
      profile: 'car',
      alternatives: true,
      steps: false,
      annotations: true
    }),
    lineOptions: {
      styles: [
        {
          color: '#757de8', weight: 4 
        },
      ],
    },
    altLineOptions: {
      styles: [
          {color: 'black', opacity: 0.15, weight: 9},
          {color: 'white', opacity: 0.8, weight: 6},
          {color: 'blue', opacity: 0.5, weight: 2}
      ]
    },
    alternatives: 5,
    routeWhileDragging: true,
    show: false,
    addWaypoints: false,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: true,
    autoRoute: true,
    geocoder: L.Control.Geocoder.nominatim({})
  });

  instance.on('routesfound', function(e) {
    var routes = e.routes;
    var summary = routes[0].summary;
    var infoRoute = 'Total distance is ' + 
          Math.round(summary.totalDistance / 1000).toFixed(2) + ' km '
    setInfoRoute(infoRoute);                
  });

  setroutingControl(instance);
  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
