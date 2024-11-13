// src/components/Chatbot/MessageItem.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 8px;
`;

const MessageBubble = styled(motion.div)`
  background-color: ${({ theme, isUser }) =>
    isUser ? theme.colors.userMessage : theme.colors.botMessage};
  color: ${({ theme }) => theme.colors.text};
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.borderRadius};
  max-width: 70%;
  word-wrap: break-word;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    ${({ isUser }) => (isUser ? 'right: -10px;' : 'left: -10px;')}
    border-width: 10px 10px 0;
    border-style: solid;
    border-color: ${({ isUser, theme }) =>
      isUser
        ? `${theme.colors.userMessage} transparent transparent`
        : `${theme.colors.botMessage} transparent transparent`};
  }
`;

const MessageItem = ({ message }) => (
  <MessageContainer isUser={message.isUser}>
    <MessageBubble
      isUser={message.isUser}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {message.text}
    </MessageBubble>
  </MessageContainer>
);

export default MessageItem;
