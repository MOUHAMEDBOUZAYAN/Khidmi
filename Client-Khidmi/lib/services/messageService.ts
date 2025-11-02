import api from './api';

export const messageService = {
  getConversations: async () => {
    const response = await api.get('/messages/conversations');
    return response.data;
  },

  getMessages: async (conversationId: string) => {
    const response = await api.get(`/messages/conversation/${conversationId}`);
    return response.data;
  },

  sendMessage: async (messageData: {
    receiver: string;
    content: string;
    type?: string;
  }) => {
    const response = await api.post('/messages', messageData);
    return response.data;
  },

  markAsRead: async (conversationId: string) => {
    const response = await api.put(`/messages/read/${conversationId}`);
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await api.get('/messages/unread');
    return response.data;
  },

  deleteMessage: async (id: string) => {
    const response = await api.delete(`/messages/${id}`);
    return response.data;
  },
};

