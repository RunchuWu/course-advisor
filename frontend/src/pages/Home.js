import React, { useState } from 'react';
import CourseQueryForm from '../components/forms/CourseQueryForm';
import ChatHistory from '../components/chat/ChatHistory';
import axios from 'axios';
import config from '../config';

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      // Add user message to chat
      const userMessage = {
        text: formData.query,
        isUser: true,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setLoading(true);

      console.log('Sending request to backend:', formData);
      
      // Send request to backend
      const response = await axios.post(`${config.apiUrl}/query`, formData);
      
      console.log('Received response from backend:', response.data);
      
      // Add AI response to chat
      const aiMessage = {
        text: response.data.message,
        courses: response.data.courses || [],
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error submitting query:', error);
      console.error('Error details:', error.response?.data);
      
      // Add error message to chat
      const errorMessage = {
        text: `Sorry, there was an error processing your request: ${error.response?.data?.message || error.message || 'Unknown error'}. Please try again.`,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="row mb-4">
        <div className="col-12">
          <div className="text-center mb-4">
            <h1 className="display-4">Duke Course Advisor</h1>
            <p className="lead">Get AI-powered course recommendations tailored to your academic interests</p>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-lg-6 mb-4">
          <CourseQueryForm onSubmit={handleSubmit} />
        </div>
        <div className="col-lg-6">
          {loading && (
            <div className="d-flex justify-content-center mb-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <ChatHistory messages={messages} />
        </div>
      </div>
    </div>
  );
};

export default Home; 