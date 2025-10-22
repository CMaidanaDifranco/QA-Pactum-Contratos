// Configuración para diferentes entornos
const config = {
  development: {
    baseUrl: 'https://nera-qa.comafi.com.ar',
    timeout: 30000,
    retries: 1,
    auth: {
      clientId: '5872d210',
      clientSecret: 'b18338211e2f6527ec04ead2c556252',
      authHeader: 'Basic NTg3MmQyMTA6YjE4MzM4MjExZTJmNjUyN2VjMDRlYWRhMmM1NTYyNTI=',
      tokenEndpoint: '/auth/realms/hbe-sso/protocol/openid-connect/token'
    }
  },
  
  staging: {
    baseUrl: 'https://nera-staging.comafi.com.ar',
    timeout: 30000,
    retries: 2,
    auth: {
      clientId: '5872d210',
      clientSecret: 'b18338211e2f6527ec04ead2c556252',
      authHeader: 'Basic NTg3MmQyMTA6YjE4MzM4MjExZTJmNjUyN2VjMDRlYWQyYzU1NjI1Mg==',
      tokenEndpoint: '/auth/realms/hbe-sso/protocol/openid-connect/token'
    }
  },
  
  production: {
    baseUrl: 'https://nera.comafi.com.ar',
    timeout: 30000,
    retries: 3,
    auth: {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      authHeader: process.env.AUTH_HEADER,
      tokenEndpoint: '/auth/realms/hbe-sso/protocol/openid-connect/token'
    }
  }
};

// Obtener entorno actual
const environment = process.env.NODE_ENV || 'development';

// Exportar configuración actual
module.exports = {
  ...config[environment],
  environment,
  isDevelopment: environment === 'development',
  isStaging: environment === 'staging',
  isProduction: environment === 'production'
};
