const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

const options = {
  theme: 'bootstrap',
  jsonFile: path.join(__dirname, 'reports', 'cucumber-report.json'),
  output: path.join(__dirname, 'reports', 'cucumber-report.html'),
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  metadata: {
    'App Version': '1.0.0',
    'Test Environment': process.env.NODE_ENV || 'development',
    'Browser': 'N/A',
    'Platform': process.platform,
    'Executed': new Date().toISOString()
  }
};

// Verificar que el archivo JSON existe
if (!fs.existsSync(options.jsonFile)) {
  console.error(`❌ Error: No se encontró el archivo JSON en ${options.jsonFile}`);
  console.error('   Por favor ejecuta las pruebas primero para generar el reporte JSON.');
  process.exit(1);
}

// Generar el reporte HTML
try {
  reporter.generate(options);
  console.log(`✅ Reporte HTML generado exitosamente en: ${options.output}`);
} catch (error) {
  console.error('❌ Error al generar el reporte HTML:', error.message);
  process.exit(1);
}

