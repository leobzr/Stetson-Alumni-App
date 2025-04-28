import { Message } from './message.js';
import { User } from '../users/user.js';

/**
 * Service for message-related operations
 */
class MessageService {
  /**
   * Send a message
   */
  async sendMessage(senderId, recipientUsername, content) {
    // Find recipient
    const recipient = await User.findOne({ user_name: recipientUsername });
    if (!recipient) {
      throw new Error('Recipient not found');
    }

    const message = new Message({
      sender: senderId,
      recipient: recipient._id,
      content
    });

    return message.save();
  }

  /**
   * Get inbox messages
   */
  async getInbox(userId) {
    return Message.find({ recipient: userId })
      .populate('sender', 'user_name first_name last_name')
      .sort({ createdAt: -1 });
  }

  /**
   * Get sent messages
   */
  async getSent(userId) {
    return Message.find({ sender: userId })
      .populate('recipient', 'user_name first_name last_name')
      .sort({ createdAt: -1 });
  }

  /**
   * Mark message as read
   */
  async markAsRead(messageId, userId) {
    const message = await Message.findById(messageId);
    
    if (!message) {
      throw new Error('Message not found');
    }
    
    // Check if user is the recipient
    if (message.recipient.toString() !== userId) {
      throw new Error('Not authorized');
    }
    
    message.is_read = true;
    return message.save();
  }

  /**
   * Delete message
   */
  async deleteMessage(messageId, userId) {
    const message = await Message.findById(messageId);
    
    if (!message) {
      throw new Error('Message not found');
    }
    
    // Check if user is sender or recipient
    if (message.sender.toString() !== userId && 
        message.recipient.toString() !== userId) {
      throw new Error('Not authorized');
    }
    
    return message.deleteOne();
  }

  /**
   * Get conversation between two users
   */
  async getConversation(userId, otherUserId) {
    return Message.find({
      $or: [
        { sender: userId, recipient: otherUserId },
        { sender: otherUserId, recipient: userId }
      ]
    })
    .sort({ createdAt: 1 })
    .populate('sender', 'first_name last_name user_name')
    .populate('recipient', 'first_name last_name user_name');
  }
}

export default new MessageService();