// src/components/Chatbot/ChatbotButton.js
import React from 'react';
import styled from 'styled-components';
import { FaComments } from 'react-icons/fa'; // Ícone de mensagem

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #25d366; /* Verde WhatsApp */
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.3s;
  z-index: 1000; /* Garantir que fique acima de outros elementos */

  &:hover {
    background-color: #128c7e;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 400px) {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
`;

const ChatbotButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <FaComments />
    </Button>
  );
};

export default ChatbotButton;
