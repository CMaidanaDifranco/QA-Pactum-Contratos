# QA Pactum Contratos

Repositorio de pruebas de automatización QA con Pactum.js nativo.

## 🚀 Características

- **Pactum.js nativo** - Framework de testing API simple y potente
- **Mocha** - Test runner robusto
- **Chai** - Librería de aserciones
- **NYC** - Cobertura de código
- **Estructura organizada** - Tests separados por funcionalidad

## 📁 Estructura del Proyecto

```
├── tests/
│   ├── features/       # Tests BDD con Cucumber/Gherkin
│   │   ├── auth/       # Features de autenticación
│   │   ├── api/        # Features de APIs
│   │   ├── step_definitions/  # Definiciones de pasos
│   │   └── support/    # Configuración y helpers
│   ├── api/            # Tests unitarios con Mocha
│   ├── smoke/          # Tests de humo
│   └── utils/          # Utilidades y helpers
├── reports/            # Reportes de pruebas
└── package.json      # Configuración del proyecto
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
npx cucumber-js tests/features/auth/authentication.feature
npx cucumber-js tests/features/api/contracts.feature

# Ejecutar por tags (IMPORTANTE: incluir la ruta)
npx cucumber-js tests/features/ --tags "@smoke"
npx cucumber-js tests/features/ --tags "@auth"
npx cucumber-js tests/features/ --tags "@contracts"
npx cucumber-js tests/features/ --tags "@eligibility"

# Combinar tags
npx cucumber-js tests/features/ --tags "@auth and @smoke"
npx cucumber-js tests/features/ --tags "@auth or @contracts"
npx cucumber-js tests/features/ --tags "@eligibility and @smoke"

# Flujos secuenciales (autenticación + funcionalidad)
npx cucumber-js tests/features/ --tags "@auth-token"
npx cucumber-js tests/features/ --tags "@eligibility-flow"
npm run test:cucumber:auth-to-eligibility

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

## 📋 Tests Disponibles

### 🔐 Autenticación OAuth2 (BDD)
**Feature:** `tests/features/auth/authentication.feature`
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

### 📄 Gestión de Contratos (BDD)
**Feature:** `tests/features/api/contracts.feature`
- **CRUD completo** de contratos
- **Autenticación requerida** para todas las operaciones
- **Validaciones de respuesta** y códigos de estado
- **Datos de prueba** predefinidos

### 🏦 Elegibilidad Comafi (BDD)
**Feature:** `tests/features/api/comafi-eligibility.feature`
- **Consulta de elegibilidad** de préstamos
- **Autenticación requerida** con token Bearer
- **Validación de CUIT** y datos de elegibilidad
- **Casos positivos y negativos** con diferentes CUITs
- **Validación de estructura** completa de respuesta JSON

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
Las credenciales están configuradas en `tests/utils/config.js`:

```javascript
credentials: {
  clientId: '5872d210',
  clientSecret: 'b18338211e2f6527ec04ead2c556252',
  authHeader: 'Basic NTg3MmQyMTA6YjE4MzM4MjExZTJmNjUyN2VjMDRlYWQyYzU1NjI1Mg=='
}
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

Los reportes se generan en la carpeta `reports/`:
- `test-results.json` - Resultados en formato JSON
- Cobertura de código con NYC

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

  @smoke @auth
  Scenario: Obtener exitosamente token de acceso con credenciales de cliente
    When envío una petición POST al endpoint de autenticación
    Then debería recibir un código de estado 200
    And la respuesta debería contener un token de acceso válido
    And debería guardar el token de acceso para uso futuro
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

  @smoke @contracts
  Scenario: Recuperar lista de contratos
    When envío una petición GET a "/api/contracts"
    Then debería recibir un código de estado 200
    And la respuesta debería contener una lista de contratos
```

## 📝 Notas

- **Tests BDD en español latino** - Todos los features están traducidos
- **Estructura limpia** - Sin redundancia en step definitions
- **Configuración por perfiles** - Development, staging, production
- **Tests de OAuth2** pueden fallar si las credenciales están expiradas
- **Tests de demo** usan JSONPlaceholder que siempre funciona
- **Smoke tests** verifican conectividad básica
- **Step definitions** organizados por funcionalidad

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver archivo LICENSE para detalles.