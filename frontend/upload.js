const axios = require('axios');
const { renderInitialScreen } = require('./initialScreen');

function renderUploadScreen() {
  console.log('Renderizando a tela de upload...'); // Log de depuração
  document.querySelector('.button-container').style.display = 'none'; // Oculta os botões iniciais

  document.getElementById('content').innerHTML = `
    <h2>Tela de Upload</h2>
    <form id="uploadForm">
      <div class="form-group">
        <label for="projectName">Nome do Projeto</label>
        <input type="text" id="projectName" name="projectName" placeholder="Nome do Projeto">
      </div>
      <div class="form-group">
        <label for="datasetName">Nome do Dataset</label>
        <input type="text" id="datasetName" name="datasetName" placeholder="Nome do Dataset">
      </div>
      <button type="submit" id="startUpload">Iniciar Upload</button>
    </form>
    <button id="backBtn">Voltar</button> <!-- Botão de Voltar -->
  `;

  document.getElementById('uploadForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const projectName = document.getElementById('projectName').value;
    const datasetName = document.getElementById('datasetName').value;

    axios.post('http://localhost:5421/upload', { projectName, datasetName })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Erro ao iniciar o upload:', error);
      });
  });

  document.getElementById('backBtn').addEventListener('click', () => {
    console.log('Botão de voltar clicado'); // Log de depuração
    renderInitialScreen();
  });
}

module.exports = { renderUploadScreen };
