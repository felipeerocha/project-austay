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

*** Variables ***
${PET_NAME_EDIT}       ${PET_TESTE.nome} Editado
${PET_BREED_EDIT}      Golden Retriever
${PET_BIRTH_EDIT}      15-06-2019

*** Test Cases ***

CT01 Editar nome do pet com sucesso
    [Documentation]    Testa a edição do nome do pet
    Quando acesso o perfil do pet de teste
    E clico no botão "Editar pet"
    E limpo e preencho o nome do pet    ${PET_NAME_EDIT}
    Quando clico no botão "Salvar"
    Então deve aparecer o toast "Pet atualizado com sucesso!"
    E na listagem o pet deve ter o nome    ${PET_NAME_EDIT}

CT02 Editar raça do pet com sucesso
    [Documentation]    Testa a edição da raça do pet
    Quando acesso o perfil do pet de teste
    E clico no botão "Editar pet"
    E limpo e preencho a raça do pet    ${PET_BREED_EDIT}
    Quando clico no botão "Salvar"
    Então deve aparecer o toast "Pet atualizado com sucesso!"
    E ao abrir o perfil do pet a raça deve ser    ${PET_BREED_EDIT}

CT03 Editar data de nascimento do pet
    [Documentation]    Testa a edição da data de nascimento
    Quando acesso o perfil do pet de teste
    E clico no botão "Editar pet"
    E limpo e preencho a data de nascimento    ${PET_BIRTH_EDIT}
    Quando clico no botão "Salvar"
    Então deve aparecer o toast "Pet atualizado com sucesso!"
    E ao abrir o perfil do pet a data de nascimento deve ser    ${PET_BIRTH_EDIT}

CT04 Editar sexo do pet
    [Documentation]    Testa a alteração do sexo do pet
    Quando acesso o perfil do pet de teste
    ${sexo_original}=    Obter valor do campo "Sexo"
    ${novo_sexo}=    Set Variable If    '${sexo_original}' == 'Macho'    Fêmea    Macho
    E clico no botão "Editar pet"
    E altero o sexo do pet    ${novo_sexo}
    Quando clico no botão "Salvar"
    Então deve aparecer o toast "Pet atualizado com sucesso!"
    E ao abrir o perfil do pet o sexo deve ser    ${novo_sexo}

CT05 Marcar pet como vacinado
    [Documentation]    Testa marcação do checkbox vacinado
    Quando acesso o perfil do pet de teste
    E clico no botão "Editar pet"
    E marco o checkbox "Vacinado"
    Quando clico no botão "Salvar"
    Então deve aparecer o toast "Pet atualizado com sucesso!"
    E ao abrir o perfil do pet o checkbox "Vacinado" deve estar marcado

CT06 Marcar pet como vermifugado
    [Documentation]    Testa marcação do checkbox vermifugado
    Quando acesso o perfil do pet de teste
    E clico no botão "Editar pet"
    E marco o checkbox "Vermifugado"
    Quando clico no botão "Salvar"
    Então deve aparecer o toast "Pet atualizado com sucesso!"
    E ao abrir o perfil do pet o checkbox "Vermifugado" deve estar marcado

CT07 Editar múltiplos campos do pet
    [Documentation]    Testa edição de múltiplos campos simultaneamente
    Quando acesso o perfil do pet de teste
    E clico no botão "Editar pet"
    ${nome_original}=    Obter valor do campo "Nome"
    E limpo e preencho o nome do pet    Rex Teste
    E limpo e preencho a raça do pet    Poodle
    E marco o checkbox "Vacinado"
    E marco o checkbox "Vermifugado"
    Quando clico no botão "Salvar"
    Então deve aparecer o toast "Pet atualizado com sucesso!"
    E na listagem o pet deve ter o nome    Rex Teste
    E ao abrir o perfil do pet os dados devem estar corretos
    ...    nome=Rex Teste
    ...    raca=Poodle
    ...    vacinado=True
    ...    vermifugado=True

CT08 Cancelar edição do pet mantém dados originais
    [Documentation]    Testa que o cancelamento mantém dados originais
    Quando acesso o perfil do pet de teste
    ${nome_original}=    Obter valor do campo "Nome"
    ${raca_original}=    Obter valor do campo "Raça"
    E clico no botão "Editar pet"
    E limpo e preencho o nome do pet    Nome Temporário
    E limpo e preencho a raça do pet    Raça Temporária
    E fecho o modal clicando no X
    E na listagem o pet deve ter o nome    ${nome_original}
    E ao abrir o perfil do pet os campos devem ter valores originais
    ...    nome=${nome_original}
    ...    raca=${raca_original}

CT09 Visualizar dados do pet sem editar
    [Documentation]    Testa modo de visualização (campos desabilitados)
    Quando acesso o perfil do pet de teste
    Então o modal "Perfil do pet" deve estar aberto
    E os campos devem estar desabilitados para edição
    E o botão "Editar pet" deve estar visível
    E o botão "Salvar" não deve estar visível

*** Keywords ***

Preparar Teste
    Go To    ${BASE_URL}/pets
    Wait Until Element Is Visible    xpath=//button[contains(., 'Novo pet +')]    timeout=10s 
    Sleep    1s

# ========= ACTIONS =========

Quando acesso o perfil do pet de teste
    Wait Until Element Is Visible    xpath=//*[contains(text(), '${PET_TESTE.nome}')]    timeout=15s
    Sleep    1s
    Click Element    xpath=//*[contains(text(), '${PET_TESTE.nome}')]/ancestor::div[1]/descendant::*[local-name()='svg' and @stroke='currentColor'][1]
    Sleep    1s
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Perfil do pet')]    timeout=10s

E clico no botão "Editar pet"
    Wait Until Element Is Visible    xpath=//button[contains(., 'Editar pet')]    timeout=10s
    Click Element    xpath=//button[contains(., 'Editar pet')]
    Sleep    1s

Quando clico no botão "Salvar"
    Wait Until Element Is Visible    xpath=//button[contains(., 'Salvar')]    timeout=10s
    Wait Until Element Is Enabled    xpath=//button[contains(., 'Salvar')]    timeout=10s
    Click Element    xpath=//button[contains(., 'Salvar')]
    Sleep    2s

E limpo e preencho o nome do pet
    [Arguments]    ${NOME}
    Wait Until Element Is Visible    xpath=//label[text()='Nome']/following-sibling::div//input    timeout=10s
    Execute JavaScript    
    ...    var input = document.evaluate("//label[text()='Nome']/following-sibling::div//input", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    ...    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    ...    nativeInputValueSetter.call(input, '');
    ...    var event = new Event('input', { bubbles: true});
    ...    input.dispatchEvent(event);
    Sleep    0.3s
    Input Text    xpath=//label[text()='Nome']/following-sibling::div//input    ${NOME}
    Sleep    0.3s

E limpo e preencho a raça do pet
    [Arguments]    ${RACA}
    Wait Until Element Is Visible    xpath=//label[text()='Raça']/following-sibling::div//input    timeout=10s
    Execute JavaScript    
    ...    var input = document.evaluate("//label[text()='Raça']/following-sibling::div//input", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    ...    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    ...    nativeInputValueSetter.call(input, '');
    ...    var event = new Event('input', { bubbles: true});
    ...    input.dispatchEvent(event);
    Sleep    0.3s
    Input Text    xpath=//label[text()='Raça']/following-sibling::div//input    ${RACA}
    Sleep    0.3s

E limpo e preencho a data de nascimento
    [Arguments]    ${DATA}
    Wait Until Element Is Visible    xpath=//label[text()='Nascimento']/following-sibling::div//input    timeout=10s
    Execute JavaScript    
    ...    var input = document.evaluate("//label[text()='Nascimento']/following-sibling::div//input", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    ...    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    ...    nativeInputValueSetter.call(input, '');
    ...    var event = new Event('input', { bubbles: true});
    ...    input.dispatchEvent(event);
    Sleep    0.3s
    Input Text    xpath=//label[text()='Nascimento']/following-sibling::div//input    ${DATA}
    Sleep    0.3s
E altero o sexo do pet
    [Arguments]    ${SEXO}
    Wait Until Element Is Visible    xpath=//label[text()='Sexo']/following-sibling::div//input    timeout=10s
    Execute JavaScript    
    ...    var input = document.evaluate("//label[text()='Sexo']/following-sibling::div//input", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    ...    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    ...    nativeInputValueSetter.call(input, '');
    ...    var event = new Event('input', { bubbles: true});
    ...    input.dispatchEvent(event);
    Sleep    0.3s
    Input Text    xpath=//label[text()='Sexo']/following-sibling::div//input    ${SEXO}
    Sleep    0.3s

E marco o checkbox "Vacinado"
    Wait Until Element Is Visible    xpath=//label[contains(., 'Vacinado')]    timeout=10s
    ${is_checked}=    Run Keyword And Return Status    Checkbox Should Be Selected    xpath=//label[contains(., 'Vacinado')]//input[@type='checkbox']
    Run Keyword If    not ${is_checked}    Click Element    xpath=//label[contains(., 'Vacinado')]
    Sleep    0.5s

E marco o checkbox "Vermifugado"
    Wait Until Element Is Visible    xpath=//label[contains(., 'Vermifugado')]    timeout=10s
    ${is_checked}=    Run Keyword And Return Status    Checkbox Should Be Selected    xpath=//label[contains(., 'Vermifugado')]//input[@type='checkbox']
    Run Keyword If    not ${is_checked}    Click Element    xpath=//label[contains(., 'Vermifugado')]
    Sleep    0.5s

E fecho o modal clicando no X
    Wait Until Element Is Visible    xpath=//button[@aria-label='close']    timeout=10s
    Click Element    xpath=//button[@aria-label='close']

# ========= VALIDATIONS =========

Então deve aparecer o toast "Pet atualizado com sucesso!"
    Wait Until Page Contains Element    xpath=//div[contains(@class, 'Toastify')]    timeout=10s
    Page Should Contain    Pet atualizado com sucesso!
    Sleep    1s


E na listagem o pet deve ter o nome
    [Arguments]    ${NOME_ESPERADO}
    Wait Until Element Is Visible    xpath=//*[contains(text(), '${NOME_ESPERADO}')]    timeout=10s
    Page Should Contain Element    xpath=//*[contains(text(), '${NOME_ESPERADO}')]

E ao abrir o perfil do pet a raça deve ser
    [Arguments]    ${RACA_ESPERADA}
    Quando acesso o perfil do pet de teste
    Wait Until Element Is Visible    xpath=//label[text()='Raça']/following-sibling::div//input    timeout=10s
    ${raca_atual}=    Get Value    xpath=//label[text()='Raça']/following-sibling::div//input
    Should Be Equal    ${raca_atual}    ${RACA_ESPERADA}
    E fecho o modal clicando no X

E ao abrir o perfil do pet a data de nascimento deve ser
    [Arguments]    ${DATA_ESPERADA}
    Quando acesso o perfil do pet de teste
    Wait Until Element Is Visible    xpath=//label[text()='Nascimento']/following-sibling::div//input    timeout=10s
    ${data_atual}=    Get Value    xpath=//label[text()='Nascimento']/following-sibling::div//input
    Should Be Equal    ${data_atual}    ${DATA_ESPERADA}
    E fecho o modal clicando no X

E ao abrir o perfil do pet o sexo deve ser
    [Arguments]    ${SEXO_ESPERADO}
    Quando acesso o perfil do pet de teste
    Wait Until Element Is Visible    xpath=//label[text()='Sexo']/following-sibling::div//input    timeout=10s
    ${sexo_atual}=    Get Value    xpath=//label[text()='Sexo']/following-sibling::div//input
    Should Be Equal    ${sexo_atual}    ${SEXO_ESPERADO}
    E fecho o modal clicando no X

E ao abrir o perfil do pet o checkbox "Vacinado" deve estar marcado
    Quando acesso o perfil do pet de teste
    Wait Until Element Is Visible    xpath=//label[contains(., 'Vacinado')]//input[@type='checkbox']    timeout=10s
    Checkbox Should Be Selected    xpath=//label[contains(., 'Vacinado')]//input[@type='checkbox']
    E fecho o modal clicando no X

E ao abrir o perfil do pet o checkbox "Vermifugado" deve estar marcado
    Quando acesso o perfil do pet de teste
    Wait Until Element Is Visible    xpath=//label[contains(., 'Vermifugado')]//input[@type='checkbox']    timeout=10s
    Checkbox Should Be Selected    xpath=//label[contains(., 'Vermifugado')]//input[@type='checkbox']
    E fecho o modal clicando no X

E ao abrir o perfil do pet os dados devem estar corretos
    [Arguments]    ${nome}    ${raca}    ${vacinado}    ${vermifugado}
    Quando acesso o perfil do pet de teste
    
    Wait Until Element Is Visible    xpath=//label[text()='Nome']/following-sibling::div//input    timeout=10s
    ${nome_atual}=    Get Value    xpath=//label[text()='Nome']/following-sibling::div//input
    Should Be Equal    ${nome_atual}    ${nome}
    
    ${raca_atual}=    Get Value    xpath=//label[text()='Raça']/following-sibling::div//input
    Should Be Equal    ${raca_atual}    ${raca}
    
    Run Keyword If    '${vacinado}' == 'True'
    ...    Checkbox Should Be Selected    xpath=//label[contains(., 'Vacinado')]//input[@type='checkbox']
    ...    ELSE
    ...    Checkbox Should Not Be Selected    xpath=//label[contains(., 'Vacinado')]//input[@type='checkbox']
    
    Run Keyword If    '${vermifugado}' == 'True'
    ...    Checkbox Should Be Selected    xpath=//label[contains(., 'Vermifugado')]//input[@type='checkbox']
    ...    ELSE
    ...    Checkbox Should Not Be Selected    xpath=//label[contains(., 'Vermifugado')]//input[@type='checkbox']
    
    E fecho o modal clicando no X

E ao abrir o perfil do pet os campos devem ter valores originais
    [Arguments]    ${nome}    ${raca}
    Quando acesso o perfil do pet de teste
    
    Wait Until Element Is Visible    xpath=//label[text()='Nome']/following-sibling::div//input    timeout=10s
    ${nome_atual}=    Get Value    xpath=//label[text()='Nome']/following-sibling::div//input
    Should Be Equal    ${nome_atual}    ${nome}
    
    ${raca_atual}=    Get Value    xpath=//label[text()='Raça']/following-sibling::div//input
    Should Be Equal    ${raca_atual}    ${raca}
    
    E fecho o modal clicando no X

Então o modal "Perfil do pet" deve estar aberto
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Perfil do pet')]    timeout=10s

E os campos devem estar desabilitados para edição
    Element Should Be Disabled    xpath=//label[text()='Nome']/following-sibling::div//input
    Element Should Be Disabled    xpath=//label[text()='Raça']/following-sibling::div//input
    Element Should Be Disabled    xpath=//label[text()='Nascimento']/following-sibling::div//input

E o botão "Editar pet" deve estar visível
    Element Should Be Visible    xpath=//button[contains(., 'Editar pet')]

E o botão "Salvar" não deve estar visível
    Page Should Not Contain Element    xpath=//button[contains(., 'Salvar')]

Obter valor do campo "Nome"
    Wait Until Element Is Visible    xpath=//label[text()='Nome']/following-sibling::div//input    timeout=10s
    ${valor}=    Get Value    xpath=//label[text()='Nome']/following-sibling::div//input
    RETURN    ${valor}

Obter valor do campo "Raça"
    Wait Until Element Is Visible    xpath=//label[text()='Raça']/following-sibling::div//input    timeout=10s
    ${valor}=    Get Value    xpath=//label[text()='Raça']/following-sibling::div//input
    RETURN    ${valor}

Obter valor do campo "Sexo"
    Wait Until Element Is Visible    xpath=//label[text()='Sexo']/following-sibling::div//input    timeout=10s
    ${valor}=    Get Value    xpath=//label[text()='Sexo']/following-sibling::div//input
    RETURN    ${valor}