const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

// Pasos comunes de API
Given('tengo un token de acceso válido', async function () {
  // Primero intenta obtener el token del contexto actual
  let accessToken = this.getAccessToken();
  
  // Si no hay token en el contexto, intenta leerlo del archivo temporal
  if (!accessToken) {
    const fs = require('fs');
    const path = require('path');
    const tokenFile = path.join(__dirname, '../../temp_token.txt');
    
    try {
      if (fs.existsSync(tokenFile)) {
        accessToken = fs.readFileSync(tokenFile, 'utf8').trim();
        console.log('🔑 Token de acceso leído desde archivo temporal');
      }
    } catch (error) {
      console.log('⚠️ No se pudo leer el token del archivo temporal');
    }
  }
  
  if (!accessToken) {
    throw new Error('No hay token de acceso disponible. Por favor ejecute primero los escenarios de autenticación.');
  }
  
  this.setHeaders({
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  });
  console.log('🔑 Token de acceso válido configurado');
});

Given('el servicio de contratos está disponible', async function () {
  console.log('📋 Servicio de contratos disponible');
});

Given('tengo datos de contrato', async function () {
  this.setRequestData({
    contract: {
      title: 'Contrato de Prueba',
      description: 'Descripción del contrato de prueba',
      amount: 1000,
      currency: 'USD',
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    }
  });
  console.log('📄 Datos del contrato preparados');
});

Given('tengo un contrato existente', async function () {
  // En un escenario real, esto crearía o obtendría un contrato existente
  this.setRequestData({
    contractId: 'test-contract-123'
  });
  console.log('📋 Contrato existente referenciado');
});

Given('tengo datos de contrato actualizados', async function () {
  this.setRequestData({
    updatedContract: {
      title: 'Contrato de Prueba Actualizado',
      description: 'Descripción actualizada del contrato de prueba',
      amount: 1500,
      currency: 'USD',
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    }
  });
  console.log('📝 Datos del contrato actualizado preparados');
});

// Pasos de solicitudes HTTP
When('envío una petición GET a {string}', async function (endpoint) {
  const response = await this.makeRequest('GET', endpoint);
  this.setResponse(response);
  console.log(`📤 Solicitud GET enviada a ${endpoint}`);
});

When('envío una petición POST a {string}', async function (endpoint) {
  const requestData = this.context.requestData;
  const response = await this.makeRequest('POST', endpoint, {
    json: requestData.contract || requestData
  });
  this.setResponse(response);
  console.log(`📤 Solicitud POST enviada a ${endpoint}`);
});

When('envío una petición PUT a {string}', async function (endpoint) {
  const contractId = this.context.requestData.contractId;
  const updatedEndpoint = endpoint.replace('{contractId}', contractId);
  const requestData = this.context.requestData;
  
  const response = await this.makeRequest('PUT', updatedEndpoint, {
    json: requestData.updatedContract || requestData
  });
  this.setResponse(response);
  console.log(`📤 Solicitud PUT enviada a ${updatedEndpoint}`);
});

When('envío una petición DELETE a {string}', async function (endpoint) {
  const contractId = this.context.requestData.contractId;
  const updatedEndpoint = endpoint.replace('{contractId}', contractId);
  
  const response = await this.makeRequest('DELETE', updatedEndpoint);
  this.setResponse(response);
  console.log(`📤 Solicitud DELETE enviada a ${updatedEndpoint}`);
});

// Pasos de validación de respuesta
Then('la respuesta debería contener una lista de contratos', function () {
  const response = this.getResponse();
  expect(response.body).to.be.an('array');
  console.log(`📋 Se encontraron ${response.body.length} contratos`);
});

Then('la respuesta debería contener el contrato creado', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('id');
  expect(response.body).to.have.property('title');
  console.log('✅ Contrato creado recibido');
});

Then('la respuesta debería contener el contrato actualizado', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('id');
  expect(response.body).to.have.property('title');
  console.log('✅ Contrato actualizado recibido');
});

// Pasos de código de estado (reutilizados desde auth_steps.js)
// Nota: Este paso está definido en auth_steps.js para evitar duplicación
