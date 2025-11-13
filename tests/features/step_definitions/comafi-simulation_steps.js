const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const config = require('../support/config');

// Pasos de configuración para simulación Comafi
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
    'User-Agent': 'QA-PActum-Autionation/1.0',
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
    'User-Agent': 'QA-PActum-Autionation/1.0',
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
  expect(response.body).to.have.property('id_simulation');
  expect(response.body).to.have.property('total_amount');
  expect(response.body).to.have.property('credit_net_amount');
  console.log('✅ Datos de simulación válidos recibidos');
});

Then('la respuesta debería contener información de cuotas', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('installments');
  expect(response.body.installments).to.be.a('string');
  expect(response.body.installments).to.not.be.empty;
  console.log(`✅ Información de cuotas recibida: ${response.body.installments}`);
});

Then('la respuesta debería contener información de intereses', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('tna');
  expect(response.body).to.have.property('tea');
  expect(response.body).to.have.property('tem');
  expect(response.body.tna).to.be.a('number');
  expect(response.body.tea).to.be.a('number');
  expect(response.body.tem).to.be.a('number');
  console.log(`✅ Información de intereses recibida - TNA: ${response.body.tna}%, TEA: ${response.body.tea}%, TEM: ${response.body.tem}%`);
});

Then('la respuesta debería contener información de montos', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('credit_net_amount');
  expect(response.body).to.have.property('total_amount');
  expect(response.body).to.have.property('total_interest_amount');
  expect(response.body).to.have.property('total_fee_amount');
  expect(response.body.credit_net_amount).to.be.a('number');
  expect(response.body.total_amount).to.be.a('number');
  console.log(`✅ Información de montos recibida - Neto: $${response.body.credit_net_amount}, Total: $${response.body.total_amount}`);
});

Then('la respuesta debería contener el campo id_simulation', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('id_simulation');
  expect(response.body.id_simulation).to.be.a('string');
  expect(response.body.id_simulation).to.not.be.empty;
  console.log(`✅ Campo id_simulation presente: ${response.body.id_simulation}`);
});

Then('la respuesta debería contener el campo selected_account', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('selected_account');
  expect(response.body.selected_account).to.be.a('string');
  expect(response.body.selected_account).to.not.be.empty;
  console.log(`✅ Campo selected_account presente: ${response.body.selected_account}`);
});

Then('la respuesta debería contener el campo cft', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('cft');
  expect(response.body.cft).to.be.a('number');
  expect(response.body.cft).to.be.greaterThan(0);
  console.log(`✅ Campo cft presente: ${response.body.cft}%`);
});

Then('la respuesta debería contener el campo tna', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('tna');
  expect(response.body.tna).to.be.a('number');
  expect(response.body.tna).to.be.greaterThan(0);
  console.log(`✅ Campo tna presente: ${response.body.tna}%`);
});

Then('la respuesta debería contener el campo tea', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('tea');
  expect(response.body.tea).to.be.a('number');
  expect(response.body.tea).to.be.greaterThan(0);
  console.log(`✅ Campo tea presente: ${response.body.tea}%`);
});

Then('la respuesta debería contener el campo credit_net_amount', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('credit_net_amount');
  expect(response.body.credit_net_amount).to.be.a('number');
  expect(response.body.credit_net_amount).to.be.greaterThan(0);
  console.log(`✅ Campo credit_net_amount presente: $${response.body.credit_net_amount}`);
});

Then('la respuesta debería contener el campo total_amount', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('total_amount');
  expect(response.body.total_amount).to.be.a('number');
  expect(response.body.total_amount).to.be.greaterThan(0);
  console.log(`✅ Campo total_amount presente: $${response.body.total_amount}`);
});

Then('la respuesta debería contener el campo installments_details', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('installments_details');
  expect(response.body.installments_details).to.be.an('array');
  expect(response.body.installments_details).to.not.be.empty;
  console.log(`✅ Campo installments_details presente con ${response.body.installments_details.length} cuota(s)`);
});

// Pasos de código de estado y rendimiento (reutilizados desde comafi-auth_steps.js)
// Nota: Estos pasos están definidos en comafi-auth_steps.js para evitar duplicación
// Paso de mensaje de error (reutilizado desde comafi-auth_steps.js)
// Nota: Este paso está definido en comafi-auth_steps.js para evitar duplicación

