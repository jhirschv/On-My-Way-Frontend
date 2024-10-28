import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: 'http://192.168.0.17:8000/',
});

// Add a request interceptor
apiClient.interceptors.request.use(
  async config => {
    try {
      const rawTokens = await AsyncStorage.getItem('authTokens');
      if (rawTokens) {
        const { access } = JSON.parse(rawTokens);
        config.headers.Authorization = `Bearer ${access}`;
      }
    } catch (error) {
      // Handle error if needed
      console.error('Error fetching auth tokens', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default apiClient;