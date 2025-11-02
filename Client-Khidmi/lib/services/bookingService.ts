import api from './api';

export const bookingService = {
  getBookings: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },

  getBooking: async (id: string) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  createBooking: async (bookingData: any) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  updateBooking: async (id: string, bookingData: any) => {
    const response = await api.put(`/bookings/${id}`, bookingData);
    return response.data;
  },

  updateBookingStatus: async (id: string, status: string) => {
    const response = await api.put(`/bookings/${id}/status`, { status });
    return response.data;
  },

  getBookingsByStatus: async (status: string) => {
    const response = await api.get(`/bookings/status/${status}`);
    return response.data;
  },

  deleteBooking: async (id: string) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  },
};

