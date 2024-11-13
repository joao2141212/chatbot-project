// src/ChatService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/message';

const sendMessage = async (message, language = 'pt') => {
  try {
    const response = await axios.post(API_URL, {
      message,
      language,
    });
    return response.data.reply;
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    return "Desculpe, ocorreu um erro ao processar sua mensagem.";
  }
};

export default sendMessage;
