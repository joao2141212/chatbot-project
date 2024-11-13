// src/components/Chatbot/QuickAccessButtons.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  bottom: 100px; /* Espaço acima do ChatbotButton */
  right: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  z-index: 999; /* Abaixo do ChatWindow */
  
  @media (max-width: 400px) {
    flex-direction: column;
    bottom: 90px;
    right: 10px;
    left: 10px;
    width: calc(100% - 20px);
  }
`;

const Button = styled.button`
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
`;

const QuickAccessButtons = ({ onQuickAccess }) => {
  const quickAccessQuestions = [
    'Como instalo o Node.js?',
    'O que é RAM?',
    'Como configuro uma VPN?',
    'Qual é a capital da França?',
    'O que é Docker?',
    // Adicione mais perguntas conforme necessário
  ];

  return (
    <Container>
      {quickAccessQuestions.map((question, index) => (
        <Button key={index} onClick={() => onQuickAccess(question)}>
          {question}
        </Button>
      ))}
    </Container>
  );
};

export default QuickAccessButtons;
