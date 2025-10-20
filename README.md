# Plataforma de Reservas - Backend

Este é o repositório do backend da Plataforma de Reservas, desenvolvido em Node.js e utilizando Sequelize para ORM (Object-Relational Mapping). O objetivo é fornecer uma API robusta para gerenciamento de usuários (clientes e prestadores), serviços e reservas.

---

## 1. Configuração e Dependências

Para iniciar o projeto, é fundamental verificar os scripts disponíveis e as dependências.

### ⚙️ Scripts Essenciais

Recomendamos fortemente verificar o arquivo **`package.json`** para ver todos os scripts disponíveis (`start`, `dev`, `migrate`, etc.).

Os comandos principais são:

| Comando | Descrição |
| :--- | :--- |
| `npm install` | Instala todas as dependências do projeto. |
| `npm run dev` | Inicia o servidor em modo de desenvolvimento (usando nodemon). |
| `npx sequelize db:migrate` | Cria a estrutura do banco de dados (tabelas) a partir das migrations. |


### 🔑 Configuração do Banco de Dados

O projeto utiliza **MySQL**. A estrutura do banco de dados deve ser configurada através das migrations (`src/database/migrations`), incluindo as tabelas:

* `users` (com tipos CLIENTE e PRESTADOR)
* `services`
* `reservations`

---

## 2. Ambiente de Hospedagem e Deploy

### ☁️ Ambiente de Produção/Teste

É importante notar que **o ambiente de backend (Node.js) e o banco de dados (MySQL) estão hospedados em uma Virtual Private Server (VPS) remota.**

* **Endereço IP:** `195.179.193.95`
* **Porta do Backend:** `3004` (Acessível via NGINX ou diretamente)

A configuração foi realizada diretamente na VPS, garantindo a comunicação entre a aplicação e o servidor MySQL via `localhost` (ou `127.0.0.1`).

---

## 3. Desafios Superados e Aprendizados

Apesar do tempo limitado para o desenvolvimento e *deploy*, a configuração do ambiente na VPS proporcionou um aprendizado imenso em ambientes de produção.


