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
    And la respuesta debería contener información de cuotas
    And la respuesta debería contener información de intereses

  @simulation @validation @simulation-flow
  Scenario: Validar estructura completa de respuesta de simulación
    Given tengo datos de simulación válidos
    When envío una petición POST a "/api/v1/products/loans/simulation"
    Then debería recibir un código de estado 200
    And la respuesta debería contener el campo currency_code
    And la respuesta debería contener el campo amount
    And la respuesta debería contener el campo installments
    And la respuesta debería contener el campo interest_rate
    And la respuesta debería contener el campo total_amount
