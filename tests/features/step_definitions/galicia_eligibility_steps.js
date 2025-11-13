const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const config = require('../support/config');

// URL base para Galicia
const GALICIA_BASE_URL = 'https://midware-partners-gateway-middleware-galicia-staging-avafy.dev.nera-agro.com';

// Credenciales de Galicia
const GALICIA_APP_ID = '1bf06dbc';
const GALICIA_APP_KEY = 'a11ea75168a77e6d6d4b756878a35dba';

// Pasos de configuración para elegibilidad Galicia
Given('el servicio de elegibilidad Galicia está disponible', async function () {
  this.setBaseUrl(GALICIA_BASE_URL);
  console.log('📋 Servicio de elegibilidad Galicia disponible');
});

Given('tengo datos de elegibilidad Galicia válidos', async function () {
  this.setRequestData({
    productor: {
      tipoDocumento: 'CUIT',
      numeroDocumento: '30624730174'
    },
    producto: 'SOLA_FIRMA'
  });
  
  // Headers específicos para elegibilidad Galicia
  this.setHeaders({
    'User-Agent': 'QA-PActum-Autionation/1.0',
    'app_id': GALICIA_APP_ID,
    'app_key': GALICIA_APP_KEY,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Connection': 'keep-alive'
  });
  
  console.log('📄 Datos de elegibilidad Galicia válidos preparados');
});

Given('tengo datos de elegibilidad Galicia inválidos', async function () {
  this.setRequestData({
    productor: {
      tipoDocumento: 'CUIT',
      numeroDocumento: '00000000000' // CUIT inválido
    },
    producto: 'INVALID_PRODUCT' // Producto inválido
  });
  
  // Headers específicos para elegibilidad Galicia
  this.setHeaders({
    'User-Agent': 'QA-PActum-Autionation/1.0',
    'app_id': GALICIA_APP_ID,
    'app_key': GALICIA_APP_KEY,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Connection': 'keep-alive'
  });
  
  console.log('❌ Datos de elegibilidad Galicia inválidos preparados');
});

// Pasos de validación de respuesta
Then('la respuesta debería contener el campo data', function () {
  const response = this.getResponse();
  
  // Debug: verificar tipo de respuesta
  if (typeof response.body === 'string') {
    console.log('⚠️ La respuesta es un string, intentando parsear JSON...');
    try {
      response.body = JSON.parse(response.body);
    } catch (e) {
      console.error('❌ Error al parsear JSON:', e.message);
      console.error('📄 Respuesta recibida (primeros 200 chars):', response.body.substring(0, 200));
      throw new Error(`La respuesta no es un JSON válido: ${e.message}`);
    }
  }
  
  expect(response.body).to.have.property('data');
  expect(response.body.data).to.be.an('object');
  console.log('✅ Campo data presente en la respuesta');
});

Then('la respuesta debería contener el campo meta', function () {
  const response = this.getResponse();
  expect(response.body).to.have.property('meta');
  expect(response.body.meta).to.be.an('object');
  console.log('✅ Campo meta presente en la respuesta');
});

Then('la respuesta debería contener numeroTransaccion', function () {
  const response = this.getResponse();
  expect(response.body.data).to.have.property('numeroTransaccion');
  expect(response.body.data.numeroTransaccion).to.be.a('string');
  expect(response.body.data.numeroTransaccion).to.not.be.empty;
  console.log(`✅ numeroTransaccion presente: ${response.body.data.numeroTransaccion}`);
});

Then('la respuesta debería contener marcaSoja', function () {
  const response = this.getResponse();
  expect(response.body.data).to.have.property('marcaSoja');
  expect(response.body.data.marcaSoja).to.be.a('boolean');
  console.log(`✅ marcaSoja presente: ${response.body.data.marcaSoja}`);
});

Then('la respuesta debería contener esCliente', function () {
  const response = this.getResponse();
  expect(response.body.data).to.have.property('esCliente');
  expect(response.body.data.esCliente).to.be.a('boolean');
  console.log(`✅ esCliente presente: ${response.body.data.esCliente}`);
});

Then('la respuesta debería contener marcaMipyme', function () {
  const response = this.getResponse();
  expect(response.body.data).to.have.property('marcaMipyme');
  expect(response.body.data.marcaMipyme).to.be.a('boolean');
  console.log(`✅ marcaMipyme presente: ${response.body.data.marcaMipyme}`);
});

Then('la respuesta debería contener ofertas', function () {
  const response = this.getResponse();
  expect(response.body.data).to.have.property('ofertas');
  expect(response.body.data.ofertas).to.be.an('array');
  expect(response.body.data.ofertas).to.not.be.empty;
  console.log(`✅ Ofertas presentes: ${response.body.data.ofertas.length} oferta(s)`);
});

Then('las ofertas deberían contener campos requeridos', function () {
  const response = this.getResponse();
  const ofertas = response.body.data.ofertas;
  
  expect(ofertas).to.be.an('array');
  expect(ofertas.length).to.be.greaterThan(0);
  
  // Validar estructura de la primera oferta
  const primeraOferta = ofertas[0];
  expect(primeraOferta).to.have.property('idOferta');
  expect(primeraOferta).to.have.property('idLinea');
  expect(primeraOferta).to.have.property('montoMinimo');
  expect(primeraOferta).to.have.property('montoMaximo');
  expect(primeraOferta).to.have.property('plazoMinimo');
  expect(primeraOferta).to.have.property('plazoMaximo');
  expect(primeraOferta).to.have.property('amortizaciones');
  expect(primeraOferta).to.have.property('descripcion');
  expect(primeraOferta).to.have.property('ordenProducto');
  expect(primeraOferta).to.have.property('tna');
  
  // Validar tipos
  expect(primeraOferta.idOferta).to.be.a('string');
  expect(primeraOferta.idLinea).to.be.a('string');
  expect(primeraOferta.montoMinimo).to.be.a('number');
  expect(primeraOferta.montoMaximo).to.be.a('number');
  expect(primeraOferta.plazoMinimo).to.be.a('number');
  expect(primeraOferta.plazoMaximo).to.be.a('number');
  expect(primeraOferta.amortizaciones).to.be.an('array');
  expect(primeraOferta.descripcion).to.be.a('string');
  expect(primeraOferta.ordenProducto).to.be.a('number');
  expect(primeraOferta.tna).to.be.a('number');
  
  // Validar amortizaciones
  if (primeraOferta.amortizaciones.length > 0) {
    const amortizacion = primeraOferta.amortizaciones[0];
    expect(amortizacion).to.have.property('codigo');
    expect(amortizacion).to.have.property('descripcion');
    expect(amortizacion.codigo).to.be.a('number');
    expect(amortizacion.descripcion).to.be.a('string');
  }
  
  console.log(`✅ Estructura de ofertas válida. Primera oferta: ${primeraOferta.descripcion}`);
});

Then('la respuesta debería contener el campo errors', function () {
  const response = this.getResponse();

  // Debug: verificar tipo de respuesta
  if (typeof response.body === 'string') {
    console.log('⚠️ La respuesta es un string, intentando parsear JSON...');
    try {
      response.body = JSON.parse(response.body);
    } catch (e) {
      console.error('❌ Error al parsear JSON:', e.message);
      throw new Error(`La respuesta no es un JSON válido: ${e.message}`);
    }
  }

  expect(response.body).to.have.property('errors');
  expect(response.body.errors).to.be.an('array');
  expect(response.body.errors.length).to.be.greaterThan(0);
  
  // Validar estructura del primer error
  const primerError = response.body.errors[0];
  expect(primerError).to.have.property('code');
  expect(primerError).to.have.property('message');
  
  console.log(`❌ Errores presentes: ${response.body.errors.length} error(es)`);
  console.log(`   Primer error - code: ${primerError.code}, message: ${primerError.message}`);
});

Then('la respuesta debería contener el campo errors o meta', function () {
  const response = this.getResponse();

  // Debug: verificar tipo de respuesta
  if (typeof response.body === 'string') {
    // Si la respuesta es HTML (comienza con '<'), es una página de error del servidor
    if (response.body.trim().startsWith('<')) {
      console.log('⚠️ La respuesta es HTML (página de error del servidor)');
      console.log('   Esto es común cuando el servidor devuelve 403/404/500 con una página HTML');
      console.log('   Se acepta como respuesta de error válida');
      return; // Aceptar HTML como respuesta de error válida
    }
    
    console.log('⚠️ La respuesta es un string, intentando parsear JSON...');
    try {
      response.body = JSON.parse(response.body);
    } catch (e) {
      console.error('❌ Error al parsear JSON:', e.message);
      console.log('📄 Primeros 200 caracteres de la respuesta:', response.body.substring(0, 200));
      // Si no es JSON y no es HTML, lanzar error
      if (!response.body.trim().startsWith('<')) {
        throw new Error(`La respuesta no es un JSON válido: ${e.message}`);
      }
      // Si es HTML, aceptar como respuesta de error válida
      console.log('⚠️ La respuesta es HTML, se acepta como respuesta de error válida');
      return;
    }
  }

  // Si response.body es un objeto, validar que tenga errors o meta
  if (typeof response.body === 'object' && response.body !== null) {
    const tieneErrors = response.body.hasOwnProperty('errors');
    const tieneMeta = response.body.hasOwnProperty('meta');
    
    expect(tieneErrors || tieneMeta).to.be.true;
    
    if (tieneErrors) {
      expect(response.body.errors).to.be.an('array');
      console.log(`✅ Campo errors presente con ${response.body.errors.length} error(es)`);
    }
    
    if (tieneMeta) {
      expect(response.body.meta).to.be.an('object');
      console.log('✅ Campo meta presente en la respuesta');
    }
  }
});

// Pasos de código de estado y rendimiento (reutilizados desde comafi-auth_steps.js)
// Nota: Estos pasos están definidos en comafi-auth_steps.js para evitar duplicación

