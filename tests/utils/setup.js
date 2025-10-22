// Setup file for PactumJS tests
const { spec } = require('pactum');

// Global timeout configuration
process.env.NODE_ENV = 'test';

// Global configuration for PactumJS
// Note: beforeEach is handled by Mocha automatically when tests are run
