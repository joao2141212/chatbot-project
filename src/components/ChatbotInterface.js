// ChatbotInterface.js
import React, { useState } from 'react';
import axios from 'axios';

const ChatbotInterface = ({ language }) => {
  const [userMessage, setUserMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const handleSendMessage = async () => {
    if (!userMessage) return;

    try {
      const response = await axios.post('/api/chat', {
        message: userMessage,
        language: language  // Enviando o idioma selecionado para o backend
      });
      setChatResponse(response.data.response);
      setUserMessage('');  // Limpa o campo de mensagem após o envio
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <textarea
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Digite sua mensagem..."
        style={{ width: '100%', height: '100px', marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
      />
      <button onClick={handleSendMessage} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>
        Enviar
      </button>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f4f4f4', borderRadius: '5px' }}>
        <strong>Resposta:</strong>
        <p>{chatResponse}</p>
      </div>
    </div>
  );
};

export default ChatbotInterface;
