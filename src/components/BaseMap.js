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
      attributionControl: false
    });


    // add coordinates as markers
    coordinates.forEach(coordinate => {
        const marker = new mapboxgl.Marker({ "color": "#2ECC71" })
            .setLngLat([coordinate.longitude, coordinate.latitude])
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${coordinate.name}</h3>`))
            .addTo(map);
    });


    if (travelTimes.length > 0) {
      //add first travel time as marker
      const marker = new mapboxgl.Marker({ "color": "#3498DB" })
          .setLngLat([travelTimes[0].longitude, travelTimes[0].latitude])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${travelTimes[0].name}</h3><p>Fastest maximum travel time: ${parseInt(travelTimes[0].maxTime/60)} minutes</p>`))
          .addTo(map);

      //sort travel times by maxTime ascending
      const sortedTravelTimes = travelTimes.sort((a, b) => (a.averageTime > b.averageTime) ? 1 : -1);
      const marker2 = new mapboxgl.Marker({ "color": "#D35400" })
          .setLngLat([sortedTravelTimes[0].longitude, sortedTravelTimes[0].latitude])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h4>${sortedTravelTimes[0].name}</h4><p>Average travel: ${parseInt(sortedTravelTimes[0].averageTime/60)} minutes</p>`))
          .addTo(map);
      
    }


  }, [props.coordinates, props.travelTimes]);

  return <div id="mapContainer" className="map" ></div>;
};
