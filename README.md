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
│   │   │   ├── comafi-simulacion.feature
│   │   │   ├── galicia-eligibility.feature
│   │   │   └── galicia-simulacion.feature
│   │   ├── step_definitions/  # Definiciones de pasos
│   │   │   ├── comafi-auth_steps.js
│   │   │   ├── api_steps.js
│   │   │   ├── comafi-eligibility_steps.js
│   │   │   ├── comafi-simulation_steps.js
│   │   │   ├── galicia_eligibility_steps.js
│   │   │   └── galicia-simulation_steps.js
│   │   └── support/           # Configuración y helpers
│   │       ├── hooks.js
│   │       ├── world.js
│   │       └── config.js
│   └── temp_token.txt         # Token temporal para flujos secuenciales
├── reports/                   # Reportes de pruebas
│   ├── cucumber-report.json   # Reporte JSON
│   └── cucumber-report.html   # Reporte HTML
├── cucumber.js               # Configuración de Cucumber
└── package.json             # Configuración del proyecto
```

## 🛠️ Instalación

### Requisitos Previos

Antes de instalar, asegúrate de tener instalado:

- **Node.js** (versión 20, 22 o >=24) - [Descargar Node.js](https://nodejs.org/)
  - ⚠️ **Importante**: Cucumber.js requiere Node.js 20, 22 o >=24. Node.js 18 no es compatible.
- **npm** (viene incluido con Node.js) - Verificar versión: `npm --version`
- **Git** (para clonar el repositorio) - [Descargar Git](https://git-scm.com/)

### Verificar Requisitos

```bash
# Verificar Node.js
node --version    # Debe ser v20, v22 o >=v24 (Cucumber requiere estas versiones)

# Verificar npm
npm --version     # Debe ser v9 o superior

# Verificar Git
git --version
```

### Instalación Paso a Paso

#### 1. Clonar el Repositorio

```bash
# Clonar desde GitHub
git clone https://github.com/CMaidanaDifranco/QA-Pactum-Contratos.git

# O descargar y extraer el ZIP, luego navegar a la carpeta
cd QA-Pactum-Contratos
```

#### 2. Instalar Dependencias

```bash
# Instalar todas las dependencias (Pactum, Cucumber, Chai, Mocha, etc.)
npm install
```

Este comando instalará automáticamente:
- ✅ **@cucumber/cucumber** - Framework BDD
- ✅ **@cucumber/html-formatter** - Generador de reportes HTML
- ✅ **pactum** - Framework de testing API
- ✅ **chai** - Librería de aserciones
- ✅ **mocha** - Test runner
- ✅ **cucumber-html-reporter** - Reporter de Cucumber
- ✅ **nyc** - Cobertura de código

> **Nota**: Después de `npm install`, se ejecutará automáticamente el script `verify:install` que verificará que todas las dependencias se instalaron correctamente.

#### 3. Verificar Instalación

```bash
# Verificar que todas las dependencias se instalaron correctamente
npm run verify:install

# O verificar manualmente
npm list --depth=0
```

#### 4. Ejecutar Tests de Verificación

```bash
# Ejecutar un test simple para verificar que todo funciona
npm run test:cucumber:smoke
```

### Instalación Rápida (Un Solo Comando)

```bash
# Clonar e instalar en un solo paso (bash/Linux/Mac)
git clone https://github.com/CMaidanaDifranco/QA-Pactum-Contratos.git && cd QA-Pactum-Contratos && npm install && npm run verify:install
```

### Solución de Problemas

#### Error: "npm: command not found"
- **Solución**: Instala Node.js desde [nodejs.org](https://nodejs.org/)

#### Error: "EACCES: permission denied"
- **Solución**: En Linux/Mac, usa `sudo npm install` o configura npm para no usar sudo:
  ```bash
  mkdir ~/.npm-global
  npm config set prefix '~/.npm-global'
  export PATH=~/.npm-global/bin:$PATH
  ```

#### Error: "ERESOLVE unable to resolve dependency"
- **Solución**: Usa `npm install --legacy-peer-deps` o actualiza npm:
  ```bash
  npm install -g npm@latest
  npm install
  ```

#### Error: "Cannot find module '@cucumber/cucumber'"
- **Solución**: Reinstala las dependencias:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### Verificación Post-Instalación

Después de instalar, verifica que todo esté correcto:

```bash
# 1. Verificar estructura de carpetas
ls tests/features/

# 2. Verificar que los módulos están instalados
npm list @cucumber/cucumber pactum chai

# 3. Ejecutar un test de ejemplo
npm run test:cucumber:auth-token
```

### Actualizar Dependencias

```bash
# Verificar dependencias desactualizadas
npm outdated

# Actualizar todas las dependencias
npm update

# Actualizar a las últimas versiones (puede romper compatibilidad)
npm install @cucumber/cucumber@latest pactum@latest --save-dev
```

## 🧪 Ejecutar Pruebas

### Flujos Secuenciales de Pruebas (Recomendado para CI/CD)

Estos comandos ejecutan features específicos en secuencia, ideales para GitHub Actions y pipelines de CI/CD:

```bash
# 1. Comafi completo: Autenticación + Elegibilidad + Simulación
npm run test:comafi:full

# 2. Comafi: Autenticación + Elegibilidad
npm run test:comafi:auth-eligibility

# 3. Galicia: Solo Elegibilidad
npm run test:galicia:eligibility

# 4. Galicia: Elegibilidad + Simulación
npm run test:galicia:eligibility-simulation
```

**Características:**
- ✅ Ejecuta features en secuencia (uno después del otro)
- ✅ Funciona en todos los sistemas operativos (Windows, Linux, Mac)
- ✅ Muestra resumen detallado al finalizar
- ✅ Detiene ejecución si un feature falla (configurable)
- ✅ Ideal para GitHub Actions y CI/CD

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
npx cucumber-js tests/features/api/galicia-eligibility.feature
npx cucumber-js tests/features/api/galicia-simulacion.feature

# Ejecutar por tags (IMPORTANTE: incluir la ruta)
npx cucumber-js tests/features/ --tags "@smoke"
npx cucumber-js tests/features/ --tags "@auth"
npx cucumber-js tests/features/ --tags "@eligibility"
npx cucumber-js tests/features/ --tags "@simulation"
npx cucumber-js tests/features/ --tags "@galicia"

# Combinar tags
npx cucumber-js tests/features/ --tags "@auth and @smoke"
npx cucumber-js tests/features/ --tags "@eligibility and @smoke"
npx cucumber-js tests/features/ --tags "@simulation and @smoke"
npx cucumber-js tests/features/ --tags "@galicia and @smoke"

# Flujos secuenciales (autenticación + funcionalidad)
npx cucumber-js tests/features/ --tags "@auth-token"
npx cucumber-js tests/features/ --tags "@eligibility-flow"
npx cucumber-js tests/features/ --tags "@simulation-flow"

# Ejecutar autenticación y elegibilidad en secuencia
# En bash/Linux/Mac:
npx cucumber-js tests/features/ --tags "@auth-token" && npx cucumber-js tests/features/ --tags "@eligibility-flow"

# En PowerShell (Windows) - OPCIÓN 1: Ejecutar por separado
npx cucumber-js tests/features/ --tags "@auth-token"
npx cucumber-js tests/features/ --tags "@eligibility-flow"

# En PowerShell (Windows) - OPCIÓN 2: Con verificación de éxito
npx cucumber-js tests/features/ --tags "@auth-token"; if ($?) { npx cucumber-js tests/features/ --tags "@eligibility-flow" }

# OPCIÓN 3: Usar los scripts NPM (funciona en todos los sistemas - RECOMENDADO):
npm run test:cucumber:auth-to-eligibility
npm run test:cucumber:auth-to-simulation

# Modo dry-run (sin ejecutar)
npx cucumber-js tests/features/ --dry-run
```

### Scripts NPM Disponibles
```bash
# Tests BDD con Cucumber
npm run test:cucumber                    # Todos los features
npm run test:cucumber:auth              # Solo autenticación
npm run test:cucumber:api                # Solo APIs
npm run test:cucumber:smoke              # Solo smoke tests
npm run test:cucumber:dev                # Perfil development
npm run test:cucumber:ci                 # Perfil CI/CD

# Flujos secuenciales
npm run test:cucumber:auth-token         # Solo obtener token
npm run test:cucumber:eligibility-flow   # Flujo de elegibilidad
npm run test:cucumber:simulation-flow    # Flujo de simulación
npm run test:cucumber:auth-to-eligibility # Auth + elegibilidad
npm run test:cucumber:auth-to-simulation  # Auth + simulación

# Generación de reportes
npm run report:html                      # Generar reporte HTML desde JSON
npm run test:cucumber:with-report        # Ejecutar tests y generar reporte HTML

# Verificación e instalación
npm run verify:install                   # Verificar que todas las dependencias están instaladas
# Nota: Este script se ejecuta automáticamente después de 'npm install' (postinstall)

# Flujos secuenciales de pruebas (para CI/CD y GitHub Actions)
npm run test:comafi:full                 # Comafi completo: auth + eligibility + simulation
npm run test:comafi:auth-eligibility     # Comafi: auth + eligibility
npm run test:galicia:eligibility         # Galicia: eligibility
npm run test:galicia:eligibility-simulation # Galicia: eligibility + simulation
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

### 🏦 Elegibilidad Galicia (BDD)
**Feature:** `tests/features/api/galicia-eligibility.feature`
- **Consulta de elegibilidad** de préstamos en Galicia
- **Autenticación con app_id y app_key** (sin token Bearer)
- **Validación de CUIT** y datos de elegibilidad
- **Casos positivos y negativos** con diferentes CUITs
- **Validación de estructura** completa de respuesta JSON
- **Validación de ofertas** con estructura detallada
- **Manejo de errores** (400, 500, 503, 504)

### 📊 Simulación Galicia (BDD)
**Feature:** `tests/features/api/galicia-simulacion.feature`
- **Simulación de préstamos** en Galicia con datos de financiamiento
- **Autenticación con app_id y app_key** (sin token Bearer)
- **Validación de parámetros** de simulación (monto, cuotas, tasa, condiciones comerciales)
- **Cálculo de condiciones** de financiamiento (CFT, TNA, TEA, TEM)
- **Validación de estructura** completa de respuesta JSON
- **Validación de datos financieros** (monto crédito, cuota promedio, subsidios)
- **Validación de cuotas** con estructura detallada (amortización, intereses, IVA)
- **Manejo de errores** (400, 403)

## 🏷️ Etiquetas Disponibles

### Etiquetas por Funcionalidad
- `@smoke`: Tests críticos de humo
- `@auth`: Tests de autenticación
- `@eligibility`: Tests de elegibilidad
- `@simulation`: Tests de simulación
- `@galicia`: Tests de APIs Galicia
- `@negative`: Tests de casos negativos
- `@performance`: Tests de rendimiento
- `@token-validation`: Tests de validación de tokens
- `@validation`: Tests de validación de estructura
- `@error`: Tests de manejo de errores

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

# Ejecutar autenticación y elegibilidad en secuencia
# En bash/Linux/Mac:
npx cucumber-js tests/features/ --tags "@auth-token" && npx cucumber-js tests/features/ --tags "@eligibility-flow"

# En PowerShell (Windows) - OPCIÓN 1: Ejecutar por separado
npx cucumber-js tests/features/ --tags "@auth-token"
npx cucumber-js tests/features/ --tags "@eligibility-flow"

# En PowerShell (Windows) - OPCIÓN 2: Con verificación de éxito
npx cucumber-js tests/features/ --tags "@auth-token"; if ($?) { npx cucumber-js tests/features/ --tags "@eligibility-flow" }

# OPCIÓN 3: Usar scripts NPM (funciona en todos los sistemas - RECOMENDADO):
npm run test:cucumber:auth-to-eligibility

# Combinar etiquetas
npx cucumber-js tests/features/ --tags "@auth and @smoke"
npx cucumber-js tests/features/ --tags "@eligibility and @smoke"
npx cucumber-js tests/features/ --tags "@galicia and @smoke"
npx cucumber-js tests/features/ --tags "@galicia and @validation"

# Excluir tests negativos
npx cucumber-js tests/features/ --tags "not @negative"
npx cucumber-js tests/features/ --tags "not @error"
```

### 🔧 Características Técnicas
- **Timeout extendido** - 90 segundos para endpoints de Galicia, 30 segundos para otros endpoints de simulación/elegibilidad
- **Timeout de Cucumber** - 120 segundos para permitir peticiones HTTP largas
- **Token persistence** - Reutilización de tokens entre ejecuciones
- **Reportes HTML/JSON** - Análisis detallado de resultados
- **Configuración por ambientes** - Development, staging, production
- **Flujos secuenciales** - Autenticación + funcionalidad

## 🔧 Configuración

### Credenciales OAuth2
Las credenciales están configuradas en `tests/features/support/config.js`:

```javascript
// Development/Staging (valores hardcodeados - solo para QA)
auth: {
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret',
  authHeader: 'Basic YOUR_BASE64_ENCODED_CREDENTIALS',
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

⚠️ **IMPORTANTE - Seguridad:**
- **NUNCA** expongas credenciales reales en el código o documentación pública
- Usa variables de entorno para producción
- Las credenciales de desarrollo/staging deben estar en archivos de configuración locales (no versionados)
- Considera usar `.env` files con `.gitignore` para credenciales sensibles

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

### Tests BDD (Cucumber)
- **`cucumber-report.json`** - Resultados estructurados en JSON
- **`cucumber-report.html`** - Reporte visual interactivo
- **Configuración automática** - Se generan con cada ejecución
- **Análisis detallado** - Por feature, escenario y paso

### Generar Reporte HTML
```bash
# Generar reporte HTML desde el JSON existente
npm run report:html

# Ejecutar tests y generar reporte en un solo comando
npm run test:cucumber:with-report
```

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
      'Authorization': 'Basic YOUR_BASE64_ENCODED_CREDENTIALS'
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
        'Authorization': 'Basic YOUR_BASE64_ENCODED_CREDENTIALS'
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

### Test de Simulación Comafi (BDD)
```gherkin
Feature: API de Simulación Comafi
  Como usuario del sistema
  Quiero simular un préstamo
  Para poder calcular las condiciones y montos de financiamiento

  Background:
    Given tengo un token de acceso válido
    And el servicio de simulación está disponible

  @smoke @simulation @simulation-flow
  Scenario: Simular préstamo con datos válidos
    Given tengo datos de simulación válidos
    When envío una petición POST a "/api/v1/products/loans/simulation"
    Then debería recibir un código de estado 200
    And la respuesta debería contener datos de simulación válidos
```

### Test de Elegibilidad Galicia (BDD)
```gherkin
Feature: API de Elegibilidad Galicia
  Como usuario del sistema
  Quiero consultar la elegibilidad de préstamos en Galicia
  Para poder determinar si un CUIT es apto para una oferta crediticia

  Background:
    Given el servicio de elegibilidad Galicia está disponible

  @smoke @galicia @eligibility @eligibility-flow
  Scenario: Consultar elegibilidad con CUIT válido
    Given tengo datos de elegibilidad Galicia válidos
    When envío una petición POST a "/galicia/v1/agfi/gateway-nera/prestamo/elegibilidad"
    Then debería recibir un código de estado 200
    And la respuesta debería contener el campo data
    And la respuesta debería contener numeroTransaccion
    And la respuesta debería contener ofertas
```

### Test de Simulación Galicia (BDD)
```gherkin
Feature: API de Simulación Galicia
  Como usuario del sistema
  Quiero simular un préstamo en Galicia
  Para poder calcular las condiciones y montos de financiamiento

  Background:
    Given el servicio de simulación Galicia está disponible

  @smoke @galicia @simulation @simulation-flow
  Scenario: Simular préstamo con datos válidos
    Given tengo datos de simulación Galicia válidos
    When envío una petición POST a "/galicia/v1/agfi/gateway-nera/prestamo/simulacion"
    Then debería recibir un código de estado 200
    And la respuesta debería contener el campo meta
    And la respuesta debería contener el campo data
    And la respuesta debería contener numeroTransaccion en data
    And la respuesta debería contener idOferta en data
    And la respuesta debería contener idLinea en data
    And la respuesta debería contener datosFinancieros en data
    And la respuesta debería contener cuotas en data
```

## 📝 Notas

- **Tests BDD en español latino** - Todos los features están traducidos
- **Arquitectura BDD pura** - Solo Cucumber/Gherkin, sin tests unitarios
- **Enfoque en APIs Comafi y Galicia** - Autenticación, elegibilidad y simulación
- **Flujos secuenciales** - Autenticación + funcionalidad con persistencia de token
- **Timeout optimizado** - 10 segundos para endpoints complejos
- **Reportes automáticos** - HTML y JSON en cada ejecución
- **Token persistence** - Reutilización entre ejecuciones via `temp_token.txt`
- **Configuración por ambientes** - Development, staging, production
- **Step definitions organizados** - Por funcionalidad (auth, api, eligibility, simulation, galicia)
- **Estructura limpia** - Sin archivos obsoletos o no utilizados

## 🚀 GitHub Actions (CI/CD)

El proyecto incluye un workflow de GitHub Actions configurado para ejecutar los tests automáticamente.

### Workflow Disponible

El archivo `.github/workflows/tests.yml` está configurado para:

- ✅ Ejecutarse en push y pull requests a `main` y `develop`
- ✅ **Ejecución programada**: Lunes a Viernes a las 8:00 AM (UTC-3)
- ✅ Ejecutar los 4 flujos de pruebas en paralelo usando matrix strategy
- ✅ Generar reportes HTML automáticamente
- ✅ Subir reportes como artefactos descargables
- ✅ **Publicar reportes en GitHub Pages** (solo en branch `main`)
- ✅ **Enviar reportes por email** automáticamente
- ⚠️ **Tests de Galicia**: Configurados con `continue-on-error: true` porque el servidor puede no ser accesible desde GitHub Actions (firewall/red privada)

### Ejecución Programada (Cron)

Los tests se ejecutan automáticamente **cada día laboral (Lunes a Viernes) a las 8:00 AM** (hora Argentina, UTC-3).

- **Horario**: 8:00 AM (UTC-3) = 11:00 AM (UTC)
- **Días**: Lunes (1) a Viernes (5)
- **Configuración**: `cron: '0 11 * * 1-5'`

Para cambiar el horario, edita el archivo `.github/workflows/tests.yml` y ajusta el valor del cron.

### Ejecutar Tests Manualmente en GitHub

Puedes ejecutar los tests manualmente desde la pestaña "Actions" en GitHub:

1. Ve a **Actions** → **Tests QA Pactum Contratos**
2. Click en **Run workflow**
3. Selecciona el suite de tests a ejecutar:
   - `comafi:full` - Comafi completo
   - `comafi:auth-eligibility` - Comafi auth + eligibility
   - `galicia:eligibility` - Galicia eligibility
   - `galicia:eligibility-simulation` - Galicia eligibility + simulation
4. Opcional: Marca/desmarca "Enviar reporte por email"
5. Click en **Run workflow**

### Ver Reportes en GitHub Actions

Después de que los tests completen, los reportes son visibles de múltiples formas:

#### 1. Resumen Visual en Workflow Summary
- **Ubicación**: Al final de cada ejecución del workflow, en la sección "Summary"
- **Contenido**: 
  - 📊 Estadísticas de tests (pasados, fallidos, omitidos)
  - 📈 Tasa de éxito
  - ⏱️ Tiempo de ejecución
  - 📝 Detalles de cada escenario
  - 🔗 Enlaces a reportes completos
- **Ventaja**: No necesitas descargar nada, todo está visible directamente en GitHub

#### 2. Artefactos Descargables
1. Ve a la ejecución del workflow
2. Scroll hasta la sección "Artifacts"
3. Descarga el artefacto `cucumber-report-<suite-name>` para cada suite
4. O descarga el artefacto `consolidated-report` para ver todos los reportes consolidados
5. Abre el archivo HTML en tu navegador

#### 3. Resumen Consolidado
- Al final de la ejecución, hay un resumen consolidado que muestra todos los suites ejecutados
- Incluye enlaces directos a cada reporte

### Reportes en GitHub Pages

Los reportes se publican automáticamente en GitHub Pages cuando se ejecutan en la rama `main`:

- **URL**: `https://<usuario>.github.io/<repositorio>/reports/<run-number>/cucumber-report.html`
- Solo se publica el reporte del suite `comafi:full` para evitar duplicados

### Configuración de Email

Para recibir reportes por email, necesitas configurar los siguientes **Secrets** en GitHub:

1. Ve a **Settings** → **Secrets and variables** → **Actions**
2. Agrega los siguientes secrets:

#### Secrets Requeridos para Email:

| Secret | Descripción | Ejemplo |
|--------|-------------|---------|
| `SMTP_SERVER` | Servidor SMTP | `smtp.gmail.com` o `smtp.office365.com` |
| `SMTP_PORT` | Puerto SMTP | `587` (TLS) o `465` (SSL) |
| `SMTP_USERNAME` | Usuario SMTP | `tu-email@gmail.com` |
| `SMTP_PASSWORD` | Contraseña SMTP | Tu contraseña o App Password |
| `EMAIL_FROM` | Email remitente | `qa-tests@tu-empresa.com` |
| `EMAIL_TO` | Email destinatario | `equipo-qa@tu-empresa.com` |

#### Configuración para Gmail:

1. Habilita "Contraseñas de aplicaciones" en tu cuenta de Google
2. Genera una contraseña de aplicación
3. Usa estos valores:
   - `SMTP_SERVER`: `smtp.gmail.com`
   - `SMTP_PORT`: `587`
   - `SMTP_USERNAME`: Tu email de Gmail
   - `SMTP_PASSWORD`: La contraseña de aplicación generada
   - `EMAIL_FROM`: Tu email de Gmail
   - `EMAIL_TO`: Email donde quieres recibir los reportes

#### Configuración para Office 365 / Outlook:

1. Usa estos valores:
   - `SMTP_SERVER`: `smtp.office365.com`
   - `SMTP_PORT`: `587`
   - `SMTP_USERNAME`: Tu email de Office 365
   - `SMTP_PASSWORD`: Tu contraseña de Office 365
   - `EMAIL_FROM`: Tu email de Office 365
   - `EMAIL_TO`: Email donde quieres recibir los reportes

#### Configuración para Otros Servidores SMTP:

Consulta la documentación de tu proveedor de email para obtener los valores correctos de servidor y puerto.

### Notas sobre Email

- ✅ Los emails se envían automáticamente en ejecuciones programadas (cron)
- ✅ Los emails se pueden enviar manualmente desde `workflow_dispatch` (opción configurable)
- ✅ El reporte HTML se adjunta como archivo al email
- ✅ El email incluye enlaces directos a los reportes en GitHub
- ⚠️ Los emails NO se envían en push/PR para evitar spam

### Notas sobre Tests de Galicia en GitHub Actions

⚠️ **Importante**: Los tests de Galicia pueden fallar en GitHub Actions debido a:

1. **Accesibilidad del servidor**: El servidor de Galicia (`midware-partners-gateway-middleware-galicia-staging-avafy.dev.nera-agro.com`) puede no ser accesible desde las IPs de GitHub Actions
2. **Firewall/Whitelist**: El servidor puede estar configurado para bloquear conexiones desde internet público
3. **Red privada/VPN**: El servidor puede requerir VPN o estar en una red privada

**Solución implementada**:
- Los tests de Galicia están configurados con `continue-on-error: true`
- Esto permite que el workflow continúe aunque los tests de Galicia fallen
- Los tests funcionan correctamente en local
- Se genera un warning en el workflow cuando los tests de Galicia fallan

**Para resolver**:
- Verifica que el servidor de Galicia sea accesible desde internet público
- Si el servidor requiere whitelist, agrega las IPs de GitHub Actions
- Considera usar un runner self-hosted si el servidor está en una red privada

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver archivo LICENSE para detalles.