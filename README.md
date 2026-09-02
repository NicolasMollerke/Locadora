# Locadora System

Um sistema completo de locadora de filmes desenvolvido com uma arquitetura separada em **Backend** e **Frontend**, utilizando tecnologias modernas para gerenciamento de clientes, catálogo de filmes, aluguéis, comentários e propostas.

---

## Tecnologias Utilizadas

### Backend
* **Node.js** com **TypeScript**
* **Express** (Framework web)
* **Prisma ORM** (Gerenciamento de banco de dados e migrações)
* **SQLite / Banco Relacional** (Configurado via Prisma)
* Integração com serviços de Inteligência Artificial (`iaServices.ts`)

### Frontend
* **React** com **TypeScript**
* **Vite** (Empacotador e ambiente de desenvolvimento rápido)
* **React Router / Context API** para gerenciamento de rotas e estado global (Clientes, Filmes, etc.)
* **CSS Moderno** para estilização personalizada

---

## Estrutura do Projeto

```text
Locadora/
├── back/               # Servidor e API Backend
│   ├── prisma/         # Schema do banco de dados e sementes (seed)
│   ├── src/            # Rotas da API (clientes, filmes, login, propostas, etc.)
│   └── services/       # Serviços auxiliares (incluindo IA)
│
└── front/              # Aplicação Cliente (Frontend)
    ├── public/         # Arquivos públicos e assets estáticos
    └── src/            # Componentes, páginas, contextos e utilitários
```

---

## Como Executar o Projeto

Certifique-se de ter o **Node.js** instalado em sua máquina.

### 1. Configurando e Executando o Backend

1. Navegue até a pasta do backend:
   ```bash
   cd Locadora/back
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o arquivo `.env` com as variáveis de ambiente necessárias.
4. Execute as migrações do Prisma e popule o banco de dados (se aplicável):
   ```bash
   npx prisma migrate dev
   npm run seed
   ```
5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

### 2. Configurando e Executando o Frontend

1. Abra um novo terminal e navegue até a pasta do frontend:
   ```bash
   cd Locadora/front
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie a aplicação cliente:
   ```bash
   npm run dev
   ```

---

## Funcionalidades Principais

* **Gerenciamento de Clientes:** Cadastro, edição e listagem de clientes.
* **Catálogo de Filmes:** Visualização detalhada de filmes, capas, sinopses e categorias.
* **Sistema de Aluguéis e Propostas:** Controle de locações e propostas de usuários.
* **Comentários:** Seção de interação para avaliações de filmes.
* **Integração com IA:** Recursos inteligentes integrados no backend.

---

## Licença

Este projeto foi desenvolvido para fins acadêmicos e de aprendizado. Sinta-se à vontade para utilizar e modificar!
