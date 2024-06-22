const axios = require('axios');
const { renderInitialScreen } = require('./initialScreen');

function renderDownloadScreen() {
  console.log('Renderizando a tela de download...'); // Log de depuração
  document.querySelector('.button-container').style.display = 'none'; // Oculta os botões iniciais

  document.getElementById('content').innerHTML = `
    <div class="download-container">
      <h2>Tela de Download</h2>
      <form id="downloadForm">
        <div class="form-group">
          <label for="projectName">Nome do Projeto</label>
          <div style="display: flex; align-items: center;">
            <select id="projectName" name="projectName"></select>
            <div id="loading-spinner" style="display: none; width: 20px; height: 20px; margin-left: 10px;"></div> <!-- Spinner de carregamento -->
          </div>
        </div>
        <div class="form-group">
          <label for="datasetName">Nome do Dataset</label>
          <select id="datasetName" name="datasetName"></select>
        </div>
        <div class="form-group">
          <label for="additionalField">Novo Campo de Texto</label>
          <input type="text" id="additionalField" name="additionalField" placeholder="Digite algo">
        </div>
        <div class="form-group">
          <label for="outputFolder">Output Folder</label>
          <div style="display: flex; align-items: center;">
            <input type="text" id="outputFolder" name="outputFolder" placeholder="Selecione uma pasta" readonly>
            <button type="button" id="selectFolderBtn">...</button>
          </div>
        </div>
        <div class="button-group">
          <button type="submit" id="startDownload">Iniciar Download</button>
          <button id="backBtn">Voltar</button> <!-- Botão de Voltar -->
        </div>
      </form>
    </div>
  `;

  // Exibe o spinner de carregamento
  document.getElementById('loading-spinner').style.display = 'block';
  
  // Fetch options for the dropdowns
  fetchProjectOptions();

  document.getElementById('projectName').addEventListener('change', () => {
    const selectedProject = document.getElementById('projectName').value;
    console.log(`Projeto selecionado: ${selectedProject}`); // Log de depuração
    fetchDatasetOptions(selectedProject);
  });

  document.getElementById('selectFolderBtn').addEventListener('click', async () => {
    const folderPath = await window.electronAPI.openFolderDialog();
    if (folderPath) {
      document.getElementById('outputFolder').value = folderPath;
    }
  });

  document.getElementById('downloadForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const projectName = document.getElementById('projectName').value;
    const datasetName = document.getElementById('datasetName').value;

    axios.post('http://localhost:5421/download', { projectName, datasetName })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Erro ao iniciar o download:', error);
      });
  });

  document.getElementById('backBtn').addEventListener('click', () => {
    console.log('Botão de voltar clicado'); // Log de depuração
    renderInitialScreen();
  });
}

// Function to fetch project options
function fetchProjectOptions() {
  console.log('Fetching project options...'); // Log de depuração
  axios.get('http://localhost:5421/projects')
    .then(response => {
      console.log('Projects response:', response.data);  // Log de depuração
      const projects = response.data.projects;
      populateDropdown('projectName', projects);
      
      // Oculta o spinner de carregamento
      document.getElementById('loading-spinner').style.display = 'none';
    })
    .catch(error => {
      console.error('Erro ao buscar opções de projetos:', error);
      
      // Oculta o spinner de carregamento em caso de erro
      document.getElementById('loading-spinner').style.display = 'none';
    });
}

// Function to fetch dataset options based on selected project
function fetchDatasetOptions(projectName) {
  console.log(`Fetching datasets for project: ${projectName}`); // Log de depuração
  axios.get(`http://localhost:5421/datasets?project=${encodeURIComponent(projectName)}`)
    .then(response => {
      console.log(`Datasets response for project ${projectName}:`, response.data);  // Log de depuração
      const datasets = response.data.datasets;
      populateDropdown('datasetName', datasets);
    })
    .catch(error => {
      console.error('Erro ao buscar opções de datasets:', error);
    });
}

// Function to populate a dropdown with options
function populateDropdown(dropdownId, options) {
  console.log(`Populating dropdown ${dropdownId} with options:`, options); // Log de depuração
  const dropdown = document.getElementById(dropdownId);
  dropdown.innerHTML = options.map(option => `<option value="${option}">${option}</option>`).join('');
}

module.exports = { renderDownloadScreen };
