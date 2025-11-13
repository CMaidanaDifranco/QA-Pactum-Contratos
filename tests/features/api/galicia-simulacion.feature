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

  @galicia @simulation @validation @simulation-flow
  Scenario: Validar estructura completa de respuesta de simulación Galicia
    Given tengo datos de simulación Galicia válidos
    When envío una petición POST a "/galicia/v1/agfi/gateway-nera/prestamo/simulacion"
    Then debería recibir un código de estado 200
    And la respuesta debería contener el campo meta
    And la respuesta debería contener el campo data
    And la respuesta debería contener numeroTransaccion en data
    And la respuesta debería contener idOferta en data
    And la respuesta debería contener idLinea en data
    And la respuesta debería contener datosFinancieros en data
    And los datosFinancieros deberían contener campos requeridos
    And la respuesta debería contener cuotas en data
    And las cuotas deberían contener campos requeridos

  @galicia @simulation @error @simulation-flow
  Scenario: Simular préstamo con datos inválidos
    Given tengo datos de simulación Galicia inválidos
    When envío una petición POST a "/galicia/v1/agfi/gateway-nera/prestamo/simulacion"
    Then debería recibir un código de estado de error 400 o 403
    And la respuesta debería contener el campo errors o meta

