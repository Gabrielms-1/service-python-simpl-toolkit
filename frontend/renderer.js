const axios = require('axios');
const { renderInitialScreen } = require('./initialScreen');
const { renderDownloadScreen } = require('./download');

document.getElementById('downloadBtn').addEventListener('click', () => {
  renderDownloadScreen();
});

document.getElementById('uploadBtn').addEventListener('click', () => {
  // Implemente a lógica para a tela de upload
});

document.addEventListener('DOMContentLoaded', () => {
  axios.get('http://localhost:5421/check-login')
    .then(response => {
      if (response.data.login_required) {
        renderLoginScreen();
      } else {
        renderInitialScreen();
      }
    })
    .catch(error => {
      console.error('Erro ao verificar a condição de login:', error);
      renderInitialScreen(); // Fallback para tela inicial em caso de erro
    });
});
