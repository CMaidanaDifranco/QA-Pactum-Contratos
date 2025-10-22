const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');
const config = require('../support/config');

// Pasos de configuración para simulación
Given('el servicio de simulación está disponible', async function () {
  this.setBaseUrl(config.baseUrl);
  console.log('📊 Servicio de simulación disponible');
});

Given('tengo datos de simulación válidos', async function () {
  this.setRequestData({
    currency_code: 'USD',
    subsidy: 0,
    merchant_cuit: '30646328450',
    amount: 15000,
    credit_line_id: 451,
    cuit: '30522211563',
    installments: 1,
    periodicity: '180',
    due_date_first_installment: '2026-03-29T17:51:50',
    interest_rate: 7.5,
    fee: 1
  });
  
  // Headers específicos para simulación (sin sobrescribir Authorization)
  this.setHeaders({
    'User-Agent': 'PostmanRuntime/7.49.0',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'trace-id': '58045aa1-a187-4104-a96f-2741fd3a55ad',
    'operation-document-type': 'CUIT',
    'operation-document-number': '30694416159',
    'Cookie': '4ea47a54ebc11dec0d7f9f38a0dbd17b=a9c1b665b0c86819498e02c827174816'
    // No incluir Content-Type aquí para no sobrescribir el del token
  });
  
  console.log('📄 Datos de simulación válidos preparados');
});

Given('tengo datos de simulación inválidos', async function () {
  this.setRequestData({
    currency_code: 'INVALID',
    subsidy: -1,
    merchant_cuit: '00000000000',
    amount: -1000,
    credit_line_id: 999,
    cuit: '00000000000',
    installments: 0,
    periodicity: 'INVALID',
    due_date_first_installment: 'INVALID_DATE',
    interest_rate: -1,
    fee: -1
  });
  
  this.setHeaders({
    'User-Agent': 'PostmanRuntime/7.49.0',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'trace-id': '58045aa1-a187-4104-a96f-2741fd3a55ad',
    'operation-document-type': 'CUIT',
    'operation-document-number': '30694416159',
    'Cookie': '4ea47a54ebc11dec0d7f9f38a0dbd17b=a9c1b665b0c86819498e02c827174816'
  });
  
  console.log('📄 Datos de simulación inválidos preparados');
});

// Pasos de validación de respuesta
Then('la respuesta debería contener datos de simulación válidos', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('currency_code');
  expect(response.body).to.have.property('amount');
  expect(response.body).to.have.property('installments');
  console.log('✅ Datos de simulación válidos recibidos');
});

Then('la respuesta debería contener información de cuotas', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('installments');
  expect(response.body.installments).to.be.a('number');
  expect(response.body.installments).to.be.greaterThan(0);
  console.log(`✅ Información de cuotas recibida: ${response.body.installments}`);
});

Then('la respuesta debería contener información de intereses', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('interest_rate');
  expect(response.body.interest_rate).to.be.a('number');
  expect(response.body.interest_rate).to.be.greaterThan(0);
  console.log(`✅ Información de intereses recibida: ${response.body.interest_rate}%`);
});

Then('la respuesta debería contener el campo currency_code', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('currency_code');
  expect(response.body.currency_code).to.be.a('string');
  console.log(`✅ Campo currency_code presente: ${response.body.currency_code}`);
});

Then('la respuesta debería contener el campo amount', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('amount');
  expect(response.body.amount).to.be.a('number');
  console.log(`✅ Campo amount presente: ${response.body.amount}`);
});

Then('la respuesta debería contener el campo installments', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('installments');
  expect(response.body.installments).to.be.a('number');
  console.log(`✅ Campo installments presente: ${response.body.installments}`);
});

Then('la respuesta debería contener el campo interest_rate', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('interest_rate');
  expect(response.body.interest_rate).to.be.a('number');
  console.log(`✅ Campo interest_rate presente: ${response.body.interest_rate}`);
});

Then('la respuesta debería contener el campo total_amount', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('total_amount');
  expect(response.body.total_amount).to.be.a('number');
  console.log(`✅ Campo total_amount presente: ${response.body.total_amount}`);
});

// Pasos de código de estado y rendimiento (reutilizados desde auth_steps.js)
// Nota: Estos pasos están definidos en auth_steps.js para evitar duplicación
// Paso de mensaje de error (reutilizado desde auth_steps.js)
// Nota: Este paso está definido en auth_steps.js para evitar duplicación
