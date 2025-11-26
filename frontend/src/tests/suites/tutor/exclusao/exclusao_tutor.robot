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
${TUTOR_EXCLUSAO_NOME}    Tutor Teste Exclusão
${TUTOR_EXCLUSAO_TELEFONE}    (61) 99999-9999
${TUTOR_EXCLUSAO_CPF}    111.222.333-44

*** Test Cases ***

CT01 Excluir tutor com confirmação
    [Documentation]    Testa a exclusão bem-sucedida de um tutor
    Dado que tenho um tutor criado para exclusão
    Quando acesso o perfil do tutor de exclusão
    E clico no botão "Excluir tutor"
    Então o modal de confirmação deve aparecer
    Quando confirmo a exclusão
    Então deve aparecer o toast "Tutor excluído com sucesso!"
    E o tutor não deve mais aparecer na listagem

CT02 Cancelar exclusão de tutor
    [Documentation]    Testa o cancelamento da exclusão de tutor
    Dado que tenho um tutor criado para exclusão
    Quando acesso o perfil do tutor de exclusão
    E clico no botão "Excluir tutor"
    Então o modal de confirmação deve aparecer
    Quando cancelo a exclusão
    E o modal deve ser fechado
    E o tutor deve permanecer na listagem

CT03 Tentar excluir tutor com pets vinculados
    [Documentation]    Testa tentativa de exclusão de tutor com pets vinculados
    Quando acesso o perfil do tutor base
    E clico no botão "Excluir tutor"
    Então o modal de confirmação deve aparecer
    Quando confirmo a exclusão
    Então deve aparecer o toast "Erro ao excluir o tutor."
    E o tutor deve permanecer na listagem

*** Keywords ***

Preparar Teste
    Go To    ${BASE_URL}/tutors
    Wait Until Element Is Visible    xpath=//button[contains(., 'Novo tutor +')]    timeout=10s
    Sleep    1s

Limpar Teste
    Run Keyword And Ignore Error    Click Element    xpath=//button[contains(., 'Cancelar')]
    Run Keyword And Ignore Error    Wait Until Element Is Not Visible    xpath=//h2[contains(text(), 'Confirmar Exclusão')]    timeout=3s
    ${perfil_aberto}=    Run Keyword And Return Status    Element Should Be Visible    xpath=//h2[contains(text(), 'Perfil do tutor')]    timeout=3s
    Run Keyword If    ${perfil_aberto}    Run Keywords
    ...    Run Keyword And Ignore Error    Click Element    xpath=//button[@aria-label='close']
    ...    AND    Run Keyword And Ignore Error    Wait Until Element Is Not Visible    xpath=//h2[contains(text(), 'Perfil do tutor')]    timeout=5s
    Sleep    1s

# ========= CRIAÇÃO DE TUTOR PARA EXCLUSÃO =========

Dado que tenho um tutor criado para exclusão
    Verificar E Criar Tutor Para Exclusao Se Necessario

Verificar E Criar Tutor Para Exclusao Se Necessario
    ${tutor_existe}=    Run Keyword And Return Status    Page Should Contain Element    xpath=//*[contains(text(), '${TUTOR_EXCLUSAO_NOME}')]
    Run Keyword Unless    ${tutor_existe}    Criar Tutor Para Exclusao

Criar Tutor Para Exclusao
    Click Element    xpath=//button[contains(., 'Novo tutor +')]
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Novo tutor')]    timeout=10s
    
    # Preenche dados do tutor
    Wait Until Element Is Visible    xpath=//label[contains(., 'Nome completo')]/following-sibling::div//input    timeout=10s
    Input Text    xpath=//label[contains(., 'Nome completo')]/following-sibling::div//input    ${TUTOR_EXCLUSAO_NOME}
    
    Wait Until Element Is Visible    xpath=//label[contains(., 'Telefone')]/following-sibling::div//input    timeout=10s
    Input Text    xpath=//label[contains(., 'Telefone')]/following-sibling::div//input    ${TUTOR_EXCLUSAO_TELEFONE}
    
    Wait Until Element Is Visible    xpath=//label[contains(., 'CPF')]/following-sibling::div//input    timeout=10s
    Input Text    xpath=//label[contains(., 'CPF')]/following-sibling::div//input    ${TUTOR_EXCLUSAO_CPF}

    # Cria o tutor
    Wait Until Element Is Enabled    xpath=//button[contains(., 'Cadastrar')]    timeout=10s
    Click Element    xpath=//button[contains(., 'Cadastrar')]
    Wait Until Element Is Not Visible    xpath=//h2[contains(text(), 'Novo tutor')]    timeout=10s
    Wait Until Element Is Visible    xpath=//*[contains(text(), '${TUTOR_EXCLUSAO_NOME}')]    timeout=10s

# ========= ACTIONS =========

Quando acesso o perfil do tutor de exclusão
    Wait Until Element Is Visible    xpath=//*[contains(text(), '${TUTOR_EXCLUSAO_NOME}')]    timeout=10s
    Click Element    xpath=//*[contains(text(), '${TUTOR_EXCLUSAO_NOME}')]/ancestor::div[1]/descendant::*[local-name()='svg' and @stroke='currentColor'][1]
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Perfil do tutor')]    timeout=10s

Quando acesso o perfil do tutor base
    Wait Until Element Is Visible    xpath=//*[contains(text(), '${TUTOR_TESTE.nome}')]    timeout=10s
    Click Element    xpath=//*[contains(text(), '${TUTOR_TESTE.nome}')]/ancestor::div[1]/descendant::*[local-name()='svg' and @stroke='currentColor'][1]
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Perfil do tutor')]    timeout=10s

E clico no botão "Excluir tutor"
    Wait Until Element Is Visible    xpath=//button[contains(., 'Excluir tutor')]    timeout=10s
    Click Element    xpath=//button[contains(., 'Excluir tutor')]

Quando confirmo a exclusão
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Confirmar Exclusão')]    timeout=10s
    Sleep    500ms
    Click Button    Excluir

Quando cancelo a exclusão
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Confirmar Exclusão')]    timeout=10s
    Wait Until Element Is Enabled    xpath=//button[contains(., 'Cancelar')]    timeout=10s
    Click Element    xpath=//button[contains(., 'Cancelar')]

E fecho o modal clicando no X
    Wait Until Element Is Visible    xpath=//button[@aria-label='close']    timeout=5s
    Click Element    xpath=//button[@aria-label='close']
    Wait Until Element Is Not Visible    xpath=//h2[contains(text(), 'Perfil do tutor')]    timeout=5s

# ========= VALIDATIONS =========

Então o modal de confirmação deve aparecer
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Confirmar Exclusão')]    timeout=10s
    Page Should Contain    Tem certeza que deseja excluir este tutor?
    Page Should Contain    Todos os pets vinculados a ele serão desvinculados.
    Page Should Contain Element    xpath=//button[contains(., 'Cancelar')]
    Page Should Contain Element    xpath=//button[contains(., 'Excluir')]

Então deve aparecer o toast "Tutor excluído com sucesso!"
    Wait Until Page Contains Element    xpath=//div[contains(@class, 'Toastify')]    timeout=10s
    Page Should Contain    Tutor excluído com sucesso!

Então deve aparecer o toast "Erro ao excluir o tutor."
    Wait Until Page Contains Element    xpath=//div[contains(@class, 'Toastify')]    timeout=10s
    Page Should Contain    Erro ao excluir o tutor.

E o tutor não deve mais aparecer na listagem
    Wait Until Element Is Not Visible    xpath=//*[contains(text(), '${TUTOR_EXCLUSAO_NOME}')]    timeout=10s
    Page Should Not Contain Element    xpath=//*[contains(text(), '${TUTOR_EXCLUSAO_NOME}')]

E o tutor deve permanecer na listagem
    Wait Until Element Is Visible    xpath=//*[contains(text(), '${TUTOR_EXCLUSAO_NOME}')]    timeout=10s
    Page Should Contain Element    xpath=//*[contains(text(), '${TUTOR_EXCLUSAO_NOME}')]

E o modal deve ser fechado
    Wait Until Element Is Not Visible    xpath=//h2[contains(text(), 'Confirmar Exclusão')]    timeout=10s