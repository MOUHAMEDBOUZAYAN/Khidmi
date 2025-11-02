import api from './api';

export const serviceService = {
  getServices: async () => {
    const response = await api.get('/services');
    return response.data;
  },

  getService: async (id: string) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  getServicesByCategory: async (category: string) => {
    const response = await api.get(`/services/category/${category}`);
    return response.data;
  },
};

