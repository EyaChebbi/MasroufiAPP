import axios from 'axios';

const baseURL = 'http://192.168.51.76:3000'; // Change with you IP Address

const api = axios.create({
  baseURL: baseURL,
});

export default api;
