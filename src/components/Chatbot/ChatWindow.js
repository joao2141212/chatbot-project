// src/components/Chatbot/ChatWindow.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled, { ThemeProvider } from 'styled-components';
import axios from 'axios';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

// Definições de temas
const lightTheme = {
  background: '#fff',
  color: '#000',
  header: '#075e54',
  footer: '#ccc',
  buttonBackground: '#25d366',
  buttonHover: '#128c7e',
};

const darkTheme = {
  background: '#333',
  color: '#fff',
  header: '#555',
  footer: '#666',
  buttonBackground: '#25d366',
  buttonHover: '#128c7e',
};

// Container estilizado para a janela de chat
const ChatContainer = styled(motion.div)`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 360px;
  max-width: 90%;
  height: 600px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  border: 1px solid #ccc;
  border-radius: 20px;
  box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1001;

  @media (max-width: 400px) {
    width: 90%;
    left: 5%;
    right: 5%;
    bottom: 80px;
    height: 80vh;
  }
`;

const ChatHeader = styled(motion.div)`
  background-color: ${({ theme }) => theme.header};
  color: #fff;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatBody = styled(motion.div)`
  padding: 20px;
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  overflow-y: auto;
`;

const ChatFooter = styled(motion.div)`
  padding: 15px 20px;
  border-top: 1px solid ${({ theme }) => theme.footer};
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.footer};
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  outline: none;
  background-color: #f0f0f0;
  font-size: 16px;
`;

const SendButton = styled(motion.button)`
  background-color: ${({ theme }) => theme.buttonBackground};
  color: white;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  margin-left: 15px;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  color: #555;
  font-style: italic;
`;

// Ajuste para exibir apenas duas sugestões rápidas
const QuickRepliesContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.footer};
  justify-content: center;
`;

const QuickReplyButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground};
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }

  @media (max-width: 400px) {
    flex: 1 1 100%;
  }
`;

const ThemeToggle = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.color};
  cursor: pointer;
  font-size: 20px;
  margin-left: 10px;
`;

const ChatWindow = ({ onClose, messages, setMessages }) => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('chatbotTheme');
    return savedTheme ? savedTheme : 'light';
  });

  const quickReplies = [
    t('chatbot.quickReplies.ram'),
    t('chatbot.quickReplies.installServer')
  ];

  const handleQuickReply = (reply) => {
    handleSend(reply);
  };

  const handleSend = async (message = input) => {
    if (message.trim() === '') return;

    const newMessage = { sender: 'user', text: message };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      // Atualize a URL abaixo para apontar para o Heroku
      const response = await axios.post('https://meu-chatbot-backend-319b6590e29b.herokuapp.com/api/message', { messages: updatedMessages });
      const botReply = response.data.reply;

      setMessages(prev => [...prev, { sender: 'chatbot', text: botReply }]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setMessages(prev => [...prev, { sender: 'chatbot', text: t('chatbot.messages.error') }]);
    }

    setIsTyping(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('chatbotTheme', newTheme);
  };

  useEffect(() => {
    const chatBody = document.getElementById('chat-body');
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <ChatContainer
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <ChatHeader>
          <div>{t('chatbot.title')}</div>
          <div>
            <LanguageSelector />
            <ThemeToggle onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </ThemeToggle>
            <button onClick={onClose} style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '24px',
              cursor: 'pointer',
              marginLeft: '10px'
            }}>✖</button>
          </div>
        </ChatHeader>
        <ChatBody id="chat-body">
          {messages.map((msg, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                marginBottom: '10px',
                textAlign: msg.sender === 'user' ? 'right' : 'left'
              }}
            >
              <strong>{msg.sender === 'user' ? t('chatbot.user') : t('chatbot.chatbot')}:</strong> 
              {msg.text}
            </motion.p>
          ))}
          {isTyping && (
            <TypingIndicator>
              {t('chatbot.messages.typing')}
            </TypingIndicator>
          )}
        </ChatBody>
        <QuickRepliesContainer>
          {quickReplies.map((reply, index) => (
            <QuickReplyButton key={index} onClick={() => handleQuickReply(reply)}>
              {reply}
            </QuickReplyButton>
          ))}
        </QuickRepliesContainer>
        <ChatFooter>
          <MessageInput 
            type="text" 
            placeholder={t('chatbot.placeholder')} 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handleSend(); }}
          />
          <SendButton
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
          >
            ➤
          </SendButton>
        </ChatFooter>
      </ChatContainer>
    </ThemeProvider>
  );
};

export default ChatWindow;
