# Projeto Trybe Futebol Clube!

Nesse projeto foi desenvolvida uma API para um site informativo de partidas e classificações de futebol utilizando os princípios SOLID e POO. Nessa API é possível: Listar times e partidas, autenticar o usuário cadastrado, gerar classificações e manipular o banco de dados MySQL.

[Documentação da API TFC!](https://tfc-production.up.railway.app/docs/)

## Desempenho

O projeto Trybe Futebol Clube foi desenvolvido por [Mariana Werneck](https://www.linkedin.com/in/marinhomariana8/) durante o curso de Desenvolvimento Web na [Trybe](https://www.betrybe.com/)! Foi adquirido 100% do projeto total!

![image](https://user-images.githubusercontent.com/69324347/205336782-25585115-a00f-4a75-a30f-76541321c08e.png)

## Como visualizar

[Clique aqui para ver o projeto funcionando!](https://tfc-mariyzx.vercel.app/leaderboard)

Se você fizer login com as credenciais `admin@admin.com` e `secret_admin` você consegue editar gols e partidas do seu time do coração!

## Como utilizar:

Clone o repositório: `git@github.com:mariyzx/tfc.git`.

Mude para a branch `secondary`: `git checkout secondary`.

<details>
  <summary><strong>Rodando com Docker :whale: ou Localmente</strong></summary>
  
  ## 👉 Com Docker
   **⚠ Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**
   
   > Rode o serviço com o comando `npm run compose:up` na raíz do projeto.
  - Esse serviço irá inicializar três containers chamados `app_frontend`, `app_backend` e outro chamado `mysql`.
  - A partir daqui a sua aplicação já está rodando, com o back-end na porta `3001` e o front-end na porta `3000`.
  
  ## 👉 Sem Docker

  > :information_source: Instale as dependências com `npm postinstall` na raíz do projeto.
  
  > ✨ Complete o arquivo .env com suas variáveis de ambiente.
  - Existe um arquivo `.env.example` para saber quais são as informações.
  
  > Para rodar o front-end, vá até a pasta `app/frontend` e rode o comando `npm start`.
  
  > Para rodar o back-end, vá até a pasta `app/backend` e rode o comando `npm run dev`.
  
  - ✨ **Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.
  - ✨ **Dica:** O projeto espera que a versão do `node` utilizada seja a 16.

  <br>  
</details>

## Tecnologias utilizadas:

- TypeScript
- Express
- Node.JS
- Docker
- Sequelize
- Mocha
- Chai
- Sinon
- JWT
- BCryptJS
- SOLID
- POO

## Connect:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/marinhomariana8/) [![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
)](mailto:marinhomariana8@gmail.com)
