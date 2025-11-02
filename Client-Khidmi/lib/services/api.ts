import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_TIMEOUT, DEFAULT_HEADERS } from '../config/api';

// Créer l'instance axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: DEFAULT_HEADERS,
});

// Intercepteur pour ajouter le token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token invalide, déconnecter l'utilisateur
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
      // Rediriger vers login
    }
    return Promise.reject(error);
  }
);

export default api;

