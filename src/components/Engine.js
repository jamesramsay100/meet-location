import * as React from 'react';
import { useState, useEffect } from 'react';
import AddressForm from './AddressForm';
import addressesToCoordinates from './AddressesToCoordinates';

export default function Engine() {

    const [addresses, setAddresses] = useState([]);
    const [coordinates, setCoordinates] = useState([]);

    // update coordinates when addresses change
    useEffect(() => {
        addressesToCoordinates(addresses).then(coordinates => setCoordinates(coordinates));
        console.log(coordinates);
    }, [addresses]);

    return(
        <div>
            <AddressForm setAddresses={setAddresses} />
            <div style={{ marginTop: 20, fontSize: '10px' }}>Coordinates for debugging...</div>
            <div style={{ fontSize: '10px' }}>{JSON.stringify(coordinates)}</div>
        </div>
    );
};