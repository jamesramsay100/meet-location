import * as React from 'react';
import { useState, useEffect } from 'react';
import AddressForm from './AddressForm';
import addressesToCoordinates from './AddressesToCoordinates';
import BaseMap from './BaseMap';


/**
 * 
 * Main component that renders the AddressForm and BaseMap components
 * 
 * Houses the state of the addresses and coordinates and calculated meet locations
 * 
 */
export default function Engine() {

    const [addresses, setAddresses] = useState([]);  // names and addresses/post codes
    const [coordinates, setCoordinates] = useState([]);  // names and lat-long coordinates

    // update coordinates when addresses change
    useEffect(() => {
        addressesToCoordinates(addresses).then(coordinates => setCoordinates(coordinates));
    }, [addresses]);

    return(
        <div>
            <AddressForm setAddresses={setAddresses} />
            <BaseMap coordinates={coordinates}/>
            <div style={{ marginTop: 20, fontSize: '10px' }}>Coordinates for debugging...</div>
            <div style={{ fontSize: '10px' }}>{JSON.stringify(coordinates)}</div>
        </div>
    );
};