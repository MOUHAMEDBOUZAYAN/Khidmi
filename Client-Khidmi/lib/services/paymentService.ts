import api from './api';

export const paymentService = {
  createPaymentIntent: async (amount: number, currency: string = 'MAD', bookingId?: string, subscriptionId?: string) => {
    const response = await api.post('/payments/intent', {
      amount,
      currency,
      bookingId,
      subscriptionId,
    });
    return response.data;
  },

  confirmBookingPayment: async (bookingId: string, paymentMethod: string) => {
    const response = await api.post(`/payments/booking/${bookingId}`, { paymentMethod });
    return response.data;
  },

  confirmSubscriptionPayment: async (subscriptionId: string, paymentMethod: string) => {
    const response = await api.post(`/payments/subscription/${subscriptionId}`, { paymentMethod });
    return response.data;
  },

  getPaymentHistory: async () => {
    const response = await api.get('/payments/history');
    return response.data;
  },

  getPaymentStats: async () => {
    const response = await api.get('/payments/stats');
    return response.data;
  },
};

