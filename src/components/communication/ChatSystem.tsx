'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Badge, Form, Dropdown, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'image';
  reactions: { [key: string]: string[] };
  isRead: boolean;
  fileUrl?: string;
  fileName?: string;
}

interface ChatSystemProps {
  currentUser: string;
  recipient?: string;
  isGroupChat?: boolean;
}

const ChatSystem: React.FC<ChatSystemProps> = ({ currentUser, recipient, isGroupChat = false }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Dr. Sarah Chen',
      content: 'Hi! I wanted to discuss your recent progress in the JavaScript course.',
      timestamp: new Date(Date.now() - 3600000),
      type: 'text',
      reactions: {},
      isRead: true
    },
    {
      id: '2',
      sender: currentUser,
      content: 'Thank you! I\'ve been working hard on the React projects.',
      timestamp: new Date(Date.now() - 1800000),
      type: 'text',
      reactions: { '👍': ['Dr. Sarah Chen'] },
      isRead: true
    },
    {
      id: '3',
      sender: 'Dr. Sarah Chen',
      content: 'That\'s great! I can see significant improvement in your code quality.',
      timestamp: new Date(Date.now() - 900000),
      type: 'text',
      reactions: {},
      isRead: false
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => setIsTyping(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  const handleSendMessage = () => {
    if (!newMessage.trim() && !selectedFile) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: currentUser,
      content: newMessage,
      timestamp: new Date(),
      type: selectedFile ? 'file' : 'text',
      reactions: {},
      isRead: false,
      fileUrl: selectedFile ? URL.createObjectURL(selectedFile) : undefined,
      fileName: selectedFile?.name
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setSelectedFile(null);
    setShowFileUpload(false);

    // Simulate typing indicator from recipient
    setTimeout(() => setIsTyping(true), 1000);

    toast.success('Message sent!');
  };

  const handleReaction = (messageId: string, reaction: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const currentReactions = { ...msg.reactions };
        if (currentReactions[reaction]) {
          if (currentReactions[reaction].includes(currentUser)) {
            currentReactions[reaction] = currentReactions[reaction].filter(user => user !== currentUser);
            if (currentReactions[reaction].length === 0) {
              delete currentReactions[reaction];
            }
          } else {
            currentReactions[reaction] = [...currentReactions[reaction], currentUser];
          }
        } else {
          currentReactions[reaction] = [currentUser];
        }
        return { ...msg, reactions: currentReactions };
      }
      return msg;
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast.info(`File selected: ${file.name}`);
    }
  };

  const filteredMessages = messages.filter(msg =>
    msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const reactions = ['👍', '❤️', '😊', '🎉', '👏', '💡'];

  return (
    <Card className="border-0 shadow-sm">
      <div className="chat-container">
        <div className="chat-header">
          <div className="d-flex align-items-center">
            <img 
              src="https://via.placeholder.com/40" 
              alt="Profile" 
              className="rounded-circle me-2"
              style={{ width: '40px', height: '40px' }}
            />
            <div>
              <h6 className="mb-0">{recipient || 'Study Group'}</h6>
              <small>{isGroupChat ? '5 members' : 'Online'}</small>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Button variant="light" size="sm">
              <i className="bi bi-search"></i>
            </Button>
            <Button variant="light" size="sm">
              <i className="bi bi-three-dots-vertical"></i>
            </Button>
          </div>
        </div>

        <div className="chat-messages">
          {filteredMessages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.sender === currentUser ? 'sent' : 'received'} message-enter`}
            >
              <div className="message-bubble">
                {message.type === 'file' && (
                  <div className="file-preview mb-2">
                    <div className="file-icon">
                      <i className="bi bi-file-earmark"></i>
                    </div>
                    <div>
                      <div className="fw-medium">{message.fileName}</div>
                      <small className="text-muted">File attachment</small>
                    </div>
                  </div>
                )}
                <div>{message.content}</div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {message.sender === currentUser && (
                    <i className={`bi bi-check2-all ms-1 ${message.isRead ? 'text-primary' : 'text-muted'}`}></i>
                  )}
                </div>
                
                {Object.keys(message.reactions).length > 0 && (
                  <div className="message-reactions">
                    {Object.entries(message.reactions).map(([reaction, users]) => (
                      <span key={reaction} className="reaction">
                        {reaction} {users.length}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              {message.sender !== currentUser && (
                <Dropdown className="ms-2">
                  <Dropdown.Toggle variant="light" size="sm">
                    <i className="bi bi-emoji-smile"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {reactions.map(reaction => (
                      <Dropdown.Item 
                        key={reaction} 
                        onClick={() => handleReaction(message.id, reaction)}
                      >
                        {reaction}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="typing-indicator">
              <span className="typing-dots">Dr. Sarah Chen is typing</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <Button 
            variant="outline-secondary" 
            size="sm"
            onClick={() => setShowFileUpload(true)}
          >
            <i className="bi bi-paperclip"></i>
          </Button>
          
          <Form.Control
            as="textarea"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            rows={1}
          />
          
          <Button 
            variant="primary" 
            size="sm"
            onClick={handleSendMessage}
            disabled={!newMessage.trim() && !selectedFile}
          >
            <i className="bi bi-send"></i>
          </Button>
        </div>
      </div>

      {/* Search Modal */}
      <Modal show={!!searchQuery} onHide={() => setSearchQuery('')}>
        <Modal.Header closeButton>
          <Modal.Title>Search Messages</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Search in conversation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="search-results mt-3">
            {filteredMessages.map((message) => (
              <div key={message.id} className="search-result-item">
                <div className="fw-medium">{message.sender}</div>
                <div className="text-muted">{message.content}</div>
                <small className="text-muted">{message.timestamp.toLocaleString()}</small>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>

      {/* File Upload Modal */}
      <Modal show={showFileUpload} onHide={() => setShowFileUpload(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="file-upload-area">
            <i className="bi bi-cloud-upload fs-1 text-muted mb-3"></i>
            <p>Drag and drop files here or click to browse</p>
            <Form.Control
              type="file"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt,.jpg,.png,.gif"
            />
          </div>
          {selectedFile && (
            <div className="file-preview">
              <div className="file-icon">
                <i className="bi bi-file-earmark"></i>
              </div>
              <div>
                <div className="fw-medium">{selectedFile.name}</div>
                <small className="text-muted">{(selectedFile.size / 1024).toFixed(1)} KB</small>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFileUpload(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setShowFileUpload(false)}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default ChatSystem;
