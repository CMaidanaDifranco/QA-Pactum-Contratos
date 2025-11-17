#!/usr/bin/env node

/**
 * Script de verificación de instalación
 * Verifica que todas las dependencias necesarias estén instaladas correctamente
 */

const fs = require('fs');
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

// Dependencias críticas que deben estar instaladas
const criticalDependencies = [
  '@cucumber/cucumber',
  'pactum',
  'chai',
  'mocha',
  '@cucumber/html-formatter',
  'cucumber-html-reporter'
];

// Archivos y carpetas críticas que deben existir
const criticalFiles = [
  'package.json',
  'cucumber.js',
  'tests/features',
  'tests/features/support',
  'tests/features/step_definitions'
];

let hasErrors = false;
let hasWarnings = false;

console.log(`${colors.cyan}╔══════════════════════════════════════════════════════════╗${colors.reset}`);
console.log(`${colors.cyan}║     Verificación de Instalación - QA Pactum Contratos   ║${colors.reset}`);
console.log(`${colors.cyan}╚══════════════════════════════════════════════════════════╝${colors.reset}\n`);

// Verificar Node.js y npm
console.log(`${colors.blue}📋 Verificando requisitos previos...${colors.reset}`);
const nodeVersion = process.version;
const nodeMajorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (nodeMajorVersion >= 18) {
  console.log(`${colors.green}✅ Node.js ${nodeVersion} (requerido: v18+)${colors.reset}`);
} else {
  console.log(`${colors.red}❌ Node.js ${nodeVersion} (requerido: v18+)${colors.reset}`);
  hasErrors = true;
}

// Verificar archivos críticos
console.log(`\n${colors.blue}📁 Verificando estructura de archivos...${colors.reset}`);
criticalFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`${colors.green}✅ ${file}${colors.reset}`);
  } else {
    console.log(`${colors.red}❌ ${file} - NO ENCONTRADO${colors.reset}`);
    hasErrors = true;
  }
});

// Verificar dependencias instaladas
console.log(`\n${colors.blue}📦 Verificando dependencias instaladas...${colors.reset}`);

const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log(`${colors.red}❌ node_modules/ no encontrado. Ejecuta: npm install${colors.reset}`);
  hasErrors = true;
} else {
  criticalDependencies.forEach(dep => {
    const depPath = path.join(nodeModulesPath, dep);
    if (fs.existsSync(depPath)) {
      try {
        const packageJsonPath = path.join(depPath, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
          const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
          console.log(`${colors.green}✅ ${dep} (v${pkg.version})${colors.reset}`);
        } else {
          console.log(`${colors.yellow}⚠️  ${dep} - instalado pero sin package.json${colors.reset}`);
          hasWarnings = true;
        }
      } catch (error) {
        console.log(`${colors.yellow}⚠️  ${dep} - instalado pero con error al leer versión${colors.reset}`);
        hasWarnings = true;
      }
    } else {
      console.log(`${colors.red}❌ ${dep} - NO INSTALADO${colors.reset}`);
      hasErrors = true;
    }
  });
}

// Verificar archivos de configuración
console.log(`\n${colors.blue}⚙️  Verificando archivos de configuración...${colors.reset}`);

const configFiles = [
  { path: 'cucumber.js', name: 'Configuración de Cucumber' },
  { path: 'tests/features/support/config.js', name: 'Configuración de soporte' },
  { path: 'tests/features/support/world.js', name: 'World de Cucumber' },
  { path: 'tests/features/support/hooks.js', name: 'Hooks de Cucumber' }
];

configFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file.path);
  if (fs.existsSync(filePath)) {
    console.log(`${colors.green}✅ ${file.name}${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠️  ${file.name} - NO ENCONTRADO${colors.reset}`);
    hasWarnings = true;
  }
});

// Verificar features
console.log(`\n${colors.blue}📝 Verificando features de Cucumber...${colors.reset}`);
const featuresPath = path.join(process.cwd(), 'tests/features');
if (fs.existsSync(featuresPath)) {
  const features = fs.readdirSync(featuresPath, { recursive: true })
    .filter(f => f.endsWith('.feature'));
  
  if (features.length > 0) {
    console.log(`${colors.green}✅ ${features.length} feature(s) encontrado(s)${colors.reset}`);
    features.forEach(f => {
      console.log(`   ${colors.cyan}   - ${f}${colors.reset}`);
    });
  } else {
    console.log(`${colors.yellow}⚠️  No se encontraron archivos .feature${colors.reset}`);
    hasWarnings = true;
  }
}

// Verificar step definitions
console.log(`\n${colors.blue}🔧 Verificando step definitions...${colors.reset}`);
const stepsPath = path.join(process.cwd(), 'tests/features/step_definitions');
if (fs.existsSync(stepsPath)) {
  const steps = fs.readdirSync(stepsPath)
    .filter(f => f.endsWith('_steps.js') || f.endsWith('-steps.js'));
  
  if (steps.length > 0) {
    console.log(`${colors.green}✅ ${steps.length} step definition(s) encontrado(s)${colors.reset}`);
    steps.forEach(s => {
      console.log(`   ${colors.cyan}   - ${s}${colors.reset}`);
    });
  } else {
    console.log(`${colors.yellow}⚠️  No se encontraron step definitions${colors.reset}`);
    hasWarnings = true;
  }
}

// Resumen final
console.log(`\n${colors.cyan}╔══════════════════════════════════════════════════════════╗${colors.reset}`);
if (hasErrors) {
  console.log(`${colors.red}║  ❌ VERIFICACIÓN FALLIDA - Hay errores que corregir    ║${colors.reset}`);
  console.log(`${colors.cyan}╚══════════════════════════════════════════════════════════╝${colors.reset}`);
  console.log(`\n${colors.yellow}💡 Solución: Ejecuta 'npm install' para instalar las dependencias faltantes${colors.reset}\n`);
  process.exit(1);
} else if (hasWarnings) {
  console.log(`${colors.yellow}║  ⚠️  VERIFICACIÓN COMPLETA CON ADVERTENCIAS            ║${colors.reset}`);
  console.log(`${colors.cyan}╚══════════════════════════════════════════════════════════╝${colors.reset}`);
  console.log(`\n${colors.green}✅ La instalación está completa pero hay algunas advertencias${colors.reset}`);
  console.log(`${colors.yellow}💡 Revisa los mensajes de advertencia arriba${colors.reset}\n`);
  process.exit(0);
} else {
  console.log(`${colors.green}║  ✅ VERIFICACIÓN EXITOSA - Todo está correcto          ║${colors.reset}`);
  console.log(`${colors.cyan}╚══════════════════════════════════════════════════════════╝${colors.reset}`);
  console.log(`\n${colors.green}🎉 ¡Instalación completada exitosamente!${colors.reset}`);
  console.log(`${colors.cyan}💡 Próximos pasos:${colors.reset}`);
  console.log(`   ${colors.cyan}→ Ejecuta: npm run test:cucumber:smoke${colors.reset}`);
  console.log(`   ${colors.cyan}→ O revisa el README.md para más comandos${colors.reset}\n`);
  process.exit(0);
}

