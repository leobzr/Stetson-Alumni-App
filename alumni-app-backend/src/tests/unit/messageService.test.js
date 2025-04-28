import { jest } from '@jest/globals';
import messageService from '../../features/messages/messageService.js';
import { Message } from '../../features/messages/message.js';
import { User } from '../../features/users/user.js';

describe('Message Service', () => {
  afterEach(() => jest.restoreAllMocks());

  it('should send a message', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue({ _id: 'recipientId' });
    jest.spyOn(Message.prototype, 'save').mockResolvedValue({ content: 'hi' });
    const result = await messageService.sendMessage('senderId', 'recipient', 'hi');
    expect(result.content).toBe('hi');
  });

  it('should throw if recipient not found', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(null);
    await expect(messageService.sendMessage('senderId', 'recipient', 'hi')).rejects.toThrow('Recipient not found');
  });
});