# Austay Frontend

<!-- Badges -->
[![Yarn](https://img.shields.io/badge/Yarn-%232C8EBB.svg?style=flat&logo=yarn&logoColor=white)](https://yarnpkg.com/)
[![React](https://img.shields.io/badge/React-%2361DAFB.svg?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-%236A5ACD.svg?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%233178C6.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Styled-Components](https://img.shields.io/badge/Styled––Components-%23DB7093.svg?style=flat&logo=styled-components&logoColor=white)](https://styled-components.com/)
[![Axios](https://img.shields.io/badge/Axios-00579F.svg?style=flat&logo=axios&logoColor=white)](https://axios-http.com/)
<!-- Badges -->

Frontend do sistema Austay, desenvolvido em React + TypeScript, utilizando Vite como bundler.
O projeto consome a API Austay (FastAPI) via axios e segue uma arquitetura organizada por responsabilidades para facilitar a manutenção e evolução.

## 📜 Estrutura do Projeto - Arquitetura

A aplicação segue uma arquitetura modular, separando componentes, páginas, serviços, hooks, tipos e utilitários. Também utiliza styled-components para estilização, mantendo os estilos desacoplados em arquivos `.styles.ts`.

```
├── assets/              # Imagens, ícones e outros recursos estáticos.
├── components/          # Componentes reutilizáveis (botões, inputs, layouts, etc.).
├── hooks/               # Custom hooks para abstrair lógicas de estado/reuso.
├── pages/               # Páginas principais da aplicação (Home, Login, Dashboard, etc.).
├── services/            # Comunicação com a API (axios, endpoints, interceptors).
├── theme/               # Definição de tema global (cores, tipografia, espaçamentos).
├── types/               # Definição de tipos e interfaces TypeScript.
├── utils/               # Funções utilitárias e helpers.
├── App.tsx              # Componente raiz da aplicação.
├── App.styles.ts        # Estilos globais da aplicação.
├── main.tsx             # Ponto de entrada, renderiza o React DOM.
└── vite-env.d.ts        # Tipagens auxiliares do Vite.
```

## 🚀 Como Rodar o Projeto

### Pré-requisitos
* Node.js (>= 18)
* Yarn (>= 1.22) ou npm
* Git

### Passo a Passo

1.  **Clone o Repositório**
    ```bash
    git clone https://github.com/felipeerocha/austay-backend.git
    cd austay-frontend/frontend
    ```
2.  **Instale as Dependências do Projeto**
    O arquivo `package.json` contém a lista de todos as dependências necessário. Este comando instala todos elas de uma vez.

    Usando yarn:
    ```bash
    yarn install
    ```

    Ou usando npm:
    ```bash
    npm install
    ```

## 🎨 Estilização
O projeto segue a convenção de separar estilos em arquivos `.styles.ts`:

Exemplo:

```
Home.tsx          -> Componente principal da página Home
Home.styles.ts    -> Estilos da página Home
```

Isso garante clareza e organização no código.
    
## 🛠️ Tecnologias utilizadas
- [Yarn](https://yarnpkg.com/) – Gerenciador de pacotes  
- [React](https://react.dev/) – Biblioteca para construção da interface  
- [Vite](https://vitejs.dev/) – Bundler e ferramenta de desenvolvimento  
- [TypeScript](https://www.typescriptlang.org/) – Superset de JavaScript com tipagem estática  
- [Styled-components](https://styled-components.com/) – Estilização com CSS-in-JS  
- [Axios](https://axios-http.com/) – Cliente HTTP para consumo de API  
