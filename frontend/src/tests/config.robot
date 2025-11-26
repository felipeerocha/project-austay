*** Settings ***
Library     Collections

*** Variables ***
# Configurações globais
${BROWSER}             chrome
${BASE_URL}            http://localhost:5173

# Credenciais de autenticação
${VALID_EMAIL}         test@email.com
${VALID_PASSWORD}      test123**

&{TUTOR_TESTE}         nome=João Silva Teste    telefone=(61) 99999-9999    cpf=000.111.222-44
&{PET_TESTE}           nome=Rex Teste    especie=Cachorro    raça=Labrador    sexo=Macho    nascimento=01-01-2020
&{ESTADIA_TESTE}       hora_entrada=08:00    hora_saida=18:00    diaria=100,00    pagamento=Pix