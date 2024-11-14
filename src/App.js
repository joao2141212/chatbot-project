// src/App.js
import React, { useState, useEffect } from 'react';
import ChatbotButton from './components/Chatbot/ChatbotButton';
import ChatWindow from './components/Chatbot/ChatWindow';
import './App.css';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatbotMessages');
    return savedMessages
      ? JSON.parse(savedMessages)
      : [
          { sender: 'user', text: 'Oi' },
          { sender: 'chatbot', text: 'Olá! Como posso te ajudar hoje?' },
        ];
  });

  // Adiciona estado para verificar se está embutido
  const [isEmbedded, setIsEmbedded] = useState(false);

  useEffect(() => {
    // Verifica se o parâmetro ?embedded=true está na URL
    const params = new URLSearchParams(window.location.search);
    setIsEmbedded(params.get('embedded') === 'true');
  }, []);

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
      {!isEmbedded && <ChatbotButton onClick={handleToggleChat} />} {/* Exibe o botão apenas se não estiver embutido */}
    </div>
  );
}

export default App;

