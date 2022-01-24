import * as React from 'react';
import { useState, useEffect } from 'react';
import AddressForm from './AddressForm';
import addressesToCoordinates from './AddressesToCoordinates';
import calculateTravelTime from './CalculateTravelTime';
import BaseMap from './BaseMap';
import Box from '@mui/material/Box';

/**
 * 
 * Main component that renders the AddressForm and BaseMap components
 * 
 * Houses the state of the addresses, coordinates and calculated meet locations
 * 
 */
export default function Engine() {

    const [addresses, setAddresses] = useState([]);  // names and addresses/post codes
    const [coordinates, setCoordinates] = useState([]);  // names and lat-long coordinates
    const [travelTimes, setTravelTimes] = useState([]);  // names and travel times

    // update coordinates when addresses change
    useEffect(() => {
        addressesToCoordinates(addresses).then(coordinates => setCoordinates(coordinates));
        console.log("coordinates: ", coordinates);
    }, [addresses]);

    useEffect(() => {
        calculateTravelTime(coordinates).then(times => setTravelTimes(times));
        console.log("travelTimes: ", travelTimes);
    }, [coordinates]);

    return(
        <Box
            m='auto'  // centralise
            sx={{
                maxWidth: '800px',  // no need to use full width on large monitors
                bgcolor: 'background.paper', 
                borderRadius: '6px',
            }}
        >
            <AddressForm setAddresses={setAddresses} />
            <BaseMap coordinates={coordinates} travelTimes={travelTimes}/>
            <div style={{ marginTop: 20, fontSize: '10px' }}>Coordinates for debugging...</div>
            <div style={{ fontSize: '10px' }}>{JSON.stringify(coordinates)}</div>
        </Box>
    );
};