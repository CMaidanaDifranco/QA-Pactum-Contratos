const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');

// Configurar timeout por defecto para todos los steps (60 segundos)
setDefaultTimeout(60 * 1000);

// Nota: El timeout también se configura en cucumber.js (timeout: 60000)
// La inicialización del contexto se hace en world.js

// Variables globales
let accessToken = null;
let testContext = {};
let isFirstScenario = true;

// Antes de todos los escenarios
BeforeAll(async function () {
  console.log('🚀 Iniciando tests de Cucumber...');
  console.log('📊 Entorno:', process.env.NODE_ENV || 'development');
});

// Antes de cada escenario
Before(async function () {
  if (isFirstScenario) {
    isFirstScenario = false;
  }
  
  // Limpiar headers y requestData antes de cada escenario para evitar conflictos
  // Nota: No limpiamos accessToken ya que puede ser reutilizado entre escenarios
  this.clearHeaders();
  this.clearRequestData();
  
  console.log('🔄 Iniciando nuevo escenario...');
});

// Después de cada escenario
After(async function (scenario) {
  try {
    if (scenario && scenario.result) {
      if (scenario.result.status === 'PASSED') {
        console.log('✅ Escenario pasado');
      } else if (scenario.result.status === 'FAILED') {
        console.log('❌ Escenario falló');
        if (scenario.result.exception) {
          console.log('💥 Error:', scenario.result.exception.message);
        }
      }
    }
  } catch (error) {
    // Ignorar errores al acceder a scenario.result
  }
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
