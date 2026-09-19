import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Intercepteur pour ajouter le token JWT aux requêtes sortantes
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;