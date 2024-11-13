// src/App.js
import React, { useState, useEffect } from 'react';
import ChatbotButton from './components/Chatbot/ChatbotButton';
import ChatWindow from './components/Chatbot/ChatWindow';
import './App.css';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatbotMessages');
    return savedMessages ? JSON.parse(savedMessages) : [
      { sender: 'user', text: 'Oi' },
      { sender: 'chatbot', text: 'Olá! Como posso te ajudar hoje?' }
    ];
  });

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    localStorage.setItem('chatbotMessages', JSON.stringify(messages));
  }, [messages]);

  return (
    <div className="App">
      {isChatOpen && (
        <ChatWindow onClose={handleToggleChat} messages={messages} setMessages={setMessages} />
      )}
      <ChatbotButton onClick={handleToggleChat} />
    </div>
  );
}

export default App;
