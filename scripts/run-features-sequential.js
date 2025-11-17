#!/usr/bin/env node

/**
 * Script para ejecutar features de Cucumber en secuencia
 * Funciona en todos los sistemas operativos (Windows, Linux, Mac)
 */

const { spawn } = require('child_process');
const path = require('path');

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

/**
 * Ejecuta un feature de Cucumber
 * @param {string} featurePath - Ruta al feature file
 * @returns {Promise<boolean>} - true si fue exitoso, false si falló
 */
function runFeature(featurePath) {
  return new Promise((resolve) => {
    const featureName = path.basename(featurePath, '.feature');
    console.log(`\n${colors.cyan}╔══════════════════════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.cyan}║  Ejecutando: ${featureName.padEnd(42)} ║${colors.reset}`);
    console.log(`${colors.cyan}╚══════════════════════════════════════════════════════════╝${colors.reset}\n`);

    const cucumberProcess = spawn('npx', ['cucumber-js', featurePath, '--config', 'cucumber.js'], {
      stdio: 'inherit',
      shell: true,
      cwd: process.cwd()
    });

    cucumberProcess.on('close', (code) => {
      if (code === 0) {
        console.log(`\n${colors.green}✅ ${featureName} - EXITOSO${colors.reset}`);
        resolve(true);
      } else {
        console.log(`\n${colors.red}❌ ${featureName} - FALLÓ (código: ${code})${colors.reset}`);
        resolve(false);
      }
    });

    cucumberProcess.on('error', (error) => {
      console.error(`\n${colors.red}❌ Error al ejecutar ${featureName}: ${error.message}${colors.reset}`);
      resolve(false);
    });
  });
}

/**
 * Ejecuta múltiples features en secuencia
 * @param {string[]} featurePaths - Array de rutas a los features
 * @param {boolean} stopOnError - Si es true, se detiene en el primer error
 */
async function runFeaturesSequential(featurePaths, stopOnError = true) {
  console.log(`${colors.blue}🚀 Iniciando ejecución secuencial de ${featurePaths.length} feature(s)${colors.reset}`);
  
  const results = [];
  
  for (let i = 0; i < featurePaths.length; i++) {
    const featurePath = featurePaths[i];
    const fullPath = path.join(process.cwd(), featurePath);
    
    console.log(`\n${colors.yellow}[${i + 1}/${featurePaths.length}] Procesando: ${featurePath}${colors.reset}`);
    
    const success = await runFeature(fullPath);
    results.push({ feature: featurePath, success });
    
    if (!success && stopOnError) {
      console.log(`\n${colors.red}🛑 Deteniendo ejecución debido a error en: ${featurePath}${colors.reset}`);
      break;
    }
  }
  
  // Resumen final
  console.log(`\n${colors.cyan}╔══════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║                    RESUMEN DE EJECUCIÓN                   ║${colors.reset}`);
  console.log(`${colors.cyan}╚══════════════════════════════════════════════════════════╝${colors.reset}\n`);
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  results.forEach((result, index) => {
    const icon = result.success ? `${colors.green}✅` : `${colors.red}❌`;
    console.log(`${icon} ${index + 1}. ${result.feature}${colors.reset}`);
  });
  
  console.log(`\n${colors.blue}Total: ${results.length} | ${colors.green}Exitosos: ${successful}${colors.reset} | ${colors.red}Fallidos: ${failed}${colors.reset}\n`);
  
  // Exit code: 0 si todos fueron exitosos, 1 si alguno falló
  process.exit(failed > 0 ? 1 : 0);
}

// Obtener argumentos de la línea de comandos
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error(`${colors.red}❌ Error: Debes proporcionar al menos una ruta de feature${colors.reset}`);
  console.log(`${colors.yellow}Uso: node scripts/run-features-sequential.js <feature1> [feature2] [feature3] ...${colors.reset}`);
  process.exit(1);
}

// Ejecutar features en secuencia
runFeaturesSequential(args, true);

