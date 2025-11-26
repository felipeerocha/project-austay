*** Settings ***
Library     SeleniumLibrary
Library     Collections
Library     String
Library     DateTime

Resource    ./config.robot

*** Keywords ***

Configurar Suite Compartilhada
    Open Browser    ${BASE_URL}    ${BROWSER}
    Maximize Browser Window
    Realizar Login Inicial
    Criar Dados Base Para Teste

Realizar Login Inicial
    Wait Until Element Is Visible    css=input[placeholder="seu@email.com"]    timeout=10s
    Input Text        css=input[placeholder="seu@email.com"]    ${VALID_EMAIL}
    Input Password    css=input[placeholder="*********"]        ${VALID_PASSWORD}
    Click Element     xpath=//button[contains(text(), "Entrar")]
    Wait Until Location Contains    /home    timeout=10s
    Fechar Alerta Mudança Senha
    Esperar Toast Desaparecer

Criar Dados Base Para Teste
    Go To    ${BASE_URL}/tutors
    Wait Until Element Is Visible    xpath=//div[contains(@class, 'sc-jBaHRL')]//span[contains(text(), 'Tutor')]    timeout=10s
    
    ${tutor_existe}=    Run Keyword And Return Status    Page Should Contain Element    xpath=//span[contains(text(), '${TUTOR_TESTE.nome}')]
    
    Run Keyword Unless    ${tutor_existe}    Criar Tutor Teste
    
    Go To    ${BASE_URL}/pets
    Wait Until Element Is Visible    xpath=//div[contains(@class, 'sc-Pgsbw')]//span[contains(text(), 'Nome')]    timeout=10s
    
    ${pet_existe}=    Run Keyword And Return Status    Page Should Contain Element    xpath=//*[contains(text(), '${PET_TESTE.nome}')]
    Run Keyword Unless    ${pet_existe}    Criar Pet Teste
    
    Go To    ${BASE_URL}/home
    Wait Until Element Is Visible    xpath=//button[contains(., 'Agendar')]    timeout=10s

    Wait Until Element Is Visible    xpath=//h2[contains(@class, 'sc-fcSHUR') and (contains(text(), 'Estadias Atuais') or contains(text(), 'Próximas Estadias'))]    timeout=10s
    ${estadia_existe}=    Run Keyword And Return Status    Page Should Contain Element    xpath=//h3[contains(@class, 'sc-jkvfRO') and contains(text(), '${PET_TESTE.nome}')]
    
    Run Keyword Unless    ${estadia_existe}    Criar Estadia Teste

Criar Tutor Teste
    Click Element    xpath=//button[contains(., 'Novo tutor +')]
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Novo tutor')]    timeout=10s
    
    Input Text    xpath=//label[contains(., 'Nome completo')]/following-sibling::div//input    ${TUTOR_TESTE.nome}
    Input Text    xpath=//label[contains(., 'Telefone')]/following-sibling::div//input    ${TUTOR_TESTE.telefone}
    Input Text    xpath=//label[contains(., 'CPF')]/following-sibling::div//input    ${TUTOR_TESTE.cpf}
    
    Click Element    xpath=//button[contains(., 'Cadastrar')]
    Wait Until Element Is Not Visible    xpath=//h2[contains(text(), 'Novo tutor')]    timeout=10s
    Wait Until Page Contains    Tutor cadastrado com sucesso!    timeout=10s

Criar Pet Teste
    Click Element    xpath=//button[contains(., 'Novo pet +')]
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Novo Pet')]    timeout=10s
    
    # Seleciona tutor - USANDO A MESMA LÓGICA QUE FUNCIONAVA
    Wait Until Element Is Visible    xpath=//label[contains(text(), 'Tutor')]/following-sibling::div    timeout=10s
    Sleep    1s
    Click Element    xpath=//label[contains(text(), 'Tutor')]/following-sibling::div
    Sleep    1s
    Wait Until Element Is Visible    xpath=//li[contains(., '${TUTOR_TESTE.nome}')]    timeout=10s
    Click Element    xpath=//li[contains(., '${TUTOR_TESTE.nome}')]
    Sleep    1s
    
    # Preenche os demais campos
    Input Text    xpath=//input[@placeholder="Digite o nome do pet"]    ${PET_TESTE.nome}
    
    # Espécie
    Click Element    xpath=//label[contains(., "Espécie")]/following::div[contains(@class, "MuiSelect-select")][1]
    Wait Until Element Is Visible    xpath=//li[@role="option" and contains(., "${PET_TESTE.especie}")]    timeout=5s
    Click Element    xpath=//li[@role="option" and contains(., "${PET_TESTE.especie}")]
    
    Input Text    xpath=//input[@placeholder="Ex: Labrador, Siames"]    ${PET_TESTE.raça}
    
    # Sexo
    Click Element    xpath=//label[contains(., "Sexo")]/following::div[contains(@class, "MuiSelect-select")][1]
    Wait Until Element Is Visible    xpath=//li[@role="option" and contains(., "${PET_TESTE.sexo}")]    timeout=5s
    Click Element    xpath=//li[@role="option" and contains(., "${PET_TESTE.sexo}")]
    
    Input Text    xpath=//input[@type="date"]    ${PET_TESTE.nascimento}
    
    # Clica no botão de cadastrar
    Wait Until Element Is Enabled    xpath=//button[contains(., 'Cadastrar Pet')]    timeout=10s
    Click Element    xpath=//button[contains(., 'Cadastrar Pet')]
    
    Wait Until Element Is Not Visible    xpath=//h2[contains(text(), 'Novo Pet')]    timeout=10s
    Wait Until Page Contains    Pet criado com sucesso!    timeout=10s

Criar Estadia Teste
    Click Element    xpath=//button[contains(., 'Agendar') and not(ancestor::*[contains(@class, 'Modal')])]
    Wait Until Element Is Visible    xpath=//h2[contains(text(), 'Agendar')]    timeout=10s
    
    Click Element    xpath=//div[@role="combobox"]
    Wait Until Element Is Visible    xpath=//li[contains(., '${PET_TESTE.nome}')]    timeout=10s
    Click Element    xpath=//li[contains(., '${PET_TESTE.nome}')]
    
    ${today}=    Get Current Date    result_format=%d-%m-%Y
    ${end_date}=    Get Current Date    increment=3 days    result_format=%d-%m-%Y
    
    Input Text    xpath=(//input[@type="date"])[1]    ${today}
    Input Text    xpath=(//input[@type="date"])[2]    ${end_date}

    Input Text    xpath=(//input[@type="time"])[1]    ${ESTADIA_TESTE.hora_entrada}
    Input Text    xpath=(//input[@type="time"])[2]    ${ESTADIA_TESTE.hora_saida}

    Click Element    xpath=//label[contains(., "Forma de pagamento")]/following::div[contains(@class, "MuiSelect-select")][1]
    Click Element    xpath=//li[@role="option" and contains(., "${ESTADIA_TESTE.pagamento}")]

    Input Text    css=input[placeholder="0,00"]    ${ESTADIA_TESTE.diaria}

    Click Element    xpath=//div[contains(@class, 'MuiDialog-paper')]//button[contains(., 'Agendar')]
    Wait Until Page Contains    Estadia criada com sucesso!    timeout=10s

Fechar Alerta Mudança Senha
    ${alert_visible}=    Run Keyword And Return Status    Wait Until Element Is Visible    xpath=//div[contains(@class, 'MuiDialog-paper')]//button[contains(., 'Agora não')]    timeout=3s
    Run Keyword If    ${alert_visible}    Click Element    xpath=//div[contains(@class, 'MuiDialog-paper')]//button[contains(., 'Agora não')]

Esperar Toast Desaparecer
    Sleep    2s
    ${toast_visible}=    Run Keyword And Return Status    Wait Until Element Is Visible    xpath=//div[contains(@class, 'Toastify')]    timeout=3s
    Run Keyword If    ${toast_visible}    Wait Until Element Is Not Visible    xpath=//div[contains(@class, 'Toastify')]    timeout=5s