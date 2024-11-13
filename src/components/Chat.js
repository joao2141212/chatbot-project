import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

function Chat() {
  const [mensagem, setMensagem] = useState('');
  const [resposta, setResposta] = useState('');
  const [isTyping, setIsTyping] = useState(false); // Estado para controlar o indicador de digitação

  const enviarMensagem = async () => {
    setIsTyping(true); // Ativa o indicador de digitação

    try {
      const response = await axios.post('http://localhost:5000/chat', { mensagem });
      setResposta(response.data.resposta);
    } catch (error) {
      console.error('Erro ao conectar com o backend:', error);
      setResposta('Erro ao conectar com o backend.');
    } finally {
      setIsTyping(false); // Desativa o indicador de digitação quando a resposta for recebida
    }
  };

  return (
    <div className="chat-container">
      <h1>Meu Chatbot</h1>
      <input
        type="text"
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        placeholder="Digite sua mensagem"
        className="message-box"
      />
      <button onClick={enviarMensagem} className="send-button">Enviar</button>
      <p>Resposta do Chatbot: {resposta}</p>
      
      {/* Mostrar o indicador de digitação se o estado for verdadeiro */}
      {isTyping && <p>Chatbot está digitando...</p>}
    </div>
  );
}

export default Chat;
