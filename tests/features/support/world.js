const { setWorldConstructor } = require('@cucumber/cucumber');
const { spec } = require('pactum');
const { expect } = require('chai');

// Constructor personalizado de World
function CustomWorld({ attach, parameters }) {
  this.attach = attach;
  this.parameters = parameters;
  
  // Aserciones de Chai
  this.expect = expect;
  
  // Contexto de test
  this.context = {
    accessToken: null,
    response: null,
    requestData: {},
    headers: {},
    baseUrl: 'https://nera-qa.comafi.com.ar'
  };
  
  // Métodos auxiliares
  this.setBaseUrl = (url) => {
    this.context.baseUrl = url;
  };
  
  this.setHeaders = (headers) => {
    this.context.headers = { ...this.context.headers, ...headers };
  };
  
  this.clearHeaders = () => {
    this.context.headers = {};
  };
  
  this.clearRequestData = () => {
    this.context.requestData = {};
  };
  
  this.setRequestData = (data) => {
    this.context.requestData = { ...this.context.requestData, ...data };
  };
  
  this.getAccessToken = () => {
    return this.context.accessToken;
  };
  
  this.setAccessToken = (token) => {
    this.context.accessToken = token;
  };
  
  this.getResponse = () => {
    return this.context.response;
  };
  
  this.setResponse = (response) => {
    this.context.response = response;
  };
  
  // Métodos auxiliares de API
  this.makeRequest = async (method, endpoint, options = {}) => {
    const url = endpoint.startsWith('http') ? endpoint : `${this.context.baseUrl}${endpoint}`;
    
    // Crear una nueva instancia de spec para cada petición
    let request = spec()[method.toLowerCase()](url);
    
    // Agregar headers
    if (Object.keys(this.context.headers).length > 0) {
      request = request.withHeaders(this.context.headers);
    }
    
    // Agregar cuerpo de la solicitud
    if (options.body) {
      request = request.withBody(options.body);
    }
    
    // Agregar datos de formulario
    if (options.form) {
      request = request.withForm(options.form);
    }
    
    // Agregar datos JSON
    if (options.json) {
      request = request.withJson(options.json);
    }
    
    // Agregar parámetros de ruta
    if (options.pathParams) {
      request = request.withPathParams(options.pathParams);
    }
    
    // Agregar parámetros de consulta
    if (options.queryParams) {
      request = request.withQueryParams(options.queryParams);
    }
    
    // Configurar timeout específico para endpoints de simulación y elegibilidad
    const endpointLower = endpoint.toLowerCase();
    if (endpointLower.includes('/simulation') || 
        endpointLower.includes('/simulacion') ||
        endpointLower.includes('/eligibility') || 
        endpointLower.includes('/elegibilidad') ||
        endpointLower.includes('prestamo/elegibilidad') ||
        endpointLower.includes('prestamo/simulacion')) {
      request = request.withRequestTimeout(30000); // 30 segundos para simulación y elegibilidad
      console.log(`⏱️ Timeout configurado a 30 segundos para endpoint de simulación/elegibilidad: ${endpoint}`);
    }
    
    // Ejecutar solicitud
    const response = await request.toss();
    this.setResponse(response);
    return response;
  };
}

// Registrar el World constructor
// Nota: En Cucumber v6.0.7 con Node.js v22, hay problemas de compatibilidad conocidos
// El objeto de soporte puede no estar inicializado cuando se carga este módulo
// Solución: Verificar que setWorldConstructor esté disponible y sea una función antes de usarlo

// Exportar el constructor para uso manual si es necesario
module.exports.CustomWorld = CustomWorld;

// Registrar el World constructor
// Con @cucumber/cucumber v12.2.0, esto debería funcionar correctamente con Node.js v22
setWorldConstructor(CustomWorld);
