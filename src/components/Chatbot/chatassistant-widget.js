(function() {
    if (document.getElementById('chatassistant-widget')) return;

    var chatButton = document.createElement('button');
    chatButton.id = 'chatassistant-button';
    chatButton.innerHTML = '<svg ...></svg>'; // Ícone do chat

    chatButton.style = `
        position: fixed; 
        bottom: 20px; 
        right: 20px;
        background-color: #25d366;
        border-radius: 50%;
        width: 60px; 
        height: 60px;
        /* Mais estilos aqui */
    `;

    var chatWindow = document.createElement('div');
    chatWindow.style.display = 'none';
    chatWindow.innerHTML = `
        <div>ChatAssistant<button onclick="this.parentNode.parentNode.style.display='none'">&times;</button></div>
        <iframe src="https://joao2141212.github.io/chatbot-project/chatbot-project-embed.html?embedded=true"></iframe>
    `;

    chatButton.onclick = function() {
        chatWindow.style.display = 'block';
    };

    document.body.appendChild(chatButton);
    document.body.appendChild(chatWindow);
})();
