const Message = require('../models/Message');
const { generateConversationId } = require('../utils/helpers');

// @desc    Get conversations
// @route   GET /api/messages/conversations
// @access  Private
exports.getConversations = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Récupérer toutes les conversations où l'utilisateur est impliqué
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: userId },
            { receiver: userId }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: '$conversationId',
          lastMessage: { $first: '$$ROOT' },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [{ $eq: ['$receiver', userId] }, { $eq: ['$isRead', false] }] },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    // Populate sender et receiver
    const populatedConversations = await Message.populate(conversations, {
      path: 'lastMessage.sender lastMessage.receiver',
      select: 'name avatar email phone'
    });

    res.json({
      success: true,
      count: populatedConversations.length,
      conversations: populatedConversations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get messages in a conversation
// @route   GET /api/messages/conversation/:conversationId
// @access  Private
exports.getMessages = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.id;

    // Récupérer les messages
    const messages = await Message.find({ conversationId })
      .populate('sender', 'name avatar')
      .populate('receiver', 'name avatar')
      .sort('createdAt');

    // Marquer comme lus
    await Message.updateMany(
      { 
        conversationId, 
        receiver: userId, 
        isRead: false 
      },
      { 
        $set: { isRead: true } 
      }
    );

    res.json({
      success: true,
      count: messages.length,
      messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Send message
// @route   POST /api/messages
// @access  Private
exports.sendMessage = async (req, res, next) => {
  try {
    const { receiver, content, type } = req.body;

    // Créer l'ID de conversation
    const conversationId = generateConversationId(req.user.id, receiver);

    // Créer le message
    const message = await Message.create({
      conversationId,
      sender: req.user.id,
      receiver,
      content,
      type: type || 'text'
    });

    await message.populate('sender', 'name avatar');
    await message.populate('receiver', 'name avatar');

    res.status(201).json({
      success: true,
      message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Mark messages as read
// @route   PUT /api/messages/read/:conversationId
// @access  Private
exports.markAsRead = async (req, res, next) => {
  try {
    const { conversationId } = req.params;

    await Message.updateMany(
      { 
        conversationId, 
        receiver: req.user.id, 
        isRead: false 
      },
      { 
        $set: { isRead: true } 
      }
    );

    res.json({
      success: true,
      message: 'Messages marqués comme lus'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
exports.deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message non trouvé'
      });
    }

    // Vérifier que c'est l'expéditeur
    if (message.sender.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé'
      });
    }

    await message.remove();

    res.json({
      success: true,
      message: 'Message supprimé'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get unread count
// @route   GET /api/messages/unread
// @access  Private
exports.getUnreadCount = async (req, res, next) => {
  try {
    const count = await Message.countDocuments({
      receiver: req.user.id,
      isRead: false
    });

    res.json({
      success: true,
      unreadCount: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

