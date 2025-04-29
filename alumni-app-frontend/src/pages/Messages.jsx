import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../../config';

function Messages() {
  const { user, accessToken } = useAuth();
  const [conversations, setConversations] = useState([]);         
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  
  // Remove the modal-related states since we're using profile navigation instead
  
  // Load inbox + sent, derive unique partners with full user info
  const fetchPartners = useCallback(async () => {
    try {
      setLoading(true);
      const [inb, sent] = await Promise.all([
        fetch(`${API_BASE_URL}/messages/inbox`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          credentials: 'include'
        }).then(r => r.json()),
        fetch(`${API_BASE_URL}/messages/sent`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          credentials: 'include'
        }).then(r => r.json())
      ]);
      const map = new Map();
      inb.forEach(m => map.set(m.sender._id, m.sender));
      sent.forEach(m => map.set(m.recipient._id, m.recipient));
      setConversations(Array.from(map.values()));
    } catch (err) {
      console.error("Error loading conversations:", err);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  // fetch the 2‑way thread when you click a partner
  const fetchConversation = useCallback(async (partner) => {
    setSelectedUser(partner);
    try {
      const res = await fetch(`${API_BASE_URL}/messages/conversation/${partner._id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        credentials: 'include'
      });
      if (res.ok) setMessages(await res.json());
    } catch (err) {
      console.error("Error fetching conversation:", err);
    }
  }, [accessToken]);

  // Modified send message function with proper response handling
  const sendMessage = async e => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        credentials: 'include',
        body: JSON.stringify({
          recipient_username: selectedUser.user_name,
          content: newMessage
        })
      });
      
      // Check if the response is successful
      if (response.ok) {
        // Add this user to conversations list if not already there
        if (!conversations.some(c => c._id === selectedUser._id)) {
          setConversations(prev => [...prev, selectedUser]);
        }
        
        // reload conversation and clear input
        fetchConversation(selectedUser);
        setNewMessage('');
      } else {
        console.error("Failed to send message:", await response.text());
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  useEffect(() => {
    if (user) fetchPartners();
  }, [user, fetchPartners]);

  // Scroll to bottom of messages when they update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Enhanced profile messaging effect to update conversations list
  useEffect(() => {
    const storedUser = sessionStorage.getItem('messageUser');
    if (storedUser) {
      try {
        const userToMessage = JSON.parse(storedUser);
        
        // Add this user to conversations if not already there
        if (!conversations.some(c => c._id === userToMessage._id)) {
          setConversations(prev => [...prev, userToMessage]);
        }
        
        // Set as selected user
        setSelectedUser(userToMessage);
        
        // Clear stored user to avoid reloading on refresh
        sessionStorage.removeItem('messageUser');
      } catch (err) {
        console.error("Error parsing stored user:", err);
      }
    }
  }, [conversations]); // Changed dependency to conversations

  // Format timestamp
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container-fluid mt-4">
      <h2 className="mb-4">Messages</h2>
      
      <div className="card" style={{ maxWidth: '1500px', margin: '0 auto' }}>
        <div className="row g-0">
          {/* Conversations sidebar */}
          <div className="col-12 col-lg-4 col-xl-3 border-right">
            <div className="px-4 d-none d-md-block">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h5 className="my-3">Conversations</h5>
                </div>
                {/* Removed New Message button */}
              </div>
            </div>

            {loading ? (
              <div className="d-flex justify-content-center p-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : conversations.length === 0 ? (
              <div className="text-center p-4 text-muted">
                <p>No conversations yet</p>
                <p className="small">Visit a user's profile to start a conversation</p>
              </div>
            ) : (
              <div className="list-group rounded-0">
                {conversations.map(partner => (
                  <a 
                    href="#" 
                    className={`list-group-item list-group-item-action border-0 ${
                      selectedUser?._id === partner._id ? 'active' : ''
                    }`}
                    key={partner._id}
                    onClick={(e) => {
                      e.preventDefault();
                      fetchConversation(partner);
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-2" 
                           style={{ width: 40, height: 40 }}>
                        {partner.first_name?.charAt(0)}{partner.last_name?.charAt(0)}
                      </div>
                      <div className="flex-grow-1 ml-3">
                        <div className="fw-bold">{partner.first_name} {partner.last_name}</div>
                        <div className="small text-nowrap overflow-hidden">
                          @{partner.user_name}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
          
          {/* Chat area - no changes needed */}
          <div className="col-12 col-lg-8 col-xl-9">
            {selectedUser ? (
              <>
                {/* Chat header */}
                <div className="py-2 px-4 border-bottom d-none d-lg-block">
                  <div className="d-flex align-items-center py-1">
                    <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-2" 
                         style={{ width: 40, height: 40 }}>
                      {selectedUser.first_name?.charAt(0)}{selectedUser.last_name?.charAt(0)}
                    </div>
                    <div className="flex-grow-1 pl-3">
                      <strong>{selectedUser.first_name} {selectedUser.last_name}</strong>
                      <div className="text-muted small">@{selectedUser.user_name}</div>
                    </div>
                  </div>
                </div>

                {/* Messages area - no changes needed */}
                <div 
                  className="position-relative" 
                  style={{ 
                    height: '300px',
                    overflowY: 'scroll', 
                    display: 'flex', 
                    flexDirection: 'column',
                    padding: '1rem'
                  }}
                >
                  {messages.length === 0 ? (
                    <div className="text-center my-auto">
                      <p className="text-muted">No messages yet. Start a conversation!</p>
                    </div>
                  ) : (
                    messages.map(m => (
                      <div 
                        key={m._id} 
                        className={`d-flex mb-3 ${m.sender._id === user.id ? 'justify-content-end' : 'justify-content-start'}`}
                      >
                        {m.sender._id !== user.id && (
                          <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-2" 
                               style={{ width: 32, height: 32, minWidth: 32 }}>
                            {m.sender.first_name?.charAt(0)}{m.sender.last_name?.charAt(0)}
                          </div>
                        )}
                        <div
                          className={`p-3 rounded ${
                            m.sender._id === user.id 
                              ? 'bg-primary text-white' 
                              : 'bg-light'
                          }`}
                          style={{ maxWidth: '75%', wordWrap: 'break-word' }}
                        >
                          <div>{m.content}</div>
                          <div className={`small mt-1 ${
                            m.sender._id === user.id ? 'text-white-50' : 'text-muted'
                          }`}>
                            {formatTime(m.createdAt)}
                          </div>
                        </div>
                        {m.sender._id === user.id && (
                          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center ms-2" 
                               style={{ width: 32, height: 32, minWidth: 32 }}>
                            {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message input - no changes needed */}
                <div className="p-3 border-top">
                  <form onSubmit={sendMessage} className="d-flex">
                    <input 
                      type="text" 
                      className="form-control me-2" 
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={!newMessage.trim()}
                    >
                      Send
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center" 
                   style={{ height: '300px' }}>
                <div className="text-center">
                  <img 
                    src="/person.png" 
                    alt="Select a conversation" 
                    style={{ opacity: 0.5, width: 120, height: 120 }}
                  />
                  <h5 className="mt-4">Select a conversation</h5>
                  <p className="text-muted">Choose a contact to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Removed New Conversation Modal */}
    </div>
  );
}

export default Messages;