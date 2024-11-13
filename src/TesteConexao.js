import React, { useEffect } from 'react';
import axios from 'axios';

function TesteConexao() {
  useEffect(() => {
    const enviarMensagem = async () => {
      try {
        const response = await axios.post('http://localhost:5000/chat', {
          mensagem: 'Olá, como funciona o ChatGPT?',
        });
        console.log(response.data.resposta); // Exibe a resposta do ChatGPT no console
      } catch (error) {
        console.error('Erro ao conectar com o backend:', error);
      }
    };
    enviarMensagem();
  }, []);

  return (
    <div>
      <h2>Verifique o console para ver a resposta do ChatGPT.</h2>
    </div>
  );
}

export default TesteConexao;
