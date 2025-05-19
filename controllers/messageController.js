const Message = require('../models/Messages');
const User = require('../models/Users');
const { Op } = require('sequelize');

const sendMessage = async (req, res) => {
  try {
    const { receiver_id, message_text } = req.body;
    const sender_id = req.user.id;

    if (!receiver_id || !message_text) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const message = await Message.create({
      sender_id,
      receiver_id,
      message_text
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOwnMessages = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { sender_id: currentUserId },
          { receiver_id: currentUserId }
        ]
      },
      order: [['sent_at', 'ASC']], 
      include: [
        { model: User, as: 'Sender', attributes: ['id', 'full_name'] },
        { model: User, as: 'Receiver', attributes: ['id', 'full_name'] }
      ]
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markMessagesAsSeen = async (req, res) => {
  try {
    const senderId = parseInt(req.params.id, 10); 
    const currentUserId = req.user.id; 

   
    const messagesToUpdate = await Message.findAll({
      where: {
        sender_id: senderId,
        receiver_id: currentUserId,
        seen: false
      }
    });

    if (messagesToUpdate.length === 0) {
      return res.status(404).json({ message: 'No unseen messages found from this user.' });
    }

    await Message.update(
      { seen: true },
      {
        where: {
          sender_id: senderId,
          receiver_id: currentUserId,
          seen: false
        }
      }
    );

    res.json({ message: 'Messages marked as seen.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSentMessagesStatus = async (req, res) => {
  try {
    const senderId = req.user.id;
    const messages = await Message.findAll({
      where: { sender_id: senderId },
      attributes: ['id', 'receiver_id', 'seen']
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendMessage,
  getOwnMessages,
  markMessagesAsSeen,
  getSentMessagesStatus
};
