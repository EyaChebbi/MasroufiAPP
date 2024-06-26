import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const baseURL = 'http://172.26.224.1:3000'; // Change with you IP Address

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



export default api;
