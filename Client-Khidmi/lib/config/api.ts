// Configuration API Base URL
export const API_BASE_URL = __DEV__ 
  ? 'http://192.168.0.106:5000/api'  // Développement - IP de la machine
  : 'https://api.khidmi.ma/api';  // Production

// Pour tester sur Android Emulator
// export const API_BASE_URL = 'http://10.0.2.2:5000/api';

// Pour tester sur iOS Simulator
// export const API_BASE_URL = 'http://localhost:5000/api';

// Timeout pour les requêtes
export const API_TIMEOUT = 30000; // 30 secondes

// Headers par défaut
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

