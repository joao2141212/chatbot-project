// src/components/Chatbot/MessageInput.js

import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  padding: 16px;
  display: flex;
  border-top: 1px solid #d1d1d6;
`;

const InputField = styled.input`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #e5e5ea;
  margin-right: 8px;
  font-size: 16px;
  outline: none;
`;

const SendButton = styled.button`
  background-color: #0a84ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0060df;
  }
`;

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage('');
  };

  return (
    <InputContainer>
      <InputField
        type="text"
        placeholder="Escreva uma mensagem..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <SendButton onClick={handleSend}>Enviar</SendButton>
    </InputContainer>
  );
};

export default MessageInput;
