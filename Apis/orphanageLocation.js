const axios = require('axios');

const geocodeAddress = async (address) => {
  try {
    const apiKey = '65ccec02391c4be3a42d852129791c99';  
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}&language=ar&limit=1`;

    const response = await axios.get(url);

    if (response.data.results.length === 0) {
      return { error: 'No coordinates found for this address' };
    }

    const { lat, lng } = response.data.results[0].geometry;
    return { lat, lon: lng };  
  } catch (error) {
    console.error('Error during geocoding:', error.message);
    return { error: 'Failed to fetch location data' };
  }
};

module.exports = { geocodeAddress };
