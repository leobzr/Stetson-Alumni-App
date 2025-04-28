import messageService from './messageService.js';

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { recipient_username, content } = req.body;
    await messageService.sendMessage(req.user.id, recipient_username, content);
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get inbox messages
export const getInbox = async (req, res) => {
  try {
    const messages = await messageService.getInbox(req.user.id);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get sent messages
export const getSent = async (req, res) => {
  try {
    const messages = await messageService.getSent(req.user.id);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark message as read
export const markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    await messageService.markAsRead(messageId, req.user.id);
    res.status(200).json({ message: 'Message marked as read' });
  } catch (error) {
    if (error.message === 'Message not found') {
      return res.status(404).json({ message: error.message });
    } else if (error.message === 'Not authorized') {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Delete message
export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    await messageService.deleteMessage(messageId, req.user.id);
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    if (error.message === 'Message not found') {
      return res.status(404).json({ message: error.message });
    } else if (error.message === 'Not authorized') {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Get conversation between users
export const getConversation = async (req, res) => {
  try {
    const messages = await messageService.getConversation(req.user.id, req.params.otherUserId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};