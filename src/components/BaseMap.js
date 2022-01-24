import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./BaseMap.scss";

/**
 * 
 * A MapboxGL map component diplaying all coordinates (from Engine state)
 * 
 */
export default function BaseMap (props) {

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  

  /**
   * 
   * Entier map re-renders when coordinates change
   * This is probably unnencessary...
   * 
   */
  useEffect(() => {

    const coordinates = props.coordinates;
    const travelTimes = props.travelTimes;

    // calculate average latitude and longitude from coordinates array with central london as first point
    var averageLat = 51.5080;
    var averageLng = -0.106;
    if (coordinates.length > 0) {
        coordinates.forEach(coordinate => {
            averageLat += coordinate.latitude;
            averageLng += coordinate.longitude;
        });
        averageLat = averageLat / (coordinates.length + 1);
        averageLng = averageLng / (coordinates.length + 1);
    }
    
    // remove map on mount
    const map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [averageLng, averageLat],
      zoom: 9,
    });

    // add navigation control
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-right");   

    // add coordinates as markers
    coordinates.forEach(coordinate => {
        const marker = new mapboxgl.Marker({ "color": "#2ECC71" })
            .setLngLat([coordinate.longitude, coordinate.latitude])
            .addTo(map);
    });


    if (travelTimes.length > 0) {
      //add first travel time as marker
      const marker = new mapboxgl.Marker({ "color": "#3498DB" })
          .setLngLat([travelTimes[0].longitude, travelTimes[0].latitude])
          .addTo(map);
    }


  }, [props.coordinates, props.travelTimes]);

  return <div id="mapContainer" className="map" ></div>;
};
