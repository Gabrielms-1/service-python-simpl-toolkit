function renderInitialScreen() {
    console.log('Renderizando a tela inicial...'); // Log de depuração
    document.querySelector('.button-container').style.display = 'flex'; // Exibe os botões iniciais
    document.getElementById('content').innerHTML = ''; // Limpa o conteúdo
  }
  
  module.exports = { renderInitialScreen };
  