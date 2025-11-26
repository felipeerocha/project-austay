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
${START_TIME}          08:00
${END_TIME}            18:00
${DAILY_RATE}          100,00
${OBSERVATIONS}        Teste de agendamento automático - Pet precisa de alimentação especial

*** Test Cases ***

CT01 Criar agendamento com dados válidos
    [Documentation]    Testa criação completa de estadia com todos os dados
    E clico no botão "Agendar" na página inicial
    E seleciono o pet de teste no combobox
    E preencho a data de entrada
    E preencho a data de saída
    E preencho a hora de entrada
    E preencho a hora de saída
    E seleciono a forma de pagamento    Pix
    E preencho o valor da diária
    E preencho observações
    Quando clico no botão "Agendar" no modal
    Então o agendamento deve ser criado com sucesso
    E o modal deve ser fechado

CT02 Tentar criar agendamento sem pet selecionado
    [Documentation]    Valida obrigatoriedade do campo pet
    E clico no botão "Agendar" na página inicial
    E preencho a data de entrada
    E preencho a data de saída
    E preencho a hora de entrada
    E seleciono a forma de pagamento    Pix
    E preencho o valor da diária
    Quando clico no botão "Agendar" no modal
    Então deve exibir mensagem de erro de campos obrigatórios

CT03 Tentar criar agendamento sem data de entrada
    [Documentation]    Valida obrigatoriedade do campo data de entrada
    E clico no botão "Agendar" na página inicial
    E seleciono o pet de teste no combobox
    E preencho a data de saída
    E preencho a hora de entrada
    E seleciono a forma de pagamento    Pix
    E preencho o valor da diária
    Quando clico no botão "Agendar" no modal
    Então deve exibir mensagem de erro de campos obrigatórios

CT04 Tentar criar agendamento sem data de saída
    [Documentation]    Valida obrigatoriedade do campo data de saída
    E clico no botão "Agendar" na página inicial
    E seleciono o pet de teste no combobox
    E preencho a data de entrada
    E preencho a hora de entrada
    E seleciono a forma de pagamento    Pix
    E preencho o valor da diária
    Quando clico no botão "Agendar" no modal
    Então deve exibir mensagem de erro de campos obrigatórios

CT05 Tentar criar agendamento sem valor da diária
    [Documentation]    Valida obrigatoriedade do campo valor da diária
    E clico no botão "Agendar" na página inicial
    E seleciono o pet de teste no combobox
    E preencho a data de entrada
    E preencho a data de saída
    E seleciono a forma de pagamento    Pix
    E preencho a hora de entrada
    Quando clico no botão "Agendar" no modal
    Então deve exibir mensagem de erro de campos obrigatórios

CT06 Cálculo automático do valor total
    [Documentation]    Testa o cálculo automático do valor total baseado na diária e dias
    E clico no botão "Agendar" na página inicial
    E seleciono o pet de teste no combobox
    E preencho a data de entrada
    E seleciono a forma de pagamento    Pix
    E preencho a data de saída com 6 dias de diferença
    E preencho o valor da diária com 150,00
    Então o valor total deve ser calculado como 900,00

CT07 Cancelar criação de agendamento
    [Documentation]    Testa o cancelamento do fluxo de criação de estadia
    E clico no botão "Agendar" na página inicial
    E seleciono o pet de teste no combobox
    E preencho a data de entrada
    E preencho a data de saída
    E seleciono a forma de pagamento    Pix
    E clico no botão "Cancelar"
    Então o modal deve ser fechado
    E o agendamento não deve ser criado

*** Keywords ***

Preparar Teste
    Go To    ${BASE_URL}/home
    Wait Until Element Is Visible    xpath=//button[contains(., 'Agendar') and not(ancestor::*[contains(@class, 'Modal')])]    timeout=10s

Limpar Teste
    ${modal_aberto}=    Run Keyword And Return Status    Element Should Be Visible    xpath=//h2[contains(text(), 'Agendar')]
    Run Keyword If    ${modal_aberto}    Click Element    xpath=//button[contains(., 'Cancelar')]
    Sleep    1s

# ========= AGENDAMENTO =========

E clico no botão "Agendar" na página inicial
    Wait Until Element Is Visible    xpath=//button[contains(., 'Agendar') and not(ancestor::*[contains(@class, 'Modal')])]    timeout=10s
    Click Element    xpath=//button[contains(., 'Agendar') and not(ancestor::*[contains(@class, 'Modal')])]
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Agendar')]    timeout=10s

E seleciono o pet de teste no combobox
    Wait Until Element Is Visible    xpath=//div[@role="combobox"]    timeout=10s
    Click Element    xpath=//div[@role="combobox"]
    Wait Until Element Is Visible    xpath=//li[contains(., '${PET_TESTE.nome}')]    timeout=10s
    Click Element    xpath=//li[contains(., '${PET_TESTE.nome}')]

E preencho a data de entrada
    ${today}=    Get Current Date    result_format=%d-%m-%Y
    Wait Until Element Is Visible    xpath=(//input[@type="date"])[1]    timeout=10s
    Input Text    xpath=(//input[@type="date"])[1]    ${today}

E preencho a data de saída
    ${end}=     Get Current Date     increment=3 days     result_format=%d-%m-%Y
    Wait Until Element Is Visible     xpath=(//input[@type="date"])[2]     timeout=10s 
    Input Text     xpath=(//input[@type="date"])[2]     ${end}

E preencho a data de saída com 6 dias de diferença
    ${end}=    Get Current Date    increment=5 days    result_format=%d-%m-%Y
    Wait Until Element Is Visible    xpath=(//input[@type="date"])[2]    timeout=10s
    Input Text    xpath=(//input[@type="date"])[2]    ${end}

E preencho a hora de entrada
    Wait Until Element Is Visible    xpath=(//input[@type="time"])[1]    timeout=10s
    Input Text    xpath=(//input[@type="time"])[1]    ${START_TIME}

E preencho a hora de saída
    Wait Until Element Is Visible    xpath=(//input[@type="time"])[2]    timeout=10s
    Input Text    xpath=(//input[@type="time"])[2]    ${END_TIME}

E seleciono a forma de pagamento
    [Arguments]    ${PAGAMENTO}
    Wait Until Element Is Visible    xpath=//label[contains(., "Forma de pagamento")]/following::div[contains(@class, "MuiSelect-select")][1]    10s
    Click Element    xpath=//label[contains(., "Forma de pagamento")]/following::div[contains(@class, "MuiSelect-select")][1]
    Wait Until Element Is Visible    xpath=//li[@role="option" and contains(., "${PAGAMENTO}")]    10s
    Click Element    xpath=//li[@role="option" and contains(., "${PAGAMENTO}")]

E preencho o valor da diária
    Wait Until Element Is Visible    css=input[placeholder="0,00"]    timeout=10s
    Input Text    css=input[placeholder="0,00"]    ${DAILY_RATE}

E preencho o valor da diária com 150,00
    Wait Until Element Is Visible    css=input[placeholder="0,00"]    timeout=10s
    Input Text    css=input[placeholder="0,00"]    150,00

E preencho observações
    Wait Until Element Is Visible    xpath=//textarea    timeout=10s
    Input Text    xpath=//textarea    ${OBSERVATIONS}
    Sleep    1s

Quando clico no botão "Agendar" no modal
    Wait Until Element Is Visible    xpath=//div[contains(@class, 'MuiDialog-paper')]//button[contains(., 'Agendar')]    timeout=10s
    Wait Until Element Is Enabled    xpath=//div[contains(@class, 'MuiDialog-paper')]//button[contains(., 'Agendar')]    timeout=10s
    Scroll Element Into View    xpath=//div[contains(@class, 'MuiDialog-paper')]//button[contains(., 'Agendar')]
    Sleep    1s
    ${element}=    Get WebElement    xpath=//div[contains(@class, 'MuiDialog-paper')]//button[contains(., 'Agendar')]
    Execute JavaScript    arguments[0].click();    ARGUMENTS    ${element}
    Sleep    3s

E clico no botão "Cancelar"
    Wait Until Element Is Visible    xpath=//button[contains(., 'Cancelar')]    timeout=10s
    Click Element    xpath=//button[contains(., 'Cancelar')]

# ========= VALIDATIONS =========

Então o modal deve ser fechado
    Wait Until Element Is Not Visible     xpath=//h2[contains(text(), 'Agendar')]     timeout=10s

Então o agendamento deve ser criado com sucesso
    Wait Until Page Contains    Estadia criada com sucesso!    timeout=10s

E o modal deve ser fechado
    Wait Until Element Is Not Visible    xpath=//h2[contains(text(), 'Agendar')]

Então deve exibir mensagem de erro de campos obrigatórios
    Wait Until Page Contains    Preencha todos os campos obrigatórios    timeout=10s

Então o valor total deve ser calculado como 900,00
    Wait Until Element Is Visible    xpath=//input[contains(@class, 'Mui-disabled') or @disabled]    timeout=10s
    ${valor}=    Get Element Attribute    xpath=//input[contains(@class, 'Mui-disabled') or @disabled]    value
    Should Contain    ${valor}    900,00

E o agendamento não deve ser criado
    Page Should Not Contain    Estadia criada com sucesso!