Projeto realizado para o curso de NodeJS da Puc-PR em parceria com a Visionnaire e Bradesco

Código original do projeto desenvolvido pelo professor Vinicius Godoi


Criar o servidor de autenticação de sua solução utilizando a OpenAPI.

Somente um aluno do grupo precisa entregar.

Criar as rotas de:

POST /users/login: Permite autenticar o usuário

GET /users/{id}: Obter informações a respeito do usuário identificado pelo {id}

A senha do usuário não deve ser retornada
- [x] POST /users: Cria um novo usuário

PUT /users/me: Atualiza as informações do usuário. Deve funcionar somente para o usuário autenticado.

DELETE /users/me: Exclui o usuário. Deve funcionar somente para o usuário autenticado.

GET /info: Retorna um JSON contendo o nome dos alunos do grupo