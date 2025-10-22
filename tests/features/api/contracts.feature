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

  @contracts @create
  Scenario: Crear un nuevo contrato
    Given tengo datos de contrato
    When envío una petición POST a "/api/contracts"
    Then debería recibir un código de estado 201
    And la respuesta debería contener el contrato creado

  @contracts @update
  Scenario: Actualizar un contrato existente
    Given tengo un contrato existente
    And tengo datos de contrato actualizados
    When envío una petición PUT a "/api/contracts/{contractId}"
    Then debería recibir un código de estado 200
    And la respuesta debería contener el contrato actualizado

  @contracts @delete
  Scenario: Eliminar un contrato
    Given tengo un contrato existente
    When envío una petición DELETE a "/api/contracts/{contractId}"
    Then debería recibir un código de estado 204
