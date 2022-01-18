var axios = require('axios');

/**
 * 
 * Takes addresses (e.g. postcode or street address) 
 * and returns the coordinates of the addresses.
 * 
 * Uses https://positionstack.com/ to get the coordinates.
 * 
 * Only searches in 'GB'
 * 
 */
export default async function addressesToCoordinates (addresses) {
    
    var key = process.env.REACT_APP_POSITIONSTACK_KEY
    const country = 'GB'
    const coordinates = []

    await Promise.all(
        addresses.map(async (address) => {

            var config = {
                method: 'get',
                url: `http://api.positionstack.com/v1/forward?access_key=${key}&query=${address.address}&country=${country}`,
                headers: { },
                data : ''
            }
            try {
                const response = await axios(config)
                console.log(response.data)
                coordinates.push(
                    {
                        name: address.name,
                        address: address.address,
                        latitude: response.data.data[0].latitude,
                        longitude: response.data.data[0].longitude
                    }
                )
            } catch (error) {
                console.log(error)
            }
        })
    );

    return coordinates
    
}
