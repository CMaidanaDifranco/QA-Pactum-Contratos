module.exports = {
  default: {
    require: [
      'tests/features/support/**/*.js',
      'tests/features/step_definitions/**/*.js'
    ],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json',
      ['@cucumber/html-formatter', 'reports/cucumber-report.html']
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true,
    dryRun: false,
    failFast: false,
    retry: 1,
    parallel: 1,
    timeout: 60000
  },
  
  // Configuración para diferentes entornos
  development: {
    require: [
      'tests/features/support/**/*.js',
      'tests/features/step_definitions/**/*.js'
    ],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json',
      ['@cucumber/html-formatter', 'reports/cucumber-report.html']
    ],
    publishQuiet: true,
    timeout: 60000 // 60 segundos para permitir peticiones HTTP largas
  },
  
  staging: {
    require: [
      'tests/features/support/**/*.js',
      'tests/features/step_definitions/**/*.js'
    ],
    format: ['progress-bar'],
    publishQuiet: true,
    timeout: 60000
  },
  
  ci: {
    require: [
      'tests/features/support/**/*.js',
      'tests/features/step_definitions/**/*.js'
    ],
    format: [
      'json:reports/cucumber-report.json',
      ['@cucumber/html-formatter', 'reports/cucumber-report.html']
    ],
    publishQuiet: true,
    retry: 2
  }
};

