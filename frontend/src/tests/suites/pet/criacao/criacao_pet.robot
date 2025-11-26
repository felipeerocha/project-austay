*** Settings ***
Library     SeleniumLibrary
Library     String
Library     Collections
Library     DateTime

Resource    ../../../config.robot
Resource    ../../../keywords.robot

Suite Setup       Configurar Suite Compartilhada
Suite Teardown    Close All Browsers
Test Setup        Preparar Teste
Test Teardown     Limpar Teste

*** Variables ***

${PET_NAME}            Paçoca
${PET_SPECIE}          Gato
${PET_BREED}           Siamese
${PET_GENDER}          Fêmea
${PET_BIRTH_DATE}      01-01-2020

*** Test Cases ***

CT01 Criar pet com dados válidos
    [Documentation]    Testa a criação completa de um pet com todos os dados
    E clico no botão "Novo pet +"
    E seleciono o tutor de teste no combobox
    E preencho o nome do pet    ${PET_NAME}
    E seleciono a espécie    ${PET_SPECIE}
    E preencho a raça    ${PET_BREED}
    E seleciono o sexo    ${PET_GENDER}
    E preencho a data de nascimento    ${PET_BIRTH_DATE}
    E marco como vermifugado
    E marco como vacinado
    Quando clico no botão "Cadastrar Pet"
    Então o pet deve ser criado com sucesso
    E o modal deve ser fechado

CT02 Tentar criar pet sem tutor selecionado
    [Documentation]    Valida obrigatoriedade do campo tutor
    E clico no botão "Novo pet +"
    E preencho o nome do pet    ${PET_NAME}
    E seleciono a espécie    ${PET_SPECIE}
    E seleciono o sexo    ${PET_GENDER}
    E preencho a data de nascimento    ${PET_BIRTH_DATE}
    Quando clico no botão "Cadastrar Pet"
    Então deve exibir mensagem de erro de campos obrigatórios

CT03 Tentar criar pet sem nome
    [Documentation]    Valida obrigatoriedade do campo nome
    E clico no botão "Novo pet +"
    E seleciono o tutor de teste no combobox
    E seleciono a espécie    ${PET_SPECIE}
    E seleciono o sexo    ${PET_GENDER}
    E preencho a data de nascimento    ${PET_BIRTH_DATE}
    Quando clico no botão "Cadastrar Pet"
    Então deve exibir mensagem de erro de campos obrigatórios

CT04 Tentar criar pet sem espécie
    [Documentation]    Valida obrigatoriedade do campo espécie
    E clico no botão "Novo pet +"
    E seleciono o tutor de teste no combobox
    E preencho o nome do pet    ${PET_NAME}
    E seleciono o sexo    ${PET_GENDER}
    E preencho a data de nascimento    ${PET_BIRTH_DATE}
    Quando clico no botão "Cadastrar Pet"
    Então deve exibir mensagem de erro de campos obrigatórios

CT05 Cancelar criação de pet
    [Documentation]    Testa o cancelamento do fluxo de criação
    E clico no botão "Novo pet +"
    E seleciono o tutor de teste no combobox
    E preencho o nome do pet    ${PET_NAME}
    E seleciono a espécie    ${PET_SPECIE}
    E clico no botão "Cancelar"
    Então o modal deve ser fechado
    E o pet não deve ser criado

*** Keywords ***

Preparar Teste
    Go To    ${BASE_URL}/pets
    Wait Until Element Is Visible    xpath=//button[contains(., 'Novo pet +')]    timeout=10s

Limpar Teste
    ${modal_aberto}=    Run Keyword And Return Status    Element Should Be Visible    xpath=//h2[contains(text(), 'Novo Pet')]
    Run Keyword If    ${modal_aberto}    Click Element    xpath=//button[contains(., 'Cancelar')]
    Sleep    1s

# ========= CRIAÇÃO DE PET =========

E clico no botão "Novo pet +"
    Wait Until Element Is Visible    xpath=//button[contains(., 'Novo pet +')]    timeout=10s
    Click Element    xpath=//button[contains(., 'Novo pet +')]
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Novo Pet')]    timeout=10s

E seleciono o tutor de teste no combobox
    Wait Until Element Is Visible    xpath=//label[contains(text(), 'Tutor')]/following-sibling::div    timeout=10s
    Sleep    1s
    Click Element    xpath=//label[contains(text(), 'Tutor')]/following-sibling::div
    Sleep    1s
    Wait Until Element Is Visible    xpath=//li[contains(., '${TUTOR_TESTE.nome}')]    timeout=10s
    Click Element    xpath=//li[contains(., '${TUTOR_TESTE.nome}')]
    Sleep    1s

E preencho o nome do pet
    [Arguments]    ${NOME_PET}
    Wait Until Element Is Visible    xpath=//input[@placeholder="Digite o nome do pet"]    timeout=10s
    Input Text    xpath=//input[@placeholder="Digite o nome do pet"]    ${NOME_PET}

E seleciono a espécie
    [Arguments]    ${ESPECIE}
    Wait Until Element Is Visible    xpath=//label[contains(., "Espécie")]/following::div[contains(@class, "MuiSelect-select")][1]    10s
    Click Element    xpath=//label[contains(., "Espécie")]/following::div[contains(@class, "MuiSelect-select")][1]
    Wait Until Element Is Visible    xpath=//li[@role="option" and contains(., "${ESPECIE}")]    2s
    Click Element    xpath=//li[@role="option" and contains(., "${ESPECIE}")]

E preencho a raça
    [Arguments]    ${RACA}
    Wait Until Element Is Visible    xpath=//input[@placeholder="Ex: Labrador, Siames"]    timeout=10s
    Input Text    xpath=//input[@placeholder="Ex: Labrador, Siames"]    ${RACA}

E seleciono o sexo
    [Arguments]    ${SEXO}
    Wait Until Element Is Visible    xpath=//label[contains(., "Sexo")]/following::div[contains(@class, "MuiSelect-select")][1]    10s
    Click Element    xpath=//label[contains(., "Sexo")]/following::div[contains(@class, "MuiSelect-select")][1]
    Wait Until Element Is Visible    xpath=//li[@role="option" and contains(., "${SEXO}")]    10s
    Click Element    xpath=//li[@role="option" and contains(., "${SEXO}")]

E preencho a data de nascimento
    [Arguments]    ${DATA_NASCIMENTO}
    Wait Until Element Is Visible    xpath=//input[@type="date"]    timeout=10s
    Input Text    xpath=//input[@type="date"]    ${DATA_NASCIMENTO}

E marco como vermifugado
    Wait Until Element Is Visible    xpath=//span[contains(text(), 'Vermifugado')]/preceding-sibling::input[@type='checkbox']    timeout=10s
    ${checked}=    Run Keyword And Return Status    Checkbox Should Be Selected    xpath=//span[contains(text(), 'Vermifugado')]/preceding-sibling::input[@type='checkbox']
    Run Keyword Unless    ${checked}    Click Element    xpath=//span[contains(text(), 'Vermifugado')]/preceding-sibling::input[@type='checkbox']

E marco como vacinado
    Wait Until Element Is Visible    xpath=//span[contains(text(), 'Vacinado')]/preceding-sibling::input[@type='checkbox']    timeout=10s
    ${checked}=    Run Keyword And Return Status    Checkbox Should Be Selected    xpath=//span[contains(text(), 'Vacinado')]/preceding-sibling::input[@type='checkbox']
    Run Keyword Unless    ${checked}    Click Element    xpath=//span[contains(text(), 'Vacinado')]/preceding-sibling::input[@type='checkbox']

Quando clico no botão "Cadastrar Pet"
    Wait Until Element Is Visible    xpath=//div[contains(@class, 'MuiDialog-paper')]//button[contains(., 'Cadastrar Pet')]    timeout=10s
    Wait Until Element Is Enabled    xpath=//div[contains(@class, 'MuiDialog-paper')]//button[contains(., 'Cadastrar Pet')]    timeout=10s
    Scroll Element Into View    xpath=//div[contains(@class, 'MuiDialog-paper')]//button[contains(., 'Cadastrar Pet')]
    Sleep    1s
    ${element}=    Get WebElement    xpath=//div[contains(@class, 'MuiDialog-paper')]//button[contains(., 'Cadastrar Pet')]
    Execute JavaScript    arguments[0].click();    ARGUMENTS    ${element}
    Sleep    3s

E clico no botão "Cancelar"
    Wait Until Element Is Visible    xpath=//button[contains(., 'Cancelar')]    timeout=10s
    Click Element    xpath=//button[contains(., 'Cancelar')]

E o modal deve ser fechado
    Wait Until Element Is Not Visible    xpath=//h2[contains(text(), 'Novo Pet')]    timeout=10s

Então o modal deve ser fechado
    Wait Until Element Is Not Visible    xpath=//h2[contains(text(), 'Novo Pet')]    timeout=10s

Então o pet deve ser criado com sucesso
    Wait Until Page Contains    Pet criado com sucesso!    timeout=10s

Então deve exibir mensagem de erro de campos obrigatórios
    Wait Until Page Contains    Preencha todos os campos obrigatórios    timeout=10s

E o pet não deve ser criado
    Page Should Not Contain    Pet criado com sucesso!