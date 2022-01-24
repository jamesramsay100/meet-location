var axios = require('axios');
import { stations } from './london_station_locations';

/**
 * 
 * Takes person locations and calculates the travel time 
 * to each station in json list
 * 
 * Orders list of stations by average or max travel time for each of the persons
 * 
 * Uses https://docs.traveltime.com/api/reference/distance-matrix#departure_searches
 * to get the travel times.
 * 
 * 
 */
export default async function calculateTravelTime (coordinates) {

    // resturn empty array if no coordinates (i.e. no people)
    if (coordinates.length === 0) {
        return []
    }

    // setup post body
    var data = createRequestBody();

    // setup config for axios
    var config = {
        method: 'post',
        url: 'https://api.traveltimeapp.com/v4/time-filter',
        headers: { 
          'X-Application-Id': process.env.REACT_APP_TRAVELTIME_APP_ID,
          'X-Api-Key': process.env.REACT_APP_TRAVELTIME_KEY,
          'Content-Type': 'application/json'
        },
        data : JSON.stringify(data)
    };

    // get travel times
    try {
        const response = await axios(config);
        return rankDestByTravelTime(response)
    }   catch (error) {
        console.log(error);
    }


    /**
     * 
     * Loop though each station
     *  - Collect travel time from each starting coordinate
     *  - Calculate average and max travel time from all the starting coordinates
     * 
     */
    function rankDestByTravelTime(response) {
        
        var travelTimes = [];

        // loop though all stations
        stations.forEach(station => {

            var entry = {
                name: station.name,
                latitude: station.latitude,
                longitude: station.longitude,
                times: []
            };

            // add the travel time for each person for this station
            var maxTime = 0;
            var count = 0;
            var sumTime = 0;
            response.data.results.forEach(search => {

                var result = search.locations.filter(obj => obj.id === station.name);
                if (result.length > 0) {
                    entry.times.push(
                        {
                            name: search.search_id,
                            travel_time: result[0].properties[0].travel_time
                        }
                    );
                    maxTime = Math.max(result[0].properties[0].travel_time, maxTime);
                    sumTime += result[0].properties[0].travel_time;
                    count += 1;
                } else {
                    entry.times.push(
                        {
                            name: station.name,
                            travel_time: 999999
                        }
                    );
                    maxTime = Math.max(999999, maxTime);
                    sumTime += 999999;
                    count += 1;
                }
            });
            // calculate average and max travel time from each start point
            entry.averageTime = sumTime / count;
            entry.maxTime = maxTime;
            travelTimes.push(entry);
        });

        // order the list of stations by average or max travel time
        // travelTimes.sort((a, b) => (a.averageTime > b.averageTime) ? 1 : -1);
        travelTimes.sort((a, b) => (a.maxTime > b.maxTime) ? 1 : -1);


        return travelTimes;
    }

    /**
     * 
     * Generates the request body for the travel time api
     * 
     */
    function createRequestBody() {
        var data = {
            "locations": [],
            "departure_searches": [],
            "arrival_searches": []
        };

        // add station to data.location list
        stations.forEach(element => {
            data.locations.push({
                "id": element.name,
                "coords": {
                    "lat": element.latitude,
                    "lng": element.longitude
                }
            });
        });

        // add each item in coordinates to data.location list
        coordinates.forEach(element => {
            data.locations.push({
                "id": element.name,
                "coords": {
                    "lat": element.latitude,
                    "lng": element.longitude
                }
            });
        });


        // create a new dpature search for each item in coordinates
        coordinates.forEach(element => {
            data.departure_searches.push({
                "id": element.name,
                "departure_location_id": element.name,
                "arrival_location_ids": stations.map(station => station.name),
                "transportation": {
                    "type": "public_transport"
                },
                "departure_time": "2022-01-24T08:00:00Z",
                "travel_time": 3600,
                "properties": [
                    "travel_time"
                ]
            });
        });
        return data;
    }
}

