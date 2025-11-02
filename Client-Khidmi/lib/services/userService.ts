import api from './api';

export const userService = {
  getUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  getUser: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id: string, userData: any) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  uploadAvatar: async (id: string, imageUri: string) => {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    } as any);

    const response = await api.post(`/users/${id}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getPrestataires: async (params?: { city?: string; profession?: string }) => {
    const response = await api.get('/users/prestataires', { params });
    return response.data;
  },

  getPrestataire: async (id: string) => {
    const response = await api.get(`/users/prestataires/${id}`);
    return response.data;
  },
};

