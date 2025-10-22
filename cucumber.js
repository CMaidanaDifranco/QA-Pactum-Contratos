module.exports = {
  default: {
    require: [
      'tests/features/support/**/*.js',
      'tests/features/step_definitions/**/*.js'
    ],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true,
    dryRun: false,
    failFast: false,
    retry: 1,
    parallel: 1,
    timeout: 30000
  },
  
  // Configuración para diferentes entornos
  development: {
    require: [
      'tests/features/support/**/*.js',
      'tests/features/step_definitions/**/*.js'
    ],
    format: ['progress-bar'],
    publishQuiet: true
  },
  
  ci: {
    require: [
      'tests/features/support/**/*.js',
      'tests/features/step_definitions/**/*.js'
    ],
    format: [
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html'
    ],
    publishQuiet: true,
    retry: 2
  }
};

