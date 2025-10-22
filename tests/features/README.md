# 🥒 Estructura BDD de Cucumber

Esta es la estructura mejorada de Cucumber para el proyecto QA-Pactum-Contratos.

## 📁 Estructura de Carpetas

```
tests/features/
├── support/                    # Archivos de soporte
│   ├── hooks.js               # Hooks de Cucumber (Before, After, etc.)
│   ├── world.js               # Constructor personalizado de World
│   └── config.js              # Configuración por entornos
├── step_definitions/          # Definiciones de pasos organizadas por dominio
│   ├── auth_steps.js         # Pasos de autenticación
│   └── api_steps.js          # Pasos de APIs
├── auth/                     # Features de autenticación
│   └── authentication.feature
├── api/                      # Features de APIs
│   └── contracts.feature
└── reports/                  # Reportes generados
    ├── cucumber-report.json
    └── cucumber-report.html
```

## 🚀 Comandos Disponibles

### Tests de Cucumber
```bash
# Todos los tests de Cucumber
npm run test:cucumber

# Solo tests de autenticación
npm run test:cucumber:auth

# Solo tests de API
npm run test:cucumber:api

# Solo tests marcados como @smoke
npm run test:cucumber:smoke

# Desarrollo (formato simple)
npm run test:cucumber:dev

# CI/CD (con reportes)
npm run test:cucumber:ci
```

### Tests por Etiquetas
```bash
# Solo tests de autenticación
cucumber-js --tags @auth

# Solo tests de humo
cucumber-js --tags @smoke

# Excluir tests negativos
cucumber-js --tags "not @negative"

# Combinar etiquetas
cucumber-js --tags "@auth and @smoke"
```

## 🏗️ Arquitectura

### **Archivos de Soporte**
- **hooks.js**: Maneja el ciclo de vida de los tests
- **world.js**: Constructor personalizado con ayudantes
- **config.js**: Configuración por entornos

### **Definiciones de Pasos**
- **auth_steps.js**: Pasos específicos de autenticación
- **api_steps.js**: Pasos genéricos de APIs

### **Features**
- **auth/**: Features de autenticación OAuth2
- **api/**: Features de APIs de negocio

## 🏷️ Etiquetas Disponibles

- `@smoke`: Tests críticos de humo
- `@auth`: Tests de autenticación
- `@api`: Tests de APIs
- `@negative`: Tests de casos negativos
- `@performance`: Tests de rendimiento
- `@token-validation`: Tests de validación de tokens

## 🔧 Configuración

### Entornos
- **development**: Configuración local
- **staging**: Configuración de staging
- **production**: Configuración de producción

### Variables de Entorno
```bash
NODE_ENV=development  # Entorno actual
CLIENT_ID=           # ID del cliente (producción)
CLIENT_SECRET=       # Secret del cliente (producción)
AUTH_HEADER=         # Header de autenticación (producción)
```

## 📊 Reportes

Los reportes se generan automáticamente en:
- `tests/reports/cucumber-report.json`
- `tests/reports/cucumber-report.html`

## 🔄 Flujo de Trabajo

1. **Desarrollo**: Usar `npm run test:cucumber:dev`
2. **Testing**: Usar `npm run test:cucumber:auth` para tests específicos
3. **CI/CD**: Usar `npm run test:cucumber:ci` para pipelines
4. **Tests de Humo**: Usar `npm run test:cucumber:smoke` para validaciones rápidas

## 💡 Mejores Prácticas

1. **Organización**: Features separadas por dominio
2. **Reutilización**: Pasos genéricos en archivos separados
3. **Configuración**: Diferentes configuraciones por entorno
4. **Etiquetas**: Uso estratégico de etiquetas para filtrado
5. **Reportes**: Generación automática de reportes
6. **Hooks**: Manejo centralizado del ciclo de vida
