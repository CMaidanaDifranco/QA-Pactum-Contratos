const { Before, After, BeforeAll, AfterAll } = require('cucumber');
const { spec } = require('pactum');

// Variables globales
let accessToken = null;
let testContext = {};

// Antes de todos los escenarios
BeforeAll(async function () {
  console.log('🚀 Iniciando tests de Cucumber...');
  console.log('📊 Entorno:', process.env.NODE_ENV || 'development');
});

// Antes de cada escenario
Before(async function () {
  // Inicializar instancia fresca de spec para cada escenario
  this.spec = spec();
  
  // Inicializar contexto de test
  this.context = {
    accessToken: null,
    response: null,
    requestData: {}
  };
  
  console.log('🔄 Iniciando nuevo escenario...');
});

// Después de cada escenario
After(async function (scenario) {
  // Registrar resultado del escenario
  if (scenario.result.status === 'PASSED') {
    console.log('✅ Escenario pasado:', scenario.pickle.name);
  } else if (scenario.result.status === 'FAILED') {
    console.log('❌ Escenario falló:', scenario.pickle.name);
    console.log('💥 Error:', scenario.result.exception.message);
  }
  
  // Limpiar después del escenario
  this.context = {};
});

// Después de todos los escenarios
AfterAll(async function () {
  console.log('🏁 Todos los tests de Cucumber completados');
});

// Exportar contexto global
module.exports = {
  getAccessToken: () => accessToken,
  setAccessToken: (token) => { accessToken = token; },
  getTestContext: () => testContext,
  setTestContext: (context) => { testContext = context; }
};
