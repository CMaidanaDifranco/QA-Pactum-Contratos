const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');
const config = require('../support/config');

// Pasos de autenticación
Given('el servicio de autenticación está disponible', async function () {
  this.setBaseUrl(config.baseUrl);
  console.log('🔐 Servicio de autenticación disponible');
});

Given('tengo credenciales de cliente válidas', async function () {
  this.setHeaders({
    'User-Agent': 'NeraApis',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': config.auth.authHeader,
    'Cookie': '4ea47a54ebc11dec0d7f9f38a0dbd17b=3651fc6cc67025843ea6ed311404872c; 99b47315582a09f5cfd4f2a7c0ac7a2f=1eb1ed87a6bfcdf28757e5e6c05788cd'
  });
  this.setRequestData({
    grant_type: 'client_credentials'
  });
  console.log('✅ Credenciales válidas configuradas');
});

Given('tengo credenciales de cliente inválidas', async function () {
  this.setHeaders({
    'User-Agent': 'NeraApis',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic invalid_credentials',
    'Cookie': 'invalid_cookie'
  });
  this.setRequestData({
    grant_type: 'client_credentials'
  });
  console.log('❌ Credenciales inválidas configuradas');
});

When('envío una petición POST al endpoint de autenticación', async function () {
  const response = await this.makeRequest('POST', config.auth.tokenEndpoint, {
    body: 'grant_type=client_credentials'
  });
  this.setResponse(response);
  console.log('📤 Solicitud de autenticación enviada');
});

Then('debería recibir un código de estado {int}', function (expectedStatusCode) {
  expect(this.getResponse().statusCode).to.equal(expectedStatusCode);
  console.log(`✅ Código de estado ${expectedStatusCode} recibido`);
});

Then('la respuesta debería contener un token de acceso válido', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('access_token');
  expect(response.body.access_token).to.be.a('string');
  expect(response.body.access_token).to.not.be.empty;
  console.log('✅ Token de acceso válido recibido');
});

Then('la respuesta debería contener un access_token', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('access_token');
  expect(response.body.access_token).to.be.a('string');
  expect(response.body.access_token).to.not.be.empty;
  console.log('✅ Token de acceso presente en la respuesta');
});

Then('la respuesta debería contener expires_in con valor {int}', function (expectedValue) {
  const response = this.getResponse();
  expect(response.body).to.have.property('expires_in');
  expect(response.body.expires_in).to.equal(expectedValue);
  console.log(`✅ expires_in es ${expectedValue}`);
});

Then('la respuesta debería contener token_type con valor {string}', function (expectedValue) {
  const response = this.getResponse();
  expect(response.body).to.have.property('token_type');
  expect(response.body.token_type).to.equal(expectedValue);
  console.log(`✅ token_type es "${expectedValue}"`);
});

Then('la respuesta debería contener scope con valor {string}', function (expectedValue) {
  const response = this.getResponse();
  expect(response.body).to.have.property('scope');
  expect(response.body.scope).to.equal(expectedValue);
  console.log(`✅ scope es "${expectedValue}"`);
});

Then('debería guardar el token de acceso para uso futuro', function () {
  const response = this.getResponse();
  const accessToken = response.body.access_token;
  this.setAccessToken(accessToken);
  
  // También guardar en archivo temporal para uso entre ejecuciones
  const fs = require('fs');
  const path = require('path');
  const tokenFile = path.join(__dirname, '../../temp_token.txt');
  
  try {
    fs.writeFileSync(tokenFile, accessToken, 'utf8');
    console.log('💾 Token de acceso guardado para uso futuro (archivo temporal)');
  } catch (error) {
    console.log('⚠️ No se pudo guardar el token en archivo temporal:', error.message);
  }
});

Then('la respuesta debería contener un mensaje de error', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('error');
  expect(response.body.error).to.be.a('string');
  console.log('❌ Mensaje de error recibido:', response.body.error);
});

Then('el tiempo de respuesta debería ser menor a {int} segundos', function (maxSeconds) {
  const response = this.getResponse();
  const responseTime = response.responseTime || 0;
  expect(responseTime).to.be.lessThan(maxSeconds * 1000);
  console.log(`⏱️ Tiempo de respuesta: ${responseTime}ms (máximo: ${maxSeconds}s)`);
});
