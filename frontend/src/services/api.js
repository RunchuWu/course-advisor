import axios from 'axios';
import config from '../config';

const api = {
  submitQuery: async (queryData) => {
    try {
      const response = await axios.post(`${config.apiUrl}/query`, queryData);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  // Add more API methods as needed
};

export default api; 