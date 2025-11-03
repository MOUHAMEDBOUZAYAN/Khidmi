import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_TIMEOUT, DEFAULT_HEADERS } from '../config/api';

// Créer l'instance axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: DEFAULT_HEADERS,
});

console.log('🌐 [API] Configuration:', { baseURL: API_BASE_URL, timeout: API_TIMEOUT });

// Intercepteur pour ajouter le token
api.interceptors.request.use(
  async (config) => {
    console.log('📤 [API] Requête envoyée:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
    });
    
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 [API] Token ajouté à la requête');
    }
    return config;
  },
  (error) => {
    console.log('❌ [API] Erreur intercepteur requête:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => {
    console.log('📥 [API] Réponse reçue:', {
      status: response.status,
      url: response.config.url,
    });
    return response;
  },
  async (error) => {
    console.log('❌ [API] Erreur intercepteur réponse:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data,
    });
    
    if (error.response?.status === 401) {
      console.log('🔓 [API] Token invalide, déconnexion de l\'utilisateur');
      // Token invalide, déconnecter l'utilisateur
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
      // Rediriger vers login
    }
    return Promise.reject(error);
  }
);

export default api;

