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
    const urlLower = url.toLowerCase();
    
    // Detectar endpoints de Galicia (tanto elegibilidad como simulación)
    // Verificar en endpoint y URL completa para mayor robustez
    const isGaliciaEndpoint = endpointLower.includes('/galicia/') || 
                              endpointLower.includes('galicia') ||
                              urlLower.includes('/galicia/') || 
                              urlLower.includes('galicia') ||
                              urlLower.includes('middleware-galicia');
    
    // Debug: mostrar información de detección
    if (isGaliciaEndpoint) {
      console.log(`🔍 Endpoint de Galicia detectado:`);
      console.log(`   Endpoint: ${endpoint}`);
      console.log(`   URL completa: ${url}`);
      console.log(`   Detección: endpointLower.includes('/galicia/')=${endpointLower.includes('/galicia/')}, urlLower.includes('middleware-galicia')=${urlLower.includes('middleware-galicia')}`);
    }
    
    // Timeout extendido para endpoints de Galicia (pueden tardar más o tener problemas de conectividad)
    if (isGaliciaEndpoint) {
      request = request.withRequestTimeout(90000); // 90 segundos para endpoints de Galicia
      console.log(`⏱️ Timeout configurado a 90 segundos para endpoint de Galicia: ${endpoint}`);
      console.log(`   URL completa: ${url}`);
    } else if (endpointLower.includes('/simulation') || 
        endpointLower.includes('/simulacion') ||
        endpointLower.includes('/eligibility') || 
        endpointLower.includes('/elegibilidad') ||
        endpointLower.includes('prestamo/elegibilidad') ||
        endpointLower.includes('prestamo/simulacion')) {
      request = request.withRequestTimeout(30000); // 30 segundos para otros endpoints de simulación/elegibilidad
      console.log(`⏱️ Timeout configurado a 30 segundos para endpoint de simulación/elegibilidad: ${endpoint}`);
    }
    
    // Ejecutar solicitud con manejo de errores mejorado
    try {
      // Log adicional para confirmar que el timeout está configurado
      if (isGaliciaEndpoint) {
        console.log(`🚀 Ejecutando petición a Galicia con timeout de 90 segundos...`);
      }
      const response = await request.toss();
      this.setResponse(response);
      if (isGaliciaEndpoint) {
        console.log(`✅ Petición a Galicia completada exitosamente`);
      }
      return response;
    } catch (error) {
      // Mejorar mensaje de error para diagnóstico
      const isGalicia = endpointLower.includes('/galicia/') || 
                       endpointLower.includes('galicia') ||
                       urlLower.includes('/galicia/') || 
                       urlLower.includes('galicia') ||
                       urlLower.includes('middleware-galicia');
      
      console.error(`\n❌ Error en petición a: ${url}`);
      console.error(`   Endpoint: ${endpoint}`);
      console.error(`   Método: ${method.toUpperCase()}`);
      console.error(`   Tipo de error: ${error.name || 'Unknown'}`);
      console.error(`   Mensaje: ${error.message || 'Sin mensaje'}`);
      
      if (error.message && (error.message.includes('Timeout') || error.message.includes('timeout'))) {
        console.error(`\n⏱️ TIMEOUT DETECTADO:`);
        console.error(`   Timeout configurado: ${isGalicia ? '90s (HTTP)' : '30s (HTTP)'}`);
        console.error(`   Tiempo transcurrido: ~40s (sugiere timeout de conexión TCP)`);
        console.error(`\n💡 DIAGNÓSTICO:`);
        console.error(`   El servidor no está respondiendo o no es accesible desde esta ubicación.`);
        console.error(`   Posibles causas:`);
        console.error(`   1. El servidor está en una red privada o requiere VPN`);
        console.error(`   2. Firewall bloquea las conexiones desde GitHub Actions`);
        console.error(`   3. El servidor no está disponible o está caído`);
        console.error(`   4. Problemas de conectividad de red`);
        if (isGalicia) {
          console.error(`\n⚠️ NOTA ESPECÍFICA PARA GALICIA:`);
          console.error(`   Los tests de Galicia pueden fallar en GitHub Actions debido a restricciones de red.`);
          console.error(`   Esto es esperado si el servidor no es accesible desde internet público.`);
        }
      } else if (error.message && (error.message.includes('ECONNREFUSED') || error.code === 'ECONNREFUSED')) {
        console.error(`\n🚫 CONEXIÓN RECHAZADA:`);
        console.error(`   El servidor rechazó la conexión en: ${url}`);
        console.error(`   Posibles causas:`);
        console.error(`   1. El servidor no está escuchando en ese puerto`);
        console.error(`   2. Firewall bloquea las conexiones`);
        console.error(`   3. El servidor no es accesible desde esta ubicación`);
      } else if (error.message && (error.message.includes('ENOTFOUND') || error.code === 'ENOTFOUND')) {
        console.error(`\n🔍 DNS NO RESUELTO:`);
        console.error(`   No se pudo resolver el dominio: ${url}`);
        console.error(`   Verifica que el dominio sea correcto y accesible`);
      } else if (error.message && (error.message.includes('ETIMEDOUT') || error.code === 'ETIMEDOUT')) {
        console.error(`\n⏱️ TIMEOUT DE CONEXIÓN:`);
        console.error(`   La conexión TCP no se pudo establecer en el tiempo esperado`);
        console.error(`   Esto indica que el servidor no es accesible desde esta ubicación`);
      } else {
        console.error(`\n⚠️ ERROR DESCONOCIDO:`);
        console.error(`   Stack trace: ${error.stack || 'No disponible'}`);
      }
      
      throw error;
    }
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
