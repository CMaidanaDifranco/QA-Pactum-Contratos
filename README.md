# QA Pactum Contratos

Repositorio de pruebas de automatización QA con Pactum.js nativo y BDD con Cucumber.

## 🚀 Características

- **Pactum.js nativo** - Framework de testing API simple y potente
- **Cucumber.js + Gherkin** - Tests BDD en español latino
- **Mocha** - Test runner robusto para tests unitarios
- **Chai** - Librería de aserciones
- **NYC** - Cobertura de código
- **Estructura organizada** - Tests separados por funcionalidad
- **Configuración por ambientes** - Development, staging, production
- **Flujos secuenciales** - Autenticación + funcionalidad

## 📁 Estructura del Proyecto

```
├── tests/
│   ├── features/              # Tests BDD con Cucumber/Gherkin
│   │   ├── auth/              # Features de autenticación
│   │   │   └── comafi-authentication.feature
│   │   ├── api/               # Features de APIs
│   │   │   ├── comafi-eligibility.feature
│   │   │   └── comafi-simulacion.feature
│   │   ├── step_definitions/  # Definiciones de pasos
│   │   │   ├── auth_steps.js
│   │   │   ├── api_steps.js
│   │   │   ├── eligibility_steps.js
│   │   │   └── simulation_steps.js
│   │   └── support/           # Configuración y helpers
│   │       ├── hooks.js
│   │       ├── world.js
│   │       └── config.js
│   ├── api/                   # Tests unitarios con Mocha
│   ├── smoke/                 # Tests de humo
│   └── utils/                 # Utilidades y helpers
├── reports/                   # Reportes de pruebas
├── cucumber.js               # Configuración de Cucumber
└── package.json             # Configuración del proyecto
```

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Verificar instalación
npm test
```

## 🧪 Ejecutar Pruebas

### Tests BDD con Cucumber (Gherkin)
```bash
# Ejecutar todos los features
npx cucumber-js tests/features/

# Usar perfil específico
npx cucumber-js tests/features/ --profile development

# Ejecutar features específicos
npx cucumber-js tests/features/auth/comafi-authentication.feature
npx cucumber-js tests/features/api/comafi-eligibility.feature
npx cucumber-js tests/features/api/comafi-simulacion.feature

# Ejecutar por tags (IMPORTANTE: incluir la ruta)
npx cucumber-js tests/features/ --tags "@smoke"
npx cucumber-js tests/features/ --tags "@auth"
npx cucumber-js tests/features/ --tags "@eligibility"
npx cucumber-js tests/features/ --tags "@simulation"

# Combinar tags
npx cucumber-js tests/features/ --tags "@auth and @smoke"
npx cucumber-js tests/features/ --tags "@eligibility and @smoke"
npx cucumber-js tests/features/ --tags "@simulation and @smoke"

# Flujos secuenciales (autenticación + funcionalidad)
npx cucumber-js tests/features/ --tags "@auth-token"
npx cucumber-js tests/features/ --tags "@eligibility-flow"
npx cucumber-js tests/features/ --tags "@simulation-flow"
npm run test:cucumber:auth-to-eligibility
npm run test:cucumber:auth-to-simulation

# Modo dry-run (sin ejecutar)
npx cucumber-js tests/features/ --dry-run
```

### Tests Unitarios con Mocha
```bash
# Todos los tests unitarios
npm test

# Tests específicos
npm test tests/api/auth_token.test.js
npm test tests/example/working.test.js
```

### Tests específicos
```bash
# Tests de autenticación
npm run test:auth

# Tests de API
npm run test:api

# Tests de humo
npm run test:smoke

# Con cobertura
npm run test:coverage

# Con reporte
npm run test:report
```

### Modo watch
```bash
npm run test:watch
```

## 🌍 Configuración por Ambientes

### Ambientes Disponibles
- **development** (default): `https://nera-qa.comafi.com.ar`
- **staging**: `https://nera-staging.comafi.com.ar`
- **production**: `https://nera.comafi.com.ar`

### Variables de Entorno
```bash
# Configurar ambiente
NODE_ENV=development  # o staging, production

# Para producción (credenciales desde variables de entorno)
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
AUTH_HEADER=your_auth_header
```

### Ejecutar por Ambiente
```bash
# Development (default)
npx cucumber-js tests/features/ --profile development

# Staging
NODE_ENV=staging npx cucumber-js tests/features/ --profile staging

# Production
NODE_ENV=production npx cucumber-js tests/features/ --profile production
```

## 📋 Tests Disponibles

### 🔐 Autenticación OAuth2 (BDD)
**Feature:** `tests/features/auth/comafi-authentication.feature`
- **Obtención de token** con credenciales válidas
- **Validación completa** de estructura del token response:
  - `access_token` (string)
  - `expires_in` (1800 segundos)
  - `refresh_expires_in` (0)
  - `token_type` ("bearer")
  - `not-before-policy` (0)
  - `scope` ("email profile")
- **Casos negativos** con credenciales inválidas
- **Tests de rendimiento** (tiempo de respuesta)
- **Persistencia del token** para uso en tests posteriores

- **Datos de prueba** predefinidos

### 🏦 Elegibilidad Comafi (BDD)
**Feature:** `tests/features/api/comafi-eligibility.feature`
- **Consulta de elegibilidad** de préstamos
- **Autenticación requerida** con token Bearer
- **Validación de CUIT** y datos de elegibilidad
- **Casos positivos y negativos** con diferentes CUITs
- **Validación de estructura** completa de respuesta JSON

### 📊 Simulación Comafi (BDD)
**Feature:** `tests/features/api/comafi-simulacion.feature`
- **Simulación de préstamos** con datos de financiamiento
- **Autenticación requerida** con token Bearer
- **Validación de parámetros** de simulación (monto, cuotas, tasa)
- **Cálculo de condiciones** de financiamiento
- **Validación de estructura** completa de respuesta JSON

## 🏷️ Etiquetas Disponibles

### Etiquetas por Funcionalidad
- `@smoke`: Tests críticos de humo
- `@auth`: Tests de autenticación
- `@eligibility`: Tests de elegibilidad
- `@simulation`: Tests de simulación
- `@negative`: Tests de casos negativos
- `@performance`: Tests de rendimiento
- `@token-validation`: Tests de validación de tokens

### Etiquetas de Flujo Secuencial
- `@auth-token`: Ejecuta solo el escenario que obtiene el token
- `@eligibility-flow`: Ejecuta el flujo de elegibilidad
- `@simulation-flow`: Ejecuta el flujo de simulación
- `@auth-to-eligibility`: Ejecuta autenticación + elegibilidad en secuencia
- `@auth-to-simulation`: Ejecuta autenticación + simulación en secuencia

### Comandos por Etiquetas
```bash
# Flujos secuenciales (autenticación + funcionalidad)
npx cucumber-js tests/features/ --tags "@auth-token"
npx cucumber-js tests/features/ --tags "@eligibility-flow"
npm run test:cucumber:auth-to-eligibility

# Combinar etiquetas
npx cucumber-js tests/features/ --tags "@auth and @smoke"
npx cucumber-js tests/features/ --tags "@eligibility and @smoke"

# Excluir tests negativos
npx cucumber-js tests/features/ --tags "not @negative"
```

### 🌐 APIs Demo (Unitarios)
- CRUD completo con JSONPlaceholder
- Validaciones de estructura
- Headers y content-type
- Tiempo de respuesta

### 💨 Smoke Tests
- Conectividad básica
- Validaciones de headers
- Tiempo de respuesta

## 🔧 Configuración

### Credenciales OAuth2
Las credenciales están configuradas en `tests/features/support/config.js`:

```javascript
// Development/Staging
auth: {
  clientId: '5872d210',
  clientSecret: 'b18338211e2f6527ec04ead2c556252',
  authHeader: 'Basic NTg3MmQyMTA6YjE4MzM4MjExZTJmNjUyN2VjMDRlYWQyYzU1NjI1Mg==',
  tokenEndpoint: '/auth/realms/hbe-sso/protocol/openid-connect/token'
}

// Production (desde variables de entorno)
auth: {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  authHeader: process.env.AUTH_HEADER,
  tokenEndpoint: '/auth/realms/hbe-sso/protocol/openid-connect/token'
}
```

### Configuración de Cucumber
```javascript
// cucumber.js
module.exports = {
  default: { /* configuración base */ },
  development: { /* desarrollo */ },
  staging: { /* staging */ },
  ci: { /* CI/CD */ }
};
```

### Timeouts
```javascript
timeouts: {
  default: 10000,    // 10 segundos
  oauth2: 15000,     // 15 segundos
  demo: 5000         // 5 segundos
}
```

## 📊 Reportes

Los reportes se generan automáticamente en la carpeta `reports/`:

### Tests Unitarios (Mocha)
- `test-results.json` - Resultados en formato JSON
- Cobertura de código con NYC

### Tests BDD (Cucumber)
- `cucumber-report.json` - Resultados en formato JSON
- `cucumber-report.html` - Reporte visual HTML
- Reportes por ambiente (development, staging, production)

## 🚀 Ejemplos de Uso

### Test básico con estilo _spec
```javascript
const { spec } = require('pactum');

describe('Posts', () => {
  const _spec = spec();

  it('should make a request to json-placeholder', async () => {
    _spec.get('http://jsonplaceholder.typicode.com/posts/{id}');
  });

  it('should get first post', async () => {
    _spec.withPathParams('id', '1');
  });

  it('should receive a response', async () => {
    await _spec.toss();
  });

  it('should have a status code of 200', async () => {
    _spec.response().to.have.status(200);
  });

  it('should have a user id of 1', async () => {
    _spec.response().to.have.json('userId', 1);
  });
});
```

### Test con autenticación OAuth2
```javascript
const { spec } = require('pactum');

describe('OAuth2 Authentication', () => {
  const _spec = spec();

  it('should make a request to OAuth2 endpoint', async () => {
    _spec.post('https://nera-qa.comafi.com.ar/auth/realms/hbe-sso/protocol/openid-connect/token');
  });

  it('should set OAuth2 headers', async () => {
    _spec.withHeaders({
      'Authorization': 'Basic NTg3MmQyMTA6YjE4MzM4MjExZTJmNjUyN2VjMDRlYWQyYzU1NjI1Mg=='
    });
  });

  it('should set form data', async () => {
    _spec.withForm({
      'grant_type': 'client_credentials'
    });
  });

  it('should receive a response', async () => {
    await _spec.toss();
  });

  it('should have valid status', async () => {
    _spec.response().to.have.status.oneOf([200, 401]);
  });
});
```

### Test de Autenticación Completo (Mocha + PactumJS)
```javascript
const { spec } = require('pactum');
const { expect } = require('chai');

describe('Authentication Token API Tests', () => {
  let accessToken = null;

  it('should obtain access token with client credentials', async () => {
    const response = await spec()
      .post('https://nera-qa.comafi.com.ar/auth/realms/hbe-sso/protocol/openid-connect/token')
      .withHeaders({
        'User-Agent': 'NeraApis',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic NTg3MmQyMTA6YjE4MzM4MjExZTJmNjUyN2VjMDRlYWRhMmM1NTYyNTI='
      })
      .withBody('grant_type=client_credentials')
      .expectStatus(200)
      .toss();

    // Validar estructura completa del token
    expect(response.body).to.have.property('access_token');
    expect(response.body).to.have.property('expires_in', 1800);
    expect(response.body).to.have.property('token_type', 'bearer');
    
    // Guardar token para uso posterior
    accessToken = response.body.access_token;
  });
});
```

### Test BDD con Gherkin (Cucumber) - Español Latino
```gherkin
Feature: API de Autenticación
  Como usuario del sistema
  Quiero autenticarme con la API
  Para poder acceder a recursos protegidos

  Background:
    Given el servicio de autenticación está disponible
    And tengo credenciales de cliente válidas

  @smoke @auth @auth-token
  Scenario: Obtener exitosamente token de acceso con credenciales de cliente
    When envío una petición POST al endpoint de autenticación
    Then debería recibir un código de estado 200
    And la respuesta debería contener un token de acceso válido
    And debería guardar el token de acceso para uso futuro
```

### Test de Elegibilidad Comafi (BDD)
```gherkin
Feature: API de Elegibilidad Comafi
  Como usuario del sistema
  Quiero consultar la elegibilidad de préstamos
  Para poder determinar si un CUIT es apto para una oferta crediticia

  Background:
    Given tengo un token de acceso válido
    And el servicio de elegibilidad está disponible

  @smoke @eligibility @eligibility-flow
  Scenario: Consultar elegibilidad con CUIT válido
    Given tengo datos de elegibilidad válidos
    When envío una petición POST a "/api/v1/products/loans/eligibility"
    Then debería recibir un código de estado 200
    And la respuesta debería contener elegibilidad aprobada
    And la respuesta debería contener is_eligible como true
    And la respuesta debería contener un mensaje amigable
```

### Test de Contratos (BDD)
```gherkin
Feature: API de Contratos
  Como usuario del sistema
  Quiero gestionar contratos
  Para poder realizar operaciones de contratos

  Background:
    Given tengo un token de acceso válido
    And el servicio de contratos está disponible

```

## 📝 Notas

- **Tests BDD en español latino** - Todos los features están traducidos
- **Estructura limpia** - Sin redundancia en step definitions
- **Configuración por perfiles** - Development, staging, production
- **Flujos secuenciales** - Autenticación + funcionalidad con persistencia de token
- **Tests de OAuth2** pueden fallar si las credenciales están expiradas
- **Tests de demo** usan JSONPlaceholder que siempre funciona
- **Smoke tests** verifican conectividad básica
- **Step definitions** organizados por funcionalidad
- **Token persistence** - Tokens se comparten entre ejecuciones de Cucumber
- **Ambientes configurados** - URLs dinámicas según el ambiente

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver archivo LICENSE para detalles.