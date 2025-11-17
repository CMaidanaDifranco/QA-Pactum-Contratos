#!/usr/bin/env node

/**
 * Script para generar un resumen visual del reporte de Cucumber
 * para GitHub Actions Workflow Summary
 */

const fs = require('fs');
const path = require('path');

const reportJsonPath = path.join(process.cwd(), 'reports', 'cucumber-report.json');
const summaryPath = process.env.GITHUB_STEP_SUMMARY || '/dev/stdout';

function generateSummary(testSuite) {
  let summary = '';
  
  if (!fs.existsSync(reportJsonPath)) {
    summary = `## ⚠️ No se encontró el reporte JSON\n\n`;
    summary += `El archivo ${reportJsonPath} no existe.\n`;
    return summary;
  }

  try {
    const reportData = JSON.parse(fs.readFileSync(reportJsonPath, 'utf8'));
    
    // Calcular estadísticas
    let totalScenarios = 0;
    let passedScenarios = 0;
    let failedScenarios = 0;
    let skippedScenarios = 0;
    let totalSteps = 0;
    let passedSteps = 0;
    let failedSteps = 0;
    let skippedSteps = 0;
    const scenarios = [];

    reportData.forEach(feature => {
      if (feature.elements) {
        feature.elements.forEach(element => {
          if (element.type === 'scenario') {
            totalScenarios++;
            let scenarioPassed = true;
            let scenarioFailed = false;
            let scenarioSkipped = false;
            
            if (element.steps) {
              element.steps.forEach(step => {
                totalSteps++;
                const status = step.result?.status || 'unknown';
                
                if (status === 'passed') {
                  passedSteps++;
                } else if (status === 'failed') {
                  failedSteps++;
                  scenarioPassed = false;
                  scenarioFailed = true;
                } else if (status === 'skipped') {
                  skippedSteps++;
                  scenarioSkipped = true;
                }
              });
            }
            
            if (scenarioFailed) {
              failedScenarios++;
            } else if (scenarioSkipped) {
              skippedScenarios++;
            } else if (scenarioPassed) {
              passedScenarios++;
            }
            
            scenarios.push({
              name: element.name,
              status: scenarioFailed ? 'failed' : (scenarioSkipped ? 'skipped' : 'passed'),
              feature: feature.name,
              duration: element.steps?.reduce((sum, step) => sum + (step.result?.duration || 0), 0) || 0
            });
          }
        });
      }
    });

    const successRate = totalScenarios > 0 ? Math.round((passedScenarios * 100) / totalScenarios) : 0;
    const totalDuration = scenarios.reduce((sum, s) => sum + s.duration, 0) / 1000000000; // Convertir nanosegundos a segundos

    // Generar resumen
    summary = `## 📊 Resumen de Tests - ${testSuite}\n\n`;
    
    // Estadísticas principales
    summary += `### 📈 Estadísticas\n\n`;
    summary += `| Métrica | Valor |\n`;
    summary += `|---------|-------|\n`;
    summary += `| ✅ Escenarios Pasados | **${passedScenarios}** |\n`;
    summary += `| ❌ Escenarios Fallidos | **${failedScenarios}** |\n`;
    summary += `| ⏭️ Escenarios Omitidos | **${skippedScenarios}** |\n`;
    summary += `| 📊 Total Escenarios | **${totalScenarios}** |\n`;
    summary += `| 📈 Tasa de Éxito | **${successRate}%** |\n`;
    summary += `| ⏱️ Tiempo Total | **${totalDuration.toFixed(2)}s** |\n`;
    summary += `| 🔢 Total Steps | **${totalSteps}** (✅ ${passedSteps} | ❌ ${failedSteps} | ⏭️ ${skippedSteps}) |\n`;
    summary += `\n`;

    // Estado visual
    if (failedScenarios === 0) {
      summary += `### ✅ Estado: Todos los tests pasaron exitosamente\n\n`;
    } else {
      summary += `### ❌ Estado: ${failedScenarios} test(s) fallaron\n\n`;
    }

    // Detalles de escenarios
    if (scenarios.length > 0) {
      summary += `### 📝 Detalles de Escenarios\n\n`;
      
      scenarios.forEach((scenario, index) => {
        const statusIcon = scenario.status === 'passed' ? '✅' : (scenario.status === 'failed' ? '❌' : '⏭️');
        const duration = (scenario.duration / 1000000000).toFixed(2);
        
        summary += `${statusIcon} **${scenario.name}**\n`;
        summary += `   - Estado: ${scenario.status}\n`;
        summary += `   - Duración: ${duration}s\n`;
        summary += `   - Feature: ${scenario.feature}\n\n`;
        
        // Limitar a 10 escenarios para no hacer el resumen muy largo
        if (index >= 9 && scenarios.length > 10) {
          summary += `\n*... y ${scenarios.length - 10} escenario(s) más*\n\n`;
          return;
        }
      });
    }

    // Enlaces
    summary += `### 📎 Ver Reporte Completo\n\n`;
    summary += `- 📥 [Descargar reporte HTML como artefacto](${process.env.GITHUB_SERVER_URL || 'https://github.com'}/${process.env.GITHUB_REPOSITORY || ''}/actions/runs/${process.env.GITHUB_RUN_ID || ''})\n`;
    summary += `- 🔗 [Ver workflow run](${process.env.GITHUB_SERVER_URL || 'https://github.com'}/${process.env.GITHUB_REPOSITORY || ''}/actions/runs/${process.env.GITHUB_RUN_ID || ''})\n`;

  } catch (error) {
    summary = `## ❌ Error al procesar el reporte\n\n`;
    summary += `Error: ${error.message}\n`;
  }

  return summary;
}

// Obtener el nombre del test suite desde argumentos o variable de entorno
const testSuite = process.argv[2] || process.env.TEST_SUITE || 'Tests';

// Generar y escribir el resumen
const summary = generateSummary(testSuite);

if (summaryPath === '/dev/stdout') {
  console.log(summary);
} else {
  fs.appendFileSync(summaryPath, summary, 'utf8');
}

