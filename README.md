# Projeto Trybe Futebol Clube!

Nesse projeto foi desenvolvida uma API para um site informativo de partidas e classificações de futebol utilizando os princípios SOLID e POO. Nessa API é possível: Listar times e partidas, autenticar o usuário cadastrado, gerar classificações e manipular o banco de dados MySQL.

[Documentação da API TFC!](https://tfc-production.up.railway.app/docs/)

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Consulte **[Instalação](#🔧-instalação)** para saber como rodar o projeto.

### 📋 Pré-requisitos

  ``Docker e Docker-compose``
  > Seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.

  ``Node``
  > O projeto espera que sua versão do node seja a 16.

## 🔧 Instalação


Clone o repositório:
```
git@github.com:mariyzx/tfc.git.
```

<details>
  <summary><strong>Rodando com Docker 🐳 ou Localmente</strong></summary>
  
  ## 👉 Com Docker

   
   > Rode o serviço com o comando `npm run compose:up` na raíz do projeto.
  - Esse serviço irá inicializar três containers chamados `app_frontend`, `app_backend` e outro chamado `mysql`.
  - A partir daqui a sua aplicação já está rodando, com o back-end na porta `3001` e o front-end na porta `3000`.
  
  ## 👉 Sem Docker

  > :information_source: Instale as dependências com `npm postinstall` na raíz do projeto.
  
  > ✨ Complete o arquivo .env com suas variáveis de ambiente.
  - Existe um arquivo `.env.example` para saber quais são as informações.
  
  > Para rodar o front-end, vá até a pasta `app/frontend` e rode o comando `npm start`.
  
  > Para rodar o back-end, vá até a pasta `app/backend` e rode o comando `npm run dev`.
  
  <br>  
</details>

## ⚙️ Executando os testes

Para executar os testes do projeto TFC basta ir até a pasta `app/backend` e utilizar o comando `npm run test`.

### 🔩 Analise os testes de ponta a ponta

Esses testes verificam o retorno de cada rota, simulando as requisições do usuário. Dessa forma temos uma noção do funcionamento do sistema, além de verificar se ele está atendendo às normas apresentadas.

```
chaiHttpResponse = await chai.request(app).post('/login').send({
      email: "admin@admin.com",
      password: "secret_admin"
    });
```
## 🛠️ Construído com

* [TypeScript](https://www.typescriptlang.org/) - Linguagem utilizada.
* [Node.JS](https://nodejs.org/en/) - Ambiente de execução.
* [Express](https://expressjs.com/pt-br/) - Framework para Node.js.
* [Docker](https://www.docker.com/) - Criação de ambiente isolado.
* [Sequelize](https://sequelize.org/) - ORM para Node.js.
* [Mocha](https://mochajs.org/) - Framework de testes.
* [Chai](https://www.chaijs.com/) - Framework de testes.
* [Sinon](https://sinonjs.org/) - Framework de testes.
* [JWT](https://jwt.io/) - Método de autenticação.
* [BCryptJS](https://www.npmjs.com/package/bcrypt) - Hash de senhas.
* [POO](https://developer.mozilla.org/pt-BR/docs/Glossary/OOP) - Paradigma da programação.
* [SOLID](https://medium.com/desenvolvendo-com-paixao/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530) - Princípios da programação orientada a objetos.

## ✍ Desempenho

O projeto Trybe Futebol Clube foi desenvolvido por [Mariana Werneck](https://www.linkedin.com/in/marinhomariana8/) durante o curso de Desenvolvimento Web na [Trybe](https://www.betrybe.com/)! Foi adquirido 100% do projeto total!

![image](https://user-images.githubusercontent.com/69324347/205336782-25585115-a00f-4a75-a30f-76541321c08e.png)

## 🖥 Como visualizar

[Clique aqui para ver o projeto funcionando!](https://tfc-mariyzx.vercel.app/leaderboard)

Se você fizer login com as credenciais `admin@admin.com` e `secret_admin` você consegue editar gols e partidas do seu time do coração!

## 🔨 Futuras alterações

Como sempre há algo para melhorar, essas são algumas ideias para implementar no TFC no futuro:

* Validação de campos com `Joi` ou `Zod`;
* Implementação da rota GET `/matches/:id`;
* Implementação da rota POST `/teams`;

## 💚 Connect:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/marinhomariana8/) [![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
)](mailto:marinhomariana8@gmail.com)
