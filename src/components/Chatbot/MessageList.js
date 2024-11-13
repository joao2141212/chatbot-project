// src/components/Chatbot/MessageList.js

import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
`;

const UserMessage = styled.div`
  align-self: flex-end;
  background-color: #0a84ff;
  color: #fff;
  padding: 12px;
  border-radius: 16px 16px 0 16px;
  max-width: 70%;
  word-wrap: break-word;
`;

const BotMessage = styled.div`
  align-self: flex-start;
  background-color: #e5e5ea;
  color: #000;
  padding: 12px;
  border-radius: 16px 16px 16px 0;
  max-width: 70%;
  word-wrap: break-word;
`;

const MessageList = ({ messages }) => (
  <div>
    {messages.map((msg, index) => (
      <MessageContainer key={index}>
        {msg.role === 'user' ? (
          <UserMessage>{msg.content}</UserMessage>
        ) : (
          <BotMessage>{msg.content}</BotMessage>
        )}
      </MessageContainer>
    ))}
  </div>
);

export default MessageList;
