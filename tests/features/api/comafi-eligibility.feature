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

  @eligibility @validation @eligibility-flow
  Scenario: Validar estructura completa de respuesta de elegibilidad
    Given tengo datos de elegibilidad válidos
    When envío una petición POST a "/api/v1/products/loans/eligibility"
    Then debería recibir un código de estado 200
    And la respuesta debería contener el campo eligibility
    And la respuesta debería contener el campo is_eligible
    And la respuesta debería contener el campo friendly_message
    And la respuesta debería contener el campo reasons
