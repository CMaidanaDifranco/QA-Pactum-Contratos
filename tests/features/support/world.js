const { setWorldConstructor } = require('cucumber');
const { spec } = require('pactum');
const { expect } = require('chai');

// Constructor personalizado de World
function CustomWorld({ attach, parameters }) {
  this.attach = attach;
  this.parameters = parameters;
  
  // Instancia de PactumJS spec
  this.spec = spec;
  
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
    
    let request = this.spec[method.toLowerCase()](url);
    
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
    
    // Configurar timeout específico para endpoints de simulación
    if (endpoint.includes('/simulation')) {
      request = request.withRequestTimeout(10000); // 10 segundos para simulación
      console.log('⏱️ Timeout configurado a 10 segundos para endpoint de simulación');
    }
    
    // Ejecutar solicitud
    const response = await request.toss();
    this.setResponse(response);
    return response;
  };
}

setWorldConstructor(CustomWorld);
