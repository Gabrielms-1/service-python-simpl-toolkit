const axios = require('axios');

function renderLoginScreen() {
  console.log('Renderizando a tela de login...'); // Log de depuração
  document.querySelector('.button-container').style.display = 'none'; // Oculta os botões iniciais, caso estejam visíveis
  document.getElementById('content').innerHTML = `
    <div class="login-container">
      <h2>Login</h2>
      <button id="loginSsoBtn">Login SSO</button>
      <button id="loginExternalBtn">Login Externo</button>
    </div>
  `;

  document.getElementById('loginSsoBtn').addEventListener('click', () => {
    console.log('Botão de Login SSO clicado'); // Log de depuração
    handleSsoLogin()
  });

  document.getElementById('loginExternalBtn').addEventListener('click', () => {
    console.log('Botão de Login Externo clicado'); // Log de depuração
    renderExternalLoginScreen()
  });
}


function handleSsoLogin() {
  console.log('Iniciando login SSO...');
  axios.post('http://localhost:5421/sso-login')
    .then(response => {
      if (response.data.success) {
        console.log('Login SSO bem-sucedido');
        renderInitialScreen();
      } else {
        console.error('Falha no login SSO:', response.data.message);
        alert('Falha no login SSO: ' + response.data.message);
      }
    })
    .catch(error => {
      console.error('Erro ao fazer login SSO:', error);
    });
}

function renderExternalLoginScreen() {
  console.log('Renderizando a tela de login externo...');
  document.querySelector('.button-container').style.display = 'none'; // Oculta os botões iniciais

  document.getElementById('content').innerHTML = `
    <div class="external-login-container">
      <div id="error-message" style="color: red; display: none;"></div>
      <h2>Login Externo</h2>
      <form id="externalLoginForm">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" placeholder="Username">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Password">
        </div>
        <button type="submit">Login</button>
      </form>
      <button id="backBtn">Voltar</button>
    </div>
  `;

  document.getElementById('externalLoginForm').addEventListener('submit', handleExternalLogin);
  document.getElementById('backBtn').addEventListener('click', renderLoginScreen);
}

function handleExternalLogin(event) {
  event.preventDefault();
  console.log('Iniciando login externo...');
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  axios.post('http://localhost:5421/login', { username, password })
    .then(response => {
      console.log('Resposta do servidor:', response.data); // Imprime a resposta do servidor
      if (response.data.success) {
        console.log('Login externo bem-sucedido');
        renderInitialScreen();
      } else {
        console.error('Login failed, check your credentials', response.data.message);
        displayErrorMessage('Login failed, check your credentials');
      }
    })
    .catch(error => {
      console.error('Login failed, check your credentials', error);
      displayErrorMessage('Login failed, check your credentials');
    });
}

function displayErrorMessage(message) {
  const errorMessageDiv = document.getElementById('error-message');
  errorMessageDiv.textContent = message;
  errorMessageDiv.style.display = 'block';
}

module.exports = { renderLoginScreen };
