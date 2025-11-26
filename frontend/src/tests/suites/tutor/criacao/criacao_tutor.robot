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
${TUTOR_TESTE_NOME}    João Silva Teste Editado
${TUTOR_TESTE_TELEFONE}    (61) 99999-9999
${TUTOR_TESTE_CPF}    123.456.789-00
${TUTOR_CPF_DUPLICADO}    123.456.789-00
${TUTOR_CPF_INVALIDO}    123.456.789

*** Test Cases ***

CT01 Criar tutor com dados válidos
    [Documentation]    Testa criação completa de tutor com todos os dados válidos
    E clico no botão "Novo tutor +"
    E preencho o nome completo    ${TUTOR_TESTE_NOME}
    E preencho o telefone    ${TUTOR_TESTE_TELEFONE}
    E preencho o CPF    ${TUTOR_TESTE_CPF}
    Quando clico no botão "Cadastrar"
    Então o tutor deve ser criado com sucesso
    E o modal deve ser fechado

CT02 Tentar criar tutor sem nome
    [Documentation]    Valida obrigatoriedade do campo nome
    E clico no botão "Novo tutor +"
    E preencho o telefone    ${TUTOR_TESTE_TELEFONE}
    E preencho o CPF    ${TUTOR_TESTE_CPF}
    Quando clico no botão "Cadastrar"
    Então deve exibir mensagem de erro de campos obrigatórios

CT03 Tentar criar tutor sem telefone
    [Documentation]    Valida obrigatoriedade do campo telefone
    E clico no botão "Novo tutor +"
    E preencho o nome completo    ${TUTOR_TESTE_NOME}
    E preencho o CPF    ${TUTOR_TESTE_CPF}
    Quando clico no botão "Cadastrar"
    Então deve exibir mensagem de erro de campos obrigatórios

CT04 Tentar criar tutor sem CPF
    [Documentation]    Valida obrigatoriedade do campo CPF
    E clico no botão "Novo tutor +"
    E preencho o nome completo    ${TUTOR_TESTE_NOME}
    E preencho o telefone    ${TUTOR_TESTE_TELEFONE}
    Quando clico no botão "Cadastrar"
    Então deve exibir mensagem de erro de campos obrigatórios

CT05 Tentar criar tutor com CPF inválido
    [Documentation]    Testa validação de formato de CPF
    E clico no botão "Novo tutor +"
    E preencho o nome completo    ${TUTOR_TESTE_NOME}
    E preencho o telefone    ${TUTOR_TESTE_TELEFONE}
    E preencho o CPF    ${TUTOR_CPF_INVALIDO}
    Quando clico no botão "Cadastrar"
    Então o tutor não deve ser criado

CT06 Cancelar criação de tutor
    [Documentation]    Testa o cancelamento do fluxo de criação
    E clico no botão "Novo tutor +"
    E preencho o nome completo    ${TUTOR_TESTE_NOME}
    E preencho o telefone    ${TUTOR_TESTE_TELEFONE}
    E preencho o CPF    ${TUTOR_TESTE_CPF}
    E clico no botão "Cancelar"
    Então o modal deve ser fechado
    E o tutor não deve ser criado

CT07 Tentar criar tutor com CPF já cadastrado
    [Documentation]    Testa prevenção de CPF duplicado
    E clico no botão "Novo tutor +"
    E preencho o nome completo    ${TUTOR_TESTE_NOME}
    E preencho o telefone    (61) 88888-8888
    E preencho o CPF    ${TUTOR_CPF_DUPLICADO}
    Quando clico no botão "Cadastrar"
    Então deve exibir mensagem de erro "CPF já cadastrado."

*** Keywords ***

Preparar Teste
    Go To    ${BASE_URL}/tutors
    Wait Until Element Is Visible    xpath=//button[contains(., 'Novo tutor +')]    timeout=10s

Limpar Teste
    ${modal_aberto}=    Run Keyword And Return Status    Element Should Be Visible    xpath=//h2[contains(text(), 'Novo tutor')]
    Run Keyword If    ${modal_aberto}    Click Element    xpath=//button[contains(., 'Cancelar')]
    Sleep    1s

# ========= CRIAÇÃO DE TUTOR =========

E clico no botão "Novo tutor +"
    Wait Until Element Is Visible    xpath=//button[contains(., 'Novo tutor +')]    timeout=10s
    Click Element    xpath=//button[contains(., 'Novo tutor +')]
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Novo tutor')]    timeout=10s

E preencho o nome completo
    [Arguments]    ${NOME_TUTOR}
    Wait Until Element Is Visible    xpath=//label[contains(., 'Nome completo')]/following-sibling::div//input    timeout=10s
    Input Text    xpath=//label[contains(., 'Nome completo')]/following-sibling::div//input    ${NOME_TUTOR}

E preencho o telefone
    [Arguments]    ${TELEFONE}
    Wait Until Element Is Visible    xpath=//label[contains(., 'Telefone')]/following-sibling::div//input    timeout=10s
    Input Text    xpath=//label[contains(., 'Telefone')]/following-sibling::div//input    ${TELEFONE}

E preencho o CPF
    [Arguments]    ${CPF}
    Wait Until Element Is Visible    xpath=//label[contains(., 'CPF')]/following-sibling::div//input    timeout=10s
    Input Text    xpath=//label[contains(., 'CPF')]/following-sibling::div//input    ${CPF}

Quando clico no botão "Cadastrar"
    Wait Until Element Is Visible    xpath=//button[contains(., 'Cadastrar') and not(contains(., 'Cadastrando'))]    timeout=10s
    Wait Until Element Is Enabled    xpath=//button[contains(., 'Cadastrar') and not(contains(., 'Cadastrando'))]    timeout=10s
    Scroll Element Into View    xpath=//button[contains(., 'Cadastrar') and not(contains(., 'Cadastrando'))]
    Sleep    1s
    ${element}=    Get WebElement    xpath=//button[contains(., 'Cadastrar') and not(contains(., 'Cadastrando'))]
    Execute JavaScript    arguments[0].click();    ARGUMENTS    ${element}
    Sleep    3s

E clico no botão "Cancelar"
    Wait Until Element Is Visible    xpath=//button[contains(., 'Cancelar')]    timeout=10s
    Click Element    xpath=//button[contains(., 'Cancelar')]

# ========= VALIDATIONS =========

E o modal deve ser fechado
    Wait Until Element Is Not Visible    xpath=//h2[contains(text(), 'Novo tutor')]    timeout=10s

Então o modal deve ser fechado
    Wait Until Element Is Not Visible    xpath=//h2[contains(text(), 'Novo tutor')]    timeout=10s

Então o tutor deve ser criado com sucesso
    Wait Until Page Contains    Tutor cadastrado com sucesso!    timeout=10s

Então deve exibir mensagem de erro de campos obrigatórios
    Wait Until Page Contains    Preencha todos os campos.    timeout=10s

E o tutor não deve ser criado
    Page Should Not Contain    Tutor cadastrado com sucesso!

Então o tutor não deve ser criado
    Page Should Not Contain    Tutor cadastrado com sucesso!

Então deve exibir mensagem de erro "CPF já cadastrado."
    Wait Until Page Contains    CPF já cadastrado.    timeout=10s