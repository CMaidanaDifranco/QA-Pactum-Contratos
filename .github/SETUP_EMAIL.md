# Configuración de Email para GitHub Actions

Esta guía te ayudará a configurar el envío automático de reportes por email en GitHub Actions.

## 📋 Requisitos Previos

1. Acceso de administrador al repositorio de GitHub
2. Un servidor SMTP configurado (Gmail, Office 365, o servidor propio)
3. Credenciales de acceso al servidor SMTP

## 🔧 Pasos de Configuración

### 1. Acceder a Secrets de GitHub

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Secrets and variables** → **Actions**
4. Click en **New repository secret**

### 2. Agregar Secrets Requeridos

Agrega los siguientes secrets uno por uno:

#### SMTP_SERVER
- **Nombre**: `SMTP_SERVER`
- **Valor**: Dirección del servidor SMTP
  - Gmail: `smtp.gmail.com`
  - Office 365: `smtp.office365.com`
  - Outlook: `smtp-mail.outlook.com`
  - Otros: Consulta con tu proveedor

#### SMTP_PORT
- **Nombre**: `SMTP_PORT`
- **Valor**: Puerto del servidor SMTP
  - TLS: `587` (recomendado)
  - SSL: `465`
  - Sin encriptación: `25` (no recomendado)

#### SMTP_USERNAME
- **Nombre**: `SMTP_USERNAME`
- **Valor**: Tu email o usuario SMTP
  - Ejemplo: `tu-email@gmail.com`

#### SMTP_PASSWORD
- **Nombre**: `SMTP_PASSWORD`
- **Valor**: Contraseña o App Password
  - **Gmail**: Necesitas generar una "Contraseña de aplicación"
  - **Office 365**: Tu contraseña normal
  - **Otros**: Consulta con tu proveedor

#### EMAIL_FROM
- **Nombre**: `EMAIL_FROM`
- **Valor**: Email que aparecerá como remitente
  - Ejemplo: `qa-tests@tu-empresa.com`
  - Debe ser el mismo que `SMTP_USERNAME` en la mayoría de casos

#### EMAIL_TO
- **Nombre**: `EMAIL_TO`
- **Valor**: Email donde quieres recibir los reportes
  - Puede ser un solo email: `equipo-qa@tu-empresa.com`
  - O múltiples emails separados por comas: `email1@empresa.com,email2@empresa.com`

## 📧 Configuración Específica por Proveedor

### Gmail

1. **Habilitar Contraseñas de Aplicación**:
   - Ve a tu cuenta de Google: https://myaccount.google.com/
   - Click en **Seguridad**
   - Activa **Verificación en 2 pasos** (requerido)
   - Ve a **Contraseñas de aplicaciones**
   - Genera una nueva contraseña para "Correo" y "Otro (nombre personalizado)": "GitHub Actions"
   - Copia la contraseña generada (16 caracteres)

2. **Configurar Secrets**:
   ```
   SMTP_SERVER: smtp.gmail.com
   SMTP_PORT: 587
   SMTP_USERNAME: tu-email@gmail.com
   SMTP_PASSWORD: [la contraseña de aplicación de 16 caracteres]
   EMAIL_FROM: tu-email@gmail.com
   EMAIL_TO: destinatario@empresa.com
   ```

### Office 365 / Outlook

1. **Configurar Secrets**:
   ```
   SMTP_SERVER: smtp.office365.com
   SMTP_PORT: 587
   SMTP_USERNAME: tu-email@tu-empresa.com
   SMTP_PASSWORD: [tu contraseña de Office 365]
   EMAIL_FROM: tu-email@tu-empresa.com
   EMAIL_TO: destinatario@empresa.com
   ```

### Servidor SMTP Propio

1. **Configurar Secrets**:
   ```
   SMTP_SERVER: smtp.tu-empresa.com
   SMTP_PORT: 587 (o el puerto que uses)
   SMTP_USERNAME: usuario-smtp
   SMTP_PASSWORD: contraseña-smtp
   EMAIL_FROM: no-reply@tu-empresa.com
   EMAIL_TO: equipo-qa@tu-empresa.com
   ```

## ✅ Verificar Configuración

1. Ve a **Actions** en GitHub
2. Click en **Tests QA Pactum Contratos**
3. Click en **Run workflow**
4. Marca la opción "Enviar reporte por email"
5. Click en **Run workflow**
6. Espera a que termine la ejecución
7. Revisa tu bandeja de entrada (y spam) para el email

## 🔍 Solución de Problemas

### Error: "Authentication failed"

- Verifica que `SMTP_USERNAME` y `SMTP_PASSWORD` sean correctos
- Para Gmail, asegúrate de usar una "Contraseña de aplicación", no tu contraseña normal
- Verifica que la verificación en 2 pasos esté activada (Gmail)

### Error: "Connection timeout"

- Verifica que `SMTP_SERVER` y `SMTP_PORT` sean correctos
- Asegúrate de que el puerto no esté bloqueado por firewall
- Prueba con el puerto alternativo (587 vs 465)

### No recibo emails

- Revisa la carpeta de spam
- Verifica que `EMAIL_TO` sea correcto
- Los emails solo se envían en:
  - Ejecuciones programadas (cron)
  - Ejecuciones manuales con "Enviar reporte por email" marcado
- Los emails NO se envían en push/PR automáticos

### Email llega sin adjunto

- Verifica que el reporte HTML se haya generado correctamente
- Revisa los logs del workflow para ver si hay errores
- El adjunto solo se incluye si el reporte se generó exitosamente

## 📝 Notas Importantes

- ⚠️ **Seguridad**: Nunca compartas los secrets públicamente
- 🔒 Los secrets están encriptados en GitHub
- 📧 Los emails se envían solo en ejecuciones programadas o manuales con la opción activada
- 🚫 Los emails NO se envían en push/PR para evitar spam
- 📎 El reporte HTML se adjunta como archivo al email
- 🔗 El email incluye enlaces directos a los reportes en GitHub

## 🆘 Soporte

Si tienes problemas con la configuración:

1. Revisa los logs del workflow en GitHub Actions
2. Verifica que todos los secrets estén configurados correctamente
3. Prueba con un servidor SMTP diferente (Gmail es el más fácil de configurar)
4. Consulta la documentación de tu proveedor de email

