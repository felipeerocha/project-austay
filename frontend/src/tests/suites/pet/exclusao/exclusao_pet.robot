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
${PET_EXCLUSAO_NOME}    Pet Teste Exclusão
${PET_EXCLUSAO_ESPECIE}    Gato
${PET_EXCLUSAO_RACA}    Siamese
${PET_EXCLUSAO_SEXO}    Fêmea
${PET_EXCLUSAO_NASCIMENTO}    01-01-2020

*** Test Cases ***

CT01 Excluir pet com confirmação
    [Documentation]    Testa a exclusão bem-sucedida de um pet
    Dado que tenho um pet criado para exclusão
    Quando acesso o perfil do pet de exclusão
    E clico no botão "Excluir pet"
    Então o modal de confirmação deve aparecer
    Quando confirmo a exclusão
    Então deve aparecer o toast "Pet excluído com sucesso!"
    E o pet não deve mais aparecer na listagem

CT02 Cancelar exclusão de pet
    [Documentation]    Testa o cancelamento da exclusão
    Dado que tenho um pet criado para exclusão
    Quando acesso o perfil do pet de exclusão
    E clico no botão "Excluir pet"
    Então o modal de confirmação deve aparecer
    Quando cancelo a exclusão
    E o modal deve ser fechado
    E o pet deve permanecer na listagem

CT03 Tentar excluir pet com agendamento ativo
    [Documentation]    Testa tentativa de exclusão de pet com estadia ativa
    Quando acesso o perfil do pet com estadia
    E clico no botão "Excluir pet"
    Então o modal de confirmação deve aparecer
    Quando confirmo a exclusão
    Então deve aparecer o toast "Erro ao excluir o pet."
    E o pet deve permanecer na listagem

*** Keywords ***

Preparar Teste
    Go To    ${BASE_URL}/pets
    Wait Until Element Is Visible    xpath=//button[contains(., 'Novo pet +')]    timeout=10s
    Sleep    1s

Limpar Teste
    Run Keyword And Ignore Error    Click Element    xpath=//button[contains(., 'Cancelar')]
    Run Keyword And Ignore Error    Wait Until Element Is Not Visible    xpath=//h2[contains(text(), 'Confirmar Exclusão')]    timeout=3s
    ${perfil_aberto}=    Run Keyword And Return Status    Element Should Be Visible    xpath=//h2[contains(text(), 'Perfil do pet')]    timeout=3s
    Run Keyword If    ${perfil_aberto}    Run Keywords
    ...    Run Keyword And Ignore Error    Click Element    xpath=//button[@aria-label='close']
    ...    AND    Run Keyword And Ignore Error    Wait Until Element Is Not Visible    xpath=//h2[contains(text(), 'Perfil do pet')]    timeout=5s
    Sleep    1s

# ========= CRIAÇÃO DE PET PARA EXCLUSÃO =========

Dado que tenho um pet criado para exclusão
    Verificar E Criar Pet Para Exclusao Se Necessario

Verificar E Criar Pet Para Exclusao Se Necessario
    ${pet_existe}=    Run Keyword And Return Status    Page Should Contain Element    xpath=//*[contains(text(), '${PET_EXCLUSAO_NOME}')]
    Run Keyword Unless    ${pet_existe}    Criar Pet Para Exclusao

Criar Pet Para Exclusao
    Click Element    xpath=//button[contains(., 'Novo pet +')]
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Novo Pet')]    timeout=10s
    
    # Seleciona tutor
    Wait Until Element Is Visible    xpath=//label[contains(text(), 'Tutor')]/following-sibling::div    timeout=10s
    Sleep    1s
    Click Element    xpath=//label[contains(text(), 'Tutor')]/following-sibling::div
    Sleep    1s
    Wait Until Element Is Visible    xpath=//li[contains(., '${TUTOR_TESTE.nome}')]    timeout=10s
    Click Element    xpath=//li[contains(., '${TUTOR_TESTE.nome}')]
    Sleep    1s

    # Preenche dados do pet
    Input Text    xpath=//input[@placeholder="Digite o nome do pet"]    ${PET_EXCLUSAO_NOME}
    
    Click Element    xpath=//label[contains(., "Espécie")]/following::div[contains(@class, "MuiSelect-select")][1]
    Click Element    xpath=//li[@role="option" and contains(., "${PET_EXCLUSAO_ESPECIE}")]
    
    Input Text    xpath=//input[@placeholder="Ex: Labrador, Siames"]    ${PET_EXCLUSAO_RACA}
    
    Click Element    xpath=//label[contains(., "Sexo")]/following::div[contains(@class, "MuiSelect-select")][1]
    Click Element    xpath=//li[@role="option" and contains(., "${PET_EXCLUSAO_SEXO}")]
    
    Input Text    xpath=//input[@type="date"]    ${PET_EXCLUSAO_NASCIMENTO}

    # Cria o pet
    Wait Until Element Is Enabled    xpath=//button[contains(., 'Cadastrar Pet')]    timeout=10s
    Click Element    xpath=//button[contains(., 'Cadastrar Pet')]
    Wait Until Element Is Not Visible    xpath=//h2[contains(text(), 'Novo Pet')]    timeout=10s
    Wait Until Element Is Visible    xpath=//*[contains(text(), '${PET_EXCLUSAO_NOME}')]    timeout=10s

# ========= ACTIONS =========

Quando acesso o perfil do pet de exclusão
    Wait Until Element Is Visible    xpath=//*[contains(text(), '${PET_EXCLUSAO_NOME}')]    timeout=10s
    Click Element    xpath=//*[contains(text(), '${PET_EXCLUSAO_NOME}')]/ancestor::div[1]/descendant::*[local-name()='svg' and @stroke='currentColor'][1]
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Perfil do pet')]    timeout=10s

Quando acesso o perfil do pet com estadia
    Wait Until Element Is Visible    xpath=//*[contains(text(), '${PET_TESTE.nome}')]    timeout=10s
    Click Element    xpath=//*[contains(text(), '${PET_TESTE.nome}')]/ancestor::div[1]/descendant::*[local-name()='svg' and @stroke='currentColor'][1]
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Perfil do pet')]    timeout=10s

E clico no botão "Excluir pet"
    Wait Until Element Is Visible    xpath=//button[contains(., 'Excluir pet')]    timeout=10s
    Click Element    xpath=//button[contains(., 'Excluir pet')]

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
    Wait Until Element Is Not Visible    xpath=//h2[contains(text(), 'Perfil do pet')]    timeout=5s

# ========= VALIDATIONS =========

Então o modal de confirmação deve aparecer
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Confirmar Exclusão')]    timeout=10s
    Page Should Contain    Tem certeza que deseja excluir este pet?
    Page Should Contain    Ele será removido permanentemente.
    Page Should Contain Element    xpath=//button[contains(., 'Cancelar')]
    Page Should Contain Element    xpath=//button[contains(., 'Excluir')]

Então deve aparecer o toast "Pet excluído com sucesso!"
    Wait Until Page Contains Element    xpath=//div[contains(@class, 'Toastify')]    timeout=10s
    Page Should Contain    Pet excluído com sucesso!

Então deve aparecer o toast "Erro ao excluir o pet."
    Wait Until Page Contains Element    xpath=//div[contains(@class, 'Toastify')]    timeout=10s
    Page Should Contain    Erro ao excluir o pet.

E o pet não deve mais aparecer na listagem
    Wait Until Element Is Not Visible    xpath=//*[contains(text(), '${PET_EXCLUSAO_NOME}')]    timeout=10s
    Page Should Not Contain Element    xpath=//*[contains(text(), '${PET_EXCLUSAO_NOME}')]

E o pet deve permanecer na listagem
    Wait Until Element Is Visible    xpath=//*[contains(text(), '${PET_EXCLUSAO_NOME}')]    timeout=10s
    Page Should Contain Element    xpath=//*[contains(text(), '${PET_EXCLUSAO_NOME}')]

E o modal deve ser fechado
    Wait Until Element Is Not Visible    xpath=//h2[contains(text(), 'Confirmar Exclusão')]    timeout=10s