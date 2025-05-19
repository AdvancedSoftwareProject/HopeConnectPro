const axios = require('axios');
require('dotenv').config();

const fetchEmergencyDisasters = async (limit = 5) => {
  try {
    const useRealAPI = process.env.USE_REAL_EMERGENCY_API === 'true';

    if (useRealAPI) {
      const url = `https://api.reliefweb.int/v1/disasters?appname=myapp&limit=${limit}&profile=full`;
      const response = await axios.get(url);
      const disasters = response.data.data.map(entry => ({
        title: entry.fields.name,
        country: entry.fields.country?.map(c => c.name).join(', '),
        status: entry.fields.status,
        type: entry.fields.type?.map(t => t.name).join(', '),
        date: entry.fields.date?.created
      }));

      return {
        success: true,
        count: disasters.length,
        disasters,
        source: 'ReliefWeb',
        mock: false
      };
    } else {
      console.log('Using mock emergency disaster data');

      const mockDisasters = [
        {
          title: 'Mock Earthquake',
          country: 'Mockland',
          status: 'current',
          type: 'Earthquake',
          date: '2025-05-01'
        },
        {
          title: 'Mock Flood',
          country: 'Testovia',
          status: 'alert',
          type: 'Flood',
          date: '2025-05-05'
        }
      ];

      return {
        success: true,
        count: mockDisasters.length,
        disasters: mockDisasters,
        source: 'Mock',
        mock: true
      };
    }
  } catch (error) {
    console.error('Emergency API Error:', error.message);
    return {
      success: false,
      error: 'Failed to fetch emergency disaster data',
      details: error.message
    };
  }
};

module.exports = { fetchEmergencyDisasters };
