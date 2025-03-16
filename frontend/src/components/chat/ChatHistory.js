import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

const ChatHistory = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h3 className="card-title mb-3">Conversation</h3>
        <div className="chat-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {messages.length === 0 ? (
            <div className="text-center text-muted py-5">
              <p>No messages yet. Start by submitting a query above.</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatMessage key={index} message={message} isUser={message.isUser} />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatHistory; 