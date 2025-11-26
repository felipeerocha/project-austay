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
${TUTOR_NAME_EDIT}     ${TUTOR_TESTE.nome}
${TUTOR_PHONE_EDIT}    (61) 88888-8888

*** Test Cases ***

CT01 Editar nome do tutor com sucesso
    [Documentation]    Testa a edição do nome do tutor
    Quando acesso o perfil do tutor de teste
    E clico no botão "Editar tutor"
    E limpo e preencho o nome completo    ${TUTOR_NAME_EDIT} Editado
    Quando clico no botão "Salvar"
    Então deve aparecer o toast "Tutor atualizado com sucesso!"
    E na listagem o tutor deve ter o nome    ${TUTOR_NAME_EDIT} Editado

CT02 Editar telefone do tutor com sucesso
    [Documentation]    Testa a edição do telefone do tutor
    Quando acesso o perfil do tutor de teste
    E clico no botão "Editar tutor"
    E limpo e preencho o telefone    ${TUTOR_PHONE_EDIT}
    Quando clico no botão "Salvar"
    Então deve aparecer o toast "Tutor atualizado com sucesso!"
    E ao abrir o perfil do tutor o telefone deve ser    ${TUTOR_PHONE_EDIT}

CT03 Tentar editar CPF do tutor deve falhar
    [Documentation]    Testa que o CPF não pode ser editado
    Quando acesso o perfil do tutor de teste
    ${cpf_original}=    Obter valor do campo "CPF"
    E clico no botão "Editar tutor"
    E limpo e preencho o CPF    987.654.321-00
    Quando clico no botão "Salvar"
    Então deve aparecer o toast "Erro ao atualizar o tutor."
    E o CPF deve permanecer o original    ${cpf_original}

CT04 Editar múltiplos campos do tutor exceto CPF
    [Documentation]    Testa edição de múltiplos campos simultaneamente
    Quando acesso o perfil do tutor de teste
    ${nome_original}=    Obter valor do campo "Nome completo"
    ${cpf_original}=    Obter valor do campo "CPF"
    E clico no botão "Editar tutor"
    E limpo e preencho o nome completo    João Silva Teste Editado
    E limpo e preencho o telefone    (61) 77777-7777
    Quando clico no botão "Salvar"
    Então deve aparecer o toast "Tutor atualizado com sucesso!"
    E na listagem o tutor deve ter o nome    João Silva Teste Editado
    E ao abrir o perfil do tutor os dados devem estar corretos
    ...    nome=João Silva Teste Editado
    ...    telefone=(61) 77777-7777
    ...    cpf=${cpf_original}

CT05 Cancelar edição do tutor mantém dados originais
    [Documentation]    Testa que o cancelamento mantém dados originais
    Quando acesso o perfil do tutor de teste
    ${nome_original}=    Obter valor do campo "Nome completo"
    ${telefone_original}=    Obter valor do campo "Telefone"
    ${cpf_original}=    Obter valor do campo "CPF"
    E clico no botão "Editar tutor"
    E limpo e preencho o nome completo    Nome Temporário
    E limpo e preencho o telefone    (00) 00000-0000
    E fecho o modal clicando no X
    E na listagem o tutor deve ter o nome    ${nome_original}
    E ao abrir o perfil do tutor os campos devem ter valores originais
    ...    nome=${nome_original}
    ...    telefone=${telefone_original}
    ...    cpf=${cpf_original}

CT06 Visualizar dados do tutor sem editar
    [Documentation]    Testa modo de visualização (campos desabilitados)
    Quando acesso o perfil do tutor de teste
    Então o modal "Perfil do tutor" deve estar aberto
    E os campos devem estar desabilitados para edição
    E o botão "Editar tutor" deve estar visível
    E o botão "Salvar" não deve estar visível

*** Keywords ***

Preparar Teste
    Go To    ${BASE_URL}/tutors
    Wait Until Element Is Visible    xpath=//button[contains(., 'Novo tutor +')]    timeout=10s 
    Sleep    1s

Limpar Teste
    [Documentation]    Fecha modal se estiver aberto e aguarda estabilização
    Sleep    1s
    
    Execute JavaScript    
    ...    var closeButtons = document.querySelectorAll('button[aria-label="close"]');
    ...    closeButtons.forEach(btn => btn.click());
    
    Sleep    1s

# ========= ACTIONS =========

Quando acesso o perfil do tutor de teste
    Wait Until Element Is Visible    xpath=//*[contains(text(), '${TUTOR_NAME_EDIT} Editado')]    timeout=15s
    Sleep    1s
    Click Element    xpath=//*[contains(text(), '${TUTOR_NAME_EDIT} Editado')]/ancestor::div[1]/descendant::*[local-name()='svg' and @stroke='currentColor'][1]
    Sleep    1s
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Perfil do tutor')]    timeout=10s

E clico no botão "Editar tutor"
    Wait Until Element Is Visible    xpath=//button[contains(., 'Editar tutor')]    timeout=10s
    Click Element    xpath=//button[contains(., 'Editar tutor')]
    Sleep    1s

Quando clico no botão "Salvar"
    Wait Until Element Is Visible    xpath=//button[contains(., 'Salvar')]    timeout=10s
    Wait Until Element Is Enabled    xpath=//button[contains(., 'Salvar')]    timeout=10s
    Click Element    xpath=//button[contains(., 'Salvar')]
    Sleep    2s

E limpo e preencho o nome completo
    [Arguments]    ${NOME}
    Wait Until Element Is Visible    xpath=//label[text()='Nome completo']/following-sibling::div//input    timeout=10s
    Execute JavaScript    
    ...    var input = document.evaluate("//label[text()='Nome completo']/following-sibling::div//input", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    ...    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    ...    nativeInputValueSetter.call(input, '');
    ...    var event = new Event('input', { bubbles: true});
    ...    input.dispatchEvent(event);
    Sleep    0.3s
    Input Text    xpath=//label[text()='Nome completo']/following-sibling::div//input    ${NOME}
    Sleep    0.3s

E limpo e preencho o telefone
    [Arguments]    ${TELEFONE}
    Wait Until Element Is Visible    xpath=//label[text()='Telefone']/following-sibling::div//input    timeout=10s
    Execute JavaScript    
    ...    var input = document.evaluate("//label[text()='Telefone']/following-sibling::div//input", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    ...    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    ...    nativeInputValueSetter.call(input, '');
    ...    var event = new Event('input', { bubbles: true});
    ...    input.dispatchEvent(event);
    Sleep    0.3s
    Input Text    xpath=//label[text()='Telefone']/following-sibling::div//input    ${TELEFONE}
    Sleep    0.3s

E limpo e preencho o CPF
    [Arguments]    ${CPF}
    Wait Until Element Is Visible    xpath=//label[text()='CPF']/following-sibling::div//input    timeout=10s
    Execute JavaScript    
    ...    var input = document.evaluate("//label[text()='CPF']/following-sibling::div//input", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    ...    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    ...    nativeInputValueSetter.call(input, '');
    ...    var event = new Event('input', { bubbles: true});
    ...    input.dispatchEvent(event);
    Sleep    0.3s
    Input Text    xpath=//label[text()='CPF']/following-sibling::div//input    ${CPF}
    Sleep    0.3s

E fecho o modal clicando no X
    Wait Until Element Is Visible    xpath=//button[@aria-label='close']    timeout=10s
    Click Element    xpath=//button[@aria-label='close']

# ========= VALIDATIONS =========

Então deve aparecer o toast "Tutor atualizado com sucesso!"
    Wait Until Page Contains Element    xpath=//div[contains(@class, 'Toastify')]    timeout=10s
    Page Should Contain    Tutor atualizado com sucesso!
    Sleep    1s

Então deve aparecer o toast "Erro ao atualizar o tutor."
    Wait Until Page Contains Element    xpath=//div[contains(@class, 'Toastify')]    timeout=10s
    Page Should Contain    Erro ao atualizar o tutor.
    Sleep    1s


E na listagem o tutor deve ter o nome
    [Arguments]    ${NOME_ESPERADO}
    Wait Until Element Is Visible    xpath=//*[contains(text(), '${NOME_ESPERADO}')]    timeout=10s
    Page Should Contain Element    xpath=//*[contains(text(), '${NOME_ESPERADO}')]

E ao abrir o perfil do tutor o telefone deve ser
    [Arguments]    ${TELEFONE_ESPERADO}
    Quando acesso o perfil do tutor de teste
    Wait Until Element Is Visible    xpath=//label[text()='Telefone']/following-sibling::div//input    timeout=10s
    ${telefone_atual}=    Get Value    xpath=//label[text()='Telefone']/following-sibling::div//input
    Should Be Equal    ${telefone_atual}    ${TELEFONE_ESPERADO}
    E fecho o modal clicando no X

E o CPF deve permanecer o original
    [Arguments]    ${CPF_ORIGINAL}
    Quando acesso o perfil do tutor de teste
    Wait Until Element Is Visible    xpath=//label[text()='CPF']/following-sibling::div//input    timeout=10s
    ${cpf_atual}=    Get Value    xpath=//label[text()='CPF']/following-sibling::div//input
    Should Be Equal    ${cpf_atual}    ${CPF_ORIGINAL}
    E fecho o modal clicando no X

E ao abrir o perfil do tutor os dados devem estar corretos
    [Arguments]    ${nome}    ${telefone}    ${cpf}
    Quando acesso o perfil do tutor de teste
    
    Wait Until Element Is Visible    xpath=//label[text()='Nome completo']/following-sibling::div//input    timeout=10s
    ${nome_atual}=    Get Value    xpath=//label[text()='Nome completo']/following-sibling::div//input
    Should Be Equal    ${nome_atual}    ${nome}
    
    ${telefone_atual}=    Get Value    xpath=//label[text()='Telefone']/following-sibling::div//input
    Should Be Equal    ${telefone_atual}    ${telefone}
    
    ${cpf_atual}=    Get Value    xpath=//label[text()='CPF']/following-sibling::div//input
    Should Be Equal    ${cpf_atual}    ${cpf}
    
    E fecho o modal clicando no X

E ao abrir o perfil do tutor os campos devem ter valores originais
    [Arguments]    ${nome}    ${telefone}    ${cpf}
    Quando acesso o perfil do tutor de teste
    
    Wait Until Element Is Visible    xpath=//label[text()='Nome completo']/following-sibling::div//input    timeout=10s
    ${nome_atual}=    Get Value    xpath=//label[text()='Nome completo']/following-sibling::div//input
    Should Be Equal    ${nome_atual}    ${nome}
    
    ${telefone_atual}=    Get Value    xpath=//label[text()='Telefone']/following-sibling::div//input
    Should Be Equal    ${telefone_atual}    ${telefone}
    
    ${cpf_atual}=    Get Value    xpath=//label[text()='CPF']/following-sibling::div//input
    Should Be Equal    ${cpf_atual}    ${cpf}
    
    E fecho o modal clicando no X

Então o modal "Perfil do tutor" deve estar aberto
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Perfil do tutor')]    timeout=10s

E os campos devem estar desabilitados para edição
    Element Should Be Disabled    xpath=//label[text()='Nome completo']/following-sibling::div//input
    Element Should Be Disabled    xpath=//label[text()='Telefone']/following-sibling::div//input
    Element Should Be Disabled    xpath=//label[text()='CPF']/following-sibling::div//input

E o botão "Editar tutor" deve estar visível
    Element Should Be Visible    xpath=//button[contains(., 'Editar tutor')]

E o botão "Salvar" não deve estar visível
    Page Should Not Contain Element    xpath=//button[contains(., 'Salvar')]

Obter valor do campo "Nome completo"
    Wait Until Element Is Visible    xpath=//label[text()='Nome completo']/following-sibling::div//input    timeout=10s
    ${valor}=    Get Value    xpath=//label[text()='Nome completo']/following-sibling::div//input
    RETURN    ${valor}

Obter valor do campo "Telefone"
    Wait Until Element Is Visible    xpath=//label[text()='Telefone']/following-sibling::div//input    timeout=10s
    ${valor}=    Get Value    xpath=//label[text()='Telefone']/following-sibling::div//input
    RETURN    ${valor}

Obter valor do campo "CPF"
    Wait Until Element Is Visible    xpath=//label[text()='CPF']/following-sibling::div//input    timeout=10s
    ${valor}=    Get Value    xpath=//label[text()='CPF']/following-sibling::div//input
    RETURN    ${valor}