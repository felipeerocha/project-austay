*** Settings ***
Library     SeleniumLibrary
Library     String
Library     Collections
Library     DateTime

Resource    ../../config.robot
Resource    ../../keywords.robot

Suite Setup       Configurar Suite Compartilhada
Suite Teardown    Close All Browsers
Test Setup        Preparar Teste
Test Teardown     Limpar Teste

*** Variables ***
${DATA_PAGAMENTO}      12-12-2025
${MEIO_PAGAMENTO}      Cartão de Crédito

*** Test Cases ***

CT01 Registrar pagamento com dados válidos
    [Documentation]    Testa registro completo de pagamento com dados válidos
    Dado que tenho um pagamento pendente na listagem
    Quando acesso os detalhes do pagamento pendente
    E clico no botão "Registrar pagamento"
    E preencho a data do pagamento    ${DATA_PAGAMENTO}
    E seleciono o meio de pagamento    ${MEIO_PAGAMENTO}
    Quando clico no botão "Salvar"
    E o modal deve ser fechado
    Então o status do pagamento deve ser atualizado para "pago"

CT02 Tentar registrar pagamento sem meio de pagamento
    [Documentation]    Valida obrigatoriedade do campo meio de pagamento
    Dado que tenho um pagamento pendente na listagem
    Quando acesso os detalhes do pagamento pendente
    E clico no botão "Registrar pagamento"
    E preencho a data do pagamento    ${DATA_PAGAMENTO}
    Então o botão "Salvar" deve estar desabilitado

CT03 Cancelar registro de pagamento
    [Documentation]    Testa o cancelamento do registro de pagamento
    Dado que tenho um pagamento pendente na listagem
    Quando acesso os detalhes do pagamento pendente
    E clico no botão "Registrar pagamento"
    E preencho a data do pagamento    ${DATA_PAGAMENTO}
    E seleciono o meio de pagamento    ${MEIO_PAGAMENTO}
    E clico no botão "Cancelar"
    E o pagamento deve permanecer com status "pendente"

CT04 Visualizar detalhes de pagamento
    [Documentation]    Testa a visualização de detalhes de pagamento
    Dado que tenho um pagamento na listagem
    Quando acesso os detalhes de um pagamento existente
    Então devem ser exibidas as informações do pagamento

*** Keywords ***

Preparar Teste
    Go To    ${BASE_URL}/payments
    Wait Until Element Is Visible    xpath=//*[contains(text(), 'Pagamentos')]    timeout=15s
    Sleep    2s

Limpar Teste
    ${modal_detalhes_aberto}=    Run Keyword And Return Status    Element Should Be Visible    xpath=//h2[contains(text(), 'Descrição pagamento')]
    Run Keyword If    ${modal_detalhes_aberto}    Click Element    xpath=//button[@aria-label='close']
    
    ${modal_registro_aberto}=    Run Keyword And Return Status    Element Should Be Visible    xpath=//h2[contains(text(), 'Registrar pagamento')]
    Run Keyword If    ${modal_registro_aberto}    Click Element    xpath=//button[@aria-label='close']
    
    Sleep    1s

# ========= ACTIONS =========

Dado que tenho um pagamento pendente na listagem
    Wait Until Element Is Visible    xpath=//span[contains(text(), 'pendente')]    timeout=15s
    Page Should Contain Element    xpath=//span[contains(text(), 'pendente')]

Dado que tenho um pagamento na listagem
    Wait Until Element Is Visible    xpath=//*[local-name()='svg' and @stroke='currentColor']    timeout=15s
    Page Should Contain Element    xpath=//*[local-name()='svg' and @stroke='currentColor']

Quando acesso os detalhes do pagamento pendente
    Wait Until Element Is Visible    xpath=//span[contains(text(), 'pendente')]    timeout=15s
    Sleep    1s
    Click Element    xpath=//span[contains(text(), 'pendente')]/following::*[local-name()='svg' and @stroke='currentColor'][1]
    Sleep    3s
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Descrição pagamento')]    timeout=10s

Quando acesso os detalhes de um pagamento existente
    Wait Until Element Is Visible    xpath=//span[contains(text(), 'pago')]    timeout=15s
    Sleep    1s
    Click Element    xpath=//span[contains(text(), 'pago')]/following::*[local-name()='svg' and @stroke='currentColor'][1]
    Sleep    2s
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Descrição pagamento')]    timeout=10s

E clico no botão "Registrar pagamento"
    Wait Until Element Is Visible    xpath=//button[contains(., 'Registrar pagamento')]    timeout=10s
    Click Element    xpath=//button[contains(., 'Registrar pagamento')]
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Registrar pagamento')]    timeout=10s

E preencho a data do pagamento
    [Arguments]    ${DATA}
    Wait Until Element Is Visible    xpath=//input[@type='date']    timeout=10s
    Input Text    xpath=//input[@type='date']    ${DATA}

E seleciono o meio de pagamento
    [Arguments]    ${MEIO_PAGAMENTO}
    Wait Until Element Is Visible    xpath=//span[contains(., 'Meio de pagamento')]    timeout=10s
    Sleep    1s
    Click Element    xpath=//div[@role='combobox' or contains(@class, 'MuiSelect-select')]
    Sleep    1s
    Wait Until Element Is Visible    xpath=//li[contains(., '${MEIO_PAGAMENTO}')]    timeout=5s
    Click Element    xpath=//li[contains(., '${MEIO_PAGAMENTO}')]
    Sleep    1s

Quando clico no botão "Salvar"
    Wait Until Element Is Visible    xpath=//button[contains(., 'Salvar')]    timeout=10s
    Click Element    xpath=//button[contains(., 'Salvar')]

E clico no botão "Cancelar"
    Wait Until Element Is Visible    xpath=//button[contains(., 'Cancelar')]    timeout=10s
    Click Element    xpath=//button[contains(., 'Cancelar')]

# ========= VALIDATIONS =========

E o modal deve ser fechado
    Wait Until Element Is Not Visible    xpath=//h2[contains(text(), 'Registrar pagamento')]    timeout=10s

Então o status do pagamento deve ser atualizado para "pago"
    Sleep    2s
    Wait Until Element Is Visible    xpath=//span[contains(text(), 'pago')]    timeout=15s
    Page Should Contain Element    xpath=//span[contains(text(), 'pago')]

Então o botão "Salvar" deve estar desabilitado
    Wait Until Element Is Visible    xpath=//button[contains(., 'Salvar')]    timeout=10s
    Element Should Be Disabled    xpath=//button[contains(., 'Salvar')]

E o pagamento deve permanecer com status "pendente"
    Sleep    2s
    Wait Until Element Is Visible    xpath=//span[contains(text(), 'pendente')]    timeout=10s
    Page Should Contain Element    xpath=//span[contains(text(), 'pendente')]

Então devem ser exibidas as informações do pagamento
    Page Should Contain    Tutor
    Page Should Contain    Pet
    Page Should Contain    Estadia
    Page Should Contain    Valor
    Page Should Contain    Status
    Page Should Contain    Data do pagamento