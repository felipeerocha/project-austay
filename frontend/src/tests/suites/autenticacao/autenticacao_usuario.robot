*** Settings ***
Library    SeleniumLibrary
Library    String
Library    Collections

Resource    ../../config.robot

*** Variables ***
${INVALID_EMAIL}     naoexiste@email.com
${WRONG_PASSWORD}     senhaErrada123

*** Test Cases ***

CT01 Login com credenciais válidas
    [Documentation]    Testa login bem-sucedido com credenciais válidas
    Dado que estou na página de login
    E preencho o campo de e-mail com     ${VALID_EMAIL}
    E preencho o campo de senha com      ${VALID_PASSWORD}
    Quando clico no botão de login
    Então devo ser autenticado com sucesso
    E devo ser redirecionado para a tela inicial
    [Teardown]    Close Browser

CT02 Usuário não encontrado
    [Documentation]    Testa tentativa de login com e-mail não cadastrado
    Dado que estou na página de login
    E preencho o campo de e-mail com     ${INVALID_EMAIL}
    E preencho o campo de senha com      ${WRONG_PASSWORD}
    Quando clico no botão de login
    Então deve aparecer mensagem de erro usuário não encontrado
    E o login não deve ser realizado
    [Teardown]    Close Browser

CT03 Credenciais inválidas
    [Documentation]    Testa tentativa de login com senha incorreta
    Dado que estou na página de login
    E preencho o campo de e-mail com     ${VALID_EMAIL}
    E preencho o campo de senha com      ${WRONG_PASSWORD}
    Quando clico no botão de login
    Então deve aparecer mensagem de erro credenciais inválidas
    E o login não deve ser realizado
    [Teardown]    Close Browser

CT04 Campos obrigatórios não preenchidos
    [Documentation]    Testa validação de campos obrigatórios
    Dado que estou na página de login
    Quando clico no botão de login
    Então deve aparecer mensagem de erro campos obrigatórios
    E o login não deve ser realizado
    [Teardown]    Close Browser

CT05 Funcionalidade Esqueci a Senha
    [Documentation]    Testa a funcionalidade de recuperação de senha
    Dado que estou na página de login
    Quando clico no link "Esqueceu a senha?"
    Então o modal de recuperação de senha deve estar aberto
    Quando fecho o modal de recuperação de senha
    [Teardown]    Close Browser

CT06 Alternar visibilidade da senha
    [Documentation]    Testa a funcionalidade de mostrar/ocultar senha
    Dado que estou na página de login
    E preencho o campo de senha com     ${VALID_PASSWORD}
    Então a senha deve estar oculta
    Quando clico no ícone de visibilidade da senha
    Então a senha deve ficar visível
    Quando clico no ícone de visibilidade da senha
    Então a senha deve estar oculta novamente
    [Teardown]    Close Browser

*** Keywords ***

Dado que estou na página de login
    Open Browser     ${BASE_URL}     ${BROWSER}
    Maximize Browser Window
    Wait Until Element Is Visible    css=form    timeout=10s
    Set Selenium Speed    0.3

E preencho o campo de e-mail com
    [Arguments]    ${email}
    Input Text     css=input[placeholder="seu@email.com"]    ${email}

E preencho o campo de senha com
    [Arguments]    ${password}
    Input Password     css=input[placeholder="*********"]     ${password}

Quando clico no botão de login
    Click Element    xpath=//button[contains(text(), "Entrar")]

Então devo ser autenticado com sucesso
    Wait Until Location Contains     /home     timeout=10s

E devo ser redirecionado para a tela inicial
    Location Should Contain     /home

Então deve aparecer mensagem de erro usuário não encontrado
    Wait Until Page Contains     E-mail não localizado    timeout=10s

Então deve aparecer mensagem de erro credenciais inválidas
    Wait Until Page Contains     Senha incorreta     timeout=10s

Então deve aparecer mensagem de erro campos obrigatórios
    Wait Until Page Contains     Obrigatório     timeout=10s

E o login não deve ser realizado
    Location Should Be     ${BASE_URL}/

Quando clico no link "Esqueceu a senha?"
    Click Element     xpath=//a[contains(text(), "Esqueceu a senha?")]

Então o modal de recuperação de senha deve estar aberto
    Page Should Contain Element    xpath=//h2[normalize-space(.)="Redefinir senha"]

Quando fecho o modal de recuperação de senha
    Press Keys     None     ESC
    Wait Until Element Is Not Visible     css=[data-testid="forgot-password-modal"]

Então a senha deve estar oculta
    ${type}=    Get Element Attribute    css=input[placeholder="*********"]    type
    Should Be Equal    ${type}    password

Quando clico no ícone de visibilidade da senha
    Click Element    css=button[aria-label="toggle password visibility"]

Então a senha deve ficar visível
    ${type}=    Get Element Attribute    css=input[placeholder="*********"]    type
    Should Be Equal    ${type}    text

Então a senha deve estar oculta novamente
    ${type}=    Get Element Attribute    css=input[placeholder="*********"]    type
    Should Be Equal    ${type}    password