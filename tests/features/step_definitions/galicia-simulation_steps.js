const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const config = require('../support/config');

// URL base para Galicia
const GALICIA_BASE_URL = 'https://midware-partners-gateway-middleware-galicia-staging-avafy.dev.nera-agro.com';

// Credenciales de Galicia
const GALICIA_APP_ID = '1bf06dbc';
const GALICIA_APP_KEY = 'a11ea75168a77e6d6d4b756878a35dba';

// Pasos de configuración para simulación Galicia
Given('el servicio de simulación Galicia está disponible', async function () {
  this.setBaseUrl(GALICIA_BASE_URL);
  console.log('📊 Servicio de simulación Galicia disponible');
});

Given('tengo datos de simulación Galicia válidos', async function () {
  this.setRequestData({
    condicionesComerciales: {
      periodoCapital: 6,
      subsidio: 0,
      tna: 3,
      comision: 1.8,
      periodoInteres: 6,
      cantidadCuotas: 1,
      amortizacion: 'AMERICANO'
    },
    idLinea: '868d31c8-7d6c-43cc-8c5d-494eac523936',
    monto: 12000,
    numeroTransaccion: '753216f5-edad-4d24-8eee-038356c6d3aa',
    idOferta: '76e4fd47-3f03-40b1-8cba-cbfeac3dae54',
    proveedor: {
      tipoDocumento: 'CUIT',
      cuenta: {
        tipo: 'CC',
        numero: '006309061442',
        cbu: '0070144620000063090626',
        moneda: 'ARS'
      },
      numeroDocumento: '30503508725'
    },
    productor: {
      tipoDocumento: 'CUIT',
      cuenta: {
        tipo: 'CC',
        numero: '000340501765',
        cbu: '0070176720000003405059',
        moneda: 'ARS'
      },
      numeroDocumento: '30624730174'
    },
    tipoOperacion: 'INSUMOS'
  });
  
  // Headers específicos para simulación Galicia
  this.setHeaders({
    'User-Agent': 'QA-PActum-Autionation/1.0',
    'app_id': GALICIA_APP_ID,
    'app_key': GALICIA_APP_KEY,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Connection': 'keep-alive'
  });
  
  console.log('📄 Datos de simulación Galicia válidos preparados');
});

Given('tengo datos de simulación Galicia inválidos', async function () {
  this.setRequestData({
    condicionesComerciales: {
      periodoCapital: -1, // Inválido
      subsidio: -1, // Inválido
      tna: -1, // Inválido
      comision: -1, // Inválido
      periodoInteres: -1, // Inválido
      cantidadCuotas: 0, // Inválido
      amortizacion: 'INVALID' // Inválido
    },
    idLinea: '00000000-0000-0000-0000-000000000000', // Inválido
    monto: -1000, // Inválido
    numeroTransaccion: 'invalid-transaction-id', // Inválido
    idOferta: '00000000-0000-0000-0000-000000000000', // Inválido
    proveedor: {
      tipoDocumento: 'INVALID',
      cuenta: {
        tipo: 'INVALID',
        numero: '000000000000',
        cbu: '0000000000000000000000',
        moneda: 'INVALID'
      },
      numeroDocumento: '00000000000' // CUIT inválido
    },
    productor: {
      tipoDocumento: 'INVALID',
      cuenta: {
        tipo: 'INVALID',
        numero: '000000000000',
        cbu: '0000000000000000000000',
        moneda: 'INVALID'
      },
      numeroDocumento: '00000000000' // CUIT inválido
    },
    tipoOperacion: 'INVALID'
  });
  
  // Headers específicos para simulación Galicia
  this.setHeaders({
    'User-Agent': 'QA-PActum-Autionation/1.0',
    'app_id': GALICIA_APP_ID,
    'app_key': GALICIA_APP_KEY,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Connection': 'keep-alive'
  });
  
  console.log('❌ Datos de simulación Galicia inválidos preparados');
});

// Pasos de validación de respuesta
// Nota: Los pasos "la respuesta debería contener el campo meta" y "la respuesta debería contener el campo data"
// están definidos en galicia_eligibility_steps.js para evitar duplicación

Then('la respuesta debería contener numeroTransaccion en data', function () {
  const response = this.getResponse();
  expect(response.body.data).to.have.property('numeroTransaccion');
  expect(response.body.data.numeroTransaccion).to.be.a('string');
  expect(response.body.data.numeroTransaccion).to.not.be.empty;
  console.log(`✅ numeroTransaccion presente: ${response.body.data.numeroTransaccion}`);
});

Then('la respuesta debería contener idOferta en data', function () {
  const response = this.getResponse();
  expect(response.body.data).to.have.property('idOferta');
  expect(response.body.data.idOferta).to.be.a('string');
  expect(response.body.data.idOferta).to.not.be.empty;
  console.log(`✅ idOferta presente: ${response.body.data.idOferta}`);
});

Then('la respuesta debería contener idLinea en data', function () {
  const response = this.getResponse();
  expect(response.body.data).to.have.property('idLinea');
  expect(response.body.data.idLinea).to.be.a('string');
  expect(response.body.data.idLinea).to.not.be.empty;
  console.log(`✅ idLinea presente: ${response.body.data.idLinea}`);
});

Then('la respuesta debería contener datosFinancieros en data', function () {
  const response = this.getResponse();
  expect(response.body.data).to.have.property('datosFinancieros');
  expect(response.body.data.datosFinancieros).to.be.an('object');
  console.log('✅ Campo datosFinancieros presente en data');
});

Then('los datosFinancieros deberían contener campos requeridos', function () {
  const response = this.getResponse();
  const datosFinancieros = response.body.data.datosFinancieros;
  
  // Validar campos requeridos
  expect(datosFinancieros).to.have.property('cft');
  expect(datosFinancieros).to.have.property('cftSinIVA');
  expect(datosFinancieros).to.have.property('tem');
  expect(datosFinancieros).to.have.property('tea');
  expect(datosFinancieros).to.have.property('tna');
  expect(datosFinancieros).to.have.property('montoCredito');
  expect(datosFinancieros).to.have.property('cantidadCuotas');
  expect(datosFinancieros).to.have.property('cuotaPromedio');
  expect(datosFinancieros).to.have.property('subsidio');
  expect(datosFinancieros).to.have.property('montoSubsidio');
  
  // Validar tipos
  expect(datosFinancieros.cft).to.be.a('number');
  expect(datosFinancieros.cftSinIVA).to.be.a('number');
  expect(datosFinancieros.tem).to.be.a('number');
  expect(datosFinancieros.tea).to.be.a('number');
  expect(datosFinancieros.tna).to.be.a('number');
  expect(datosFinancieros.montoCredito).to.be.a('number');
  expect(datosFinancieros.cantidadCuotas).to.be.a('number');
  expect(datosFinancieros.cuotaPromedio).to.be.a('number');
  expect(datosFinancieros.subsidio).to.be.a('number');
  expect(datosFinancieros.montoSubsidio).to.be.a('number');
  
  // Validar valores positivos
  expect(datosFinancieros.montoCredito).to.be.greaterThan(0);
  expect(datosFinancieros.cantidadCuotas).to.be.greaterThan(0);
  expect(datosFinancieros.cuotaPromedio).to.be.greaterThan(0);
  
  console.log(`✅ Estructura de datosFinancieros válida`);
  console.log(`   CFT: ${datosFinancieros.cft}%, TNA: ${datosFinancieros.tna}%, TEA: ${datosFinancieros.tea}%`);
  console.log(`   Monto crédito: $${datosFinancieros.montoCredito}, Cuotas: ${datosFinancieros.cantidadCuotas}, Cuota promedio: $${datosFinancieros.cuotaPromedio}`);
});

Then('la respuesta debería contener cuotas en data', function () {
  const response = this.getResponse();
  expect(response.body.data).to.have.property('cuotas');
  expect(response.body.data.cuotas).to.be.an('array');
  expect(response.body.data.cuotas).to.not.be.empty;
  console.log(`✅ Cuotas presentes: ${response.body.data.cuotas.length} cuota(s)`);
});

Then('las cuotas deberían contener campos requeridos', function () {
  const response = this.getResponse();
  const cuotas = response.body.data.cuotas;
  
  expect(cuotas).to.be.an('array');
  expect(cuotas.length).to.be.greaterThan(0);
  
  // Validar estructura de la primera cuota
  const primeraCuota = cuotas[0];
  expect(primeraCuota).to.have.property('numero');
  expect(primeraCuota).to.have.property('fechaVencimiento');
  expect(primeraCuota).to.have.property('monto');
  expect(primeraCuota).to.have.property('amortizacion');
  expect(primeraCuota).to.have.property('interesNominal');
  expect(primeraCuota).to.have.property('ivaInteresNominal');
  expect(primeraCuota).to.have.property('ivaPercepcion');
  expect(primeraCuota).to.have.property('sellos');
  
  // Validar tipos
  expect(primeraCuota.numero).to.be.a('number');
  expect(primeraCuota.fechaVencimiento).to.be.a('string');
  expect(primeraCuota.monto).to.be.a('number');
  expect(primeraCuota.amortizacion).to.be.a('number');
  expect(primeraCuota.interesNominal).to.be.a('number');
  expect(primeraCuota.ivaInteresNominal).to.be.a('number');
  expect(primeraCuota.ivaPercepcion).to.be.a('number');
  expect(primeraCuota.sellos).to.be.a('number');
  
  // Validar valores
  expect(primeraCuota.numero).to.be.greaterThan(0);
  expect(primeraCuota.monto).to.be.greaterThan(0);
  expect(primeraCuota.fechaVencimiento).to.not.be.empty;
  
  console.log(`✅ Estructura de cuotas válida. Primera cuota:`);
  console.log(`   Número: ${primeraCuota.numero}, Fecha vencimiento: ${primeraCuota.fechaVencimiento}`);
  console.log(`   Monto: $${primeraCuota.monto}, Amortización: $${primeraCuota.amortizacion}`);
  console.log(`   Interés nominal: $${primeraCuota.interesNominal}, IVA interés: $${primeraCuota.ivaInteresNominal}`);
});

// Pasos de validación de errores
// Nota: El paso "la respuesta debería contener el campo errors o meta" está definido
// en galicia_eligibility_steps.js para evitar duplicación

// Pasos de código de estado (reutilizados desde comafi-auth_steps.js)
// Nota: Estos pasos están definidos en comafi-auth_steps.js para evitar duplicación

