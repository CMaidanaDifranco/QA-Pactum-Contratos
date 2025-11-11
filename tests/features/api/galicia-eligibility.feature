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

  @galicia @eligibility @validation @eligibility-flow
  Scenario: Validar estructura completa de respuesta de elegibilidad Galicia
    Given tengo datos de elegibilidad Galicia válidos
    When envío una petición POST a "/galicia/v1/agfi/gateway-nera/prestamo/elegibilidad"
    Then debería recibir un código de estado 200
    And la respuesta debería contener el campo meta
    And la respuesta debería contener el campo data
    And la respuesta debería contener numeroTransaccion
    And la respuesta debería contener marcaSoja
    And la respuesta debería contener esCliente
    And la respuesta debería contener marcaMipyme
    And la respuesta debería contener ofertas

  @galicia @eligibility @validation @eligibility-flow
  Scenario: Validar estructura de ofertas en respuesta
    Given tengo datos de elegibilidad Galicia válidos
    When envío una petición POST a "/galicia/v1/agfi/gateway-nera/prestamo/elegibilidad"
    Then debería recibir un código de estado 200
    And la respuesta debería contener ofertas
    And las ofertas deberían contener campos requeridos

  @galicia @eligibility @error @eligibility-flow
  Scenario: Consultar elegibilidad con datos inválidos
    Given tengo datos de elegibilidad Galicia inválidos
    When envío una petición POST a "/galicia/v1/agfi/gateway-nera/prestamo/elegibilidad"
    Then debería recibir un código de estado 400
    And la respuesta debería contener el campo errors

