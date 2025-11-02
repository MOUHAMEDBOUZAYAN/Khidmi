import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface Booking {
  _id: string;
  client: any;
  prestataire: any;
  service: any;
  status: string;
  description: string;
  location: string;
  scheduledDate: string;
  price: number;
  paymentStatus: string;
}

interface BookingsState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingsState = {
  bookings: [],
  loading: false,
  error: null,
};

// Fetch bookings
export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/bookings');
      return response.data.bookings;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors du chargement des réservations');
    }
  }
);

// Create booking
export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData: any, { rejectWithValue }) => {
    try {
      const response = await api.post('/bookings', bookingData);
      return response.data.booking;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la création de la réservation');
    }
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      });
  },
});

export default bookingsSlice.reducer;

