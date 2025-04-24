// src/features/messages/messageModel.js
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  is_read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export const Message = mongoose.model('Message', messageSchema);