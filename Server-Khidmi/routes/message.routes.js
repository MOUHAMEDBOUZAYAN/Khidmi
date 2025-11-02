const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const {
  getConversations,
  getMessages,
  sendMessage,
  markAsRead,
  deleteMessage,
  getUnreadCount
} = require('../controllers/message.controller');

// All routes require authentication
router.use(protect);

router.get('/conversations', getConversations);
router.get('/conversation/:conversationId', getMessages);
router.get('/unread', getUnreadCount);
router.post('/', sendMessage);
router.put('/read/:conversationId', markAsRead);
router.delete('/:id', deleteMessage);

module.exports = router;

