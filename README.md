Projeto realizado para o curso de NodeJS da Puc-PR em parceria com a Visionnaire e Bradesco

Código original do projeto desenvolvido pelo professor Vinicius Godoy


Criar o servidor de autenticação de sua solução utilizando a OpenAPI.

Somente um aluno do grupo precisa entregar.

Criar as rotas de:

POST /users/login: Permite autenticar o usuário

GET /users/{id}: Obter informações a respeito do usuário identificado pelo {id}

A senha do usuário não deve ser retornada

- [x] POST /users: Cria um novo usuário

- [x] PUT /users/me: Atualiza as informações do usuário.

- [x] Deve funcionar somente para o usuário autenticado.

- [x] DELETE /users/me: Exclui o usuário. 

- [x] Deve funcionar somente para o usuário autenticado.

- [x] GET /info: Retorna um JSON contendo o nome dos alunos do grupo

Technologies used:
- [x] [Node.js](https://nodejs.org/en/)
- [x] [JWT](https://jwt.io/)
- [x] [Express](https://expressjs.com/)
- [x] [JavaScript](https://www.javascript.com/)
- [x] [mysql](https://www.mysql.com/)

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the dependencies.

```bash
npm install
```

## Configuration
The server runs on port 3001 by default. You can change it in the file `app.mjs`.
mySQL database connection is configured in the file `prisma.schema`.

## Usage

```bash
npm start
```





