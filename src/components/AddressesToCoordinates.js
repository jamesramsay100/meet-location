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
    
    var key = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
    const country = 'GB'
    const coordinates = []
    const endpoint = 'mapbox.places'

    await Promise.all(
        addresses.map(async (address) => {

            const url = `https://api.mapbox.com/geocoding/v5/${endpoint}/${address.address}.json&access_token=${key}&country=${country}`

            var config = {
                method: 'get',
                url: url,
                headers: { },
                data : ''
            }
            try {
                const response = await axios(config)
                coordinates.push(
                    {
                        name: address.name,
                        address: address.address,
                        latitude: response.features[0].centre[1],
                        longitude: response.features[0].centre[0]
                    }
                )
            } catch (error) {
                console.log(error)
            }
        })
    );

    return coordinates
    
}
