import * as React from 'react';
import { useState } from 'react';
import AddressForm from './AddressForm';

export default function Engine() {
    const [addresses, setAddresses] = useState([]);


    return(
        // <AddressForm submitAddresses={inputList => setAddresses(inputList)} />
        <div>
            <AddressForm setAddresses={setAddresses} />
            <div style={{ marginTop: 20 }}>{JSON.stringify(addresses)}</div>
        </div>
    );
};