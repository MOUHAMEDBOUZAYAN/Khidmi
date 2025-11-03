import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'prestataire' | 'admin';
  avatar?: string;
  isPremium: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Register
export const register = createAsyncThunk(
  'auth/register',
  async (userData: { name: string; email: string; phone: string; password: string; role?: string }, { rejectWithValue }) => {
    try {
      console.log('🔵 [REDUX] Register thunk appelé');
      console.log('📋 [REDUX] Données envoyées:', { ...userData, password: '***' });
      
      const response = await api.post('/auth/register', userData);
      console.log('✅ [REDUX] Réponse reçue:', response.data);
      
      await AsyncStorage.setItem('authToken', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      console.log('💾 [REDUX] Tokens sauvegardés dans AsyncStorage');
      
      return response.data;
    } catch (error: any) {
      console.log('❌ [REDUX] Erreur dans register thunk:', error);
      console.log('❌ [REDUX] Status:', error.response?.status);
      console.log('❌ [REDUX] Data:', error.response?.data);
      console.log('❌ [REDUX] Message:', error.response?.data?.message);
      console.log('❌ [REDUX] Stack:', error.stack);
      
      const errorMessage = error.response?.data?.message || error.message || 'Erreur lors de l\'inscription';
      console.log('❌ [REDUX] Message d\'erreur final:', errorMessage);
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      await AsyncStorage.setItem('authToken', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la connexion');
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/auth/logout');
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la déconnexion');
    }
  }
);

// Load user from storage
export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async () => {
    const token = await AsyncStorage.getItem('authToken');
    const userStr = await AsyncStorage.getItem('user');
    if (token && userStr) {
      return { token, user: JSON.parse(userStr) };
    }
    throw new Error('No user found');
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        console.log('⏳ [REDUX] Register pending - loading = true');
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log('✅ [REDUX] Register fulfilled - utilisateur connecté:', action.payload.user?.email);
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        console.log('❌ [REDUX] Register rejected - erreur:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      // Load user
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

