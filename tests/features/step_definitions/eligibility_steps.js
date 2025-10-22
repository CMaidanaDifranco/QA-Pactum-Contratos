const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');
const config = require('../support/config');

// Pasos de configuración para elegibilidad
Given('el servicio de elegibilidad está disponible', async function () {
  this.setBaseUrl(config.baseUrl);
  console.log('📋 Servicio de elegibilidad disponible');
});

Given('tengo datos de elegibilidad válidos', async function () {
  this.setRequestData({
    eligibility: {
      cuit: '30522211563',
      credit_line_id: 441,
      merchant_cuit: '30646328450'
    }
  });
  
  // Headers específicos para elegibilidad (sin sobrescribir Authorization)
  this.setHeaders({
    'trace-id': '58045aa1-a187-4104-a96f-2741fd3a55ad',
    'operation-document-type': 'CUIT',
    'operation-document-number': '30694416159',
    'Cookie': '4ea47a54ebc11dec0d7f9f38a0dbd17b=a9c1b665b0c86819498e02c827174816; 99b47315582a09f5cfd4f2a7c0ac7a2f=1eb1ed87a6bfcdf28757e5e6c05788cd; c293250d08af1e295f35ccff9a73f7a6=1ff2794b3c02cac96dcdc3066d1ac1a7'
    // No incluir Content-Type aquí para no sobrescribir el del token
  });
  
  console.log('📄 Datos de elegibilidad válidos preparados');
});

Given('tengo datos de elegibilidad inválidos', async function () {
  this.setRequestData({
    eligibility: {
      cuit: '00000000000', // CUIT inválido
      credit_line_id: 999, // ID de línea de crédito inválido
      merchant_cuit: '00000000000' // CUIT de comerciante inválido
    }
  });
  
  // Headers específicos para elegibilidad
  this.setHeaders({
    'trace-id': '58045aa1-a187-4104-a96f-2741fd3a55ad',
    'operation-document-type': 'CUIT',
    'operation-document-number': '30694416159',
    'Content-Type': 'application/json'
  });
  
  console.log('❌ Datos de elegibilidad inválidos preparados');
});

// Pasos de validación de respuesta
Then('la respuesta debería contener elegibilidad aprobada', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('eligibility');
  expect(response.body.eligibility).to.equal('APPROVED');
  console.log('✅ Elegibilidad aprobada recibida');
});

Then('la respuesta debería contener is_eligible como true', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('is_eligible');
  expect(response.body.is_eligible).to.be.true;
  console.log('✅ is_eligible es true');
});

Then('la respuesta debería contener un mensaje amigable', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('friendly_message');
  expect(response.body.friendly_message).to.be.a('string');
  expect(response.body.friendly_message).to.not.be.empty;
  console.log('✅ Mensaje amigable recibido:', response.body.friendly_message);
});

// Paso de mensaje de error (reutilizado desde auth_steps.js)
// Nota: Este paso está definido en auth_steps.js para evitar duplicación

Then('la respuesta debería contener el campo eligibility', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('eligibility');
  expect(response.body.eligibility).to.be.a('string');
  console.log('✅ Campo eligibility presente');
});

Then('la respuesta debería contener el campo is_eligible', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('is_eligible');
  expect(response.body.is_eligible).to.be.a('boolean');
  console.log('✅ Campo is_eligible presente');
});

Then('la respuesta debería contener el campo friendly_message', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('friendly_message');
  expect(response.body.friendly_message).to.be.a('string');
  console.log('✅ Campo friendly_message presente');
});

Then('la respuesta debería contener el campo reasons', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('reasons');
  console.log('✅ Campo reasons presente');
});

// Pasos de código de estado y rendimiento (reutilizados desde auth_steps.js)
// Nota: Estos pasos están definidos en auth_steps.js para evitar duplicación
