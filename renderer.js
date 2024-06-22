const axios = require('axios');

document.getElementById('downloadBtn').addEventListener('click', () => {
  document.getElementById('content').innerHTML = `
    <h2>Tela de Download</h2>
    <input type="text" id="projectName" placeholder="Nome do Projeto">
    <input type="text" id="datasetName" placeholder="Nome do Dataset">
    <button id="startDownload">Iniciar Download</button>
  `;

  document.getElementById('startDownload').addEventListener('click', () => {
    const projectName = document.getElementById('projectName').value;
    const datasetName = document.getElementById('datasetName').value;

    axios.post('http://localhost:5000/download', { projectName, datasetName })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Erro ao iniciar o download:', error);
      });
  });
});

document.getElementById('uploadBtn').addEventListener('click', () => {
  document.getElementById('content').innerHTML = `
    <h2>Tela de Upload</h2>
    <input type="text" id="projectName" placeholder="Nome do Projeto">
    <input type="text" id="datasetName" placeholder="Nome do Dataset">
    <button id="startUpload">Iniciar Upload</button>
  `;

  document.getElementById('startUpload').addEventListener('click', () => {
    const projectName = document.getElementById('projectName').value;
    const datasetName = document.getElementById('datasetName').value;

    axios.post('http://localhost:5000/upload', { projectName, datasetName })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Erro ao iniciar o upload:', error);
      });
  });
});

document.getElementById('welcomeBtn').addEventListener('click', () => {
  document.getElementById('content').innerHTML = `<p>Bem-vindo à aplicação!</p>`;
});
