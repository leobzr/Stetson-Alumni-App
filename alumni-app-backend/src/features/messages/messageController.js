import { Message } from './message.js';
import { User } from '../users/user.js';

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { recipient_username, content } = req.body;
    
    // Find recipient
    const recipient = await User.findOne({ user_name: recipient_username });
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    const message = new Message({
      sender: req.user.id,
      recipient: recipient._id,
      content
    });

    await message.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get inbox messages
export const getInbox = async (req, res) => {
  try {
    const messages = await Message.find({ recipient: req.user.id })
      .populate('sender', 'user_name first_name last_name')
      .sort({ createdAt: -1 });
    
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get sent messages
export const getSent = async (req, res) => {
  try {
    const messages = await Message.find({ sender: req.user.id })
      .populate('recipient', 'user_name first_name last_name')
      .sort({ createdAt: -1 });
    
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark message as read
export const markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    // Check if user is the recipient
    if (message.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    message.is_read = true;
    await message.save();
    
    res.status(200).json({ message: 'Message marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete message
export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    // Check if user is sender or recipient
    if (message.sender.toString() !== req.user.id && 
        message.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await message.deleteOne();
    
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getConversation = async (req, res) => {
  try {
    const me = req.user.id;
    const other = req.params.otherUserId;
    const msgs = await Message.find({
      $or: [
        { sender: me, recipient: other },
        { sender: other, recipient: me }
      ]
    }).sort({ createdAt: 1 })
      .populate('sender', 'first_name last_name user_name')
      .populate('recipient', 'first_name last_name user_name');
    res.status(200).json(msgs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};