Feature: API de Autenticación Comafi
  Como usuario del sistema
  Quiero autenticarme con la API de Comafi
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

  @auth @negative
  Scenario: Fallar autenticación con credenciales inválidas
    Given tengo credenciales de cliente inválidas
    When envío una petición POST al endpoint de autenticación
    Then debería recibir un código de estado 400
    And la respuesta debería contener un mensaje de error

  @auth @token-validation
  Scenario: Validar estructura completa de respuesta del token
    When envío una petición POST al endpoint de autenticación
    Then debería recibir un código de estado 200
    And la respuesta debería contener un access_token
    And la respuesta debería contener expires_in con valor 1800
    And la respuesta debería contener token_type con valor "bearer"
    And la respuesta debería contener scope con valor "email profile"
    And debería guardar el token de acceso para uso futuro

  @auth @performance
  Scenario: El tiempo de respuesta de autenticación debe ser aceptable
    When envío una petición POST al endpoint de autenticación
    Then debería recibir un código de estado 200
    And el tiempo de respuesta debería ser menor a 5 segundos
    And la respuesta debería contener un token de acceso válido
