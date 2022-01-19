import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./BaseMap.scss";

/**
 * 
 * A MapboxGL map component diplaying all coordinates (from Engine state)
 * 
 */
export default function BaseMap ({ coordinates }) {

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  /**
   * 
   * Entier map re-renders when coordinates change
   * This is probably unnencessary...
   * 
   */
  useEffect(() => {

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
        const marker = new mapboxgl.Marker()
            .setLngLat([coordinate.longitude, coordinate.latitude])
            .addTo(map);
    });

  }, [coordinates]);

  return <div id="mapContainer" className="map" ></div>;
};
