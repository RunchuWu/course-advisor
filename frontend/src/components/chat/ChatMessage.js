import React from 'react';

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`d-flex ${isUser ? 'justify-content-end' : 'justify-content-start'} mb-3`}>
      <div className={`card ${isUser ? 'bg-primary text-white' : 'bg-light'}`} style={{ maxWidth: '75%' }}>
        <div className="card-body py-2 px-3">
          <p className="mb-0">{message.text}</p>
          {message.courses && (
            <div className="mt-2">
              <h6>Recommended Courses:</h6>
              <ul className="mb-0">
                {message.courses.map((course, index) => (
                  <li key={index}>{course.name} - {course.description}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 