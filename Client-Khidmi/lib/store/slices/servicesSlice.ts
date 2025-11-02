import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface Service {
  _id: string;
  name: string;
  description: string;
  category: string;
  icon?: string;
  image?: string;
  isActive: boolean;
}

interface ServicesState {
  services: Service[];
  loading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  loading: false,
  error: null,
};

// Fetch services
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/services');
      return response.data.services;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors du chargement des services');
    }
  }
);

// Fetch service by ID
export const fetchServiceById = createAsyncThunk(
  'services/fetchServiceById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/services/${id}`);
      return response.data.service;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Service non trouvé');
    }
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default servicesSlice.reducer;

