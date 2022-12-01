import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcryptjs from 'bcryptjs';
import * as jwt from '../helpers/utils/jwt';
import App from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

import UserModel from '../database/models/User';
import { jwtMock, roleMock, tokenMock, userMock } from './mocks/login/mocks';
import { afterEach, beforeEach } from 'mocha';


describe('Testes do endpoint /login', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel)
  })

  afterEach(sinon.restore);

  it('Login com credenciais válidas - Response 200', async () => {
    // no service usamos o compareSync para comparar a senha do body com o banco de dados;
    sinon.stub(bcryptjs, 'compareSync').returns(true);

    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: "admin@admin.com",
      password: "secret_admin"
    });

    expect(chaiHttpResponse.status).to.be.equal(200)
  })

  it('Login com credenciais inválidas - Response 401', async () => {
    sinon.stub(bcryptjs, 'compareSync').returns(false);

    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: "admin@admin.com",
      password: "secret_admin"
    });

    expect(chaiHttpResponse.status).to.be.equal(401)
  })
}) 

describe('Testes do endpoint /login/validate', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.stub(UserModel, 'findOne').resolves(roleMock as UserModel)
  })

  afterEach(sinon.restore);

  it('Login com token válido - Response 200 e token', async () => {
    sinon.stub(jwt, 'verify').resolves(jwtMock);

    chaiHttpResponse = await chai.request(app)
      .get('/login/validate')
      .set({ Authorization: tokenMock });

      expect(chaiHttpResponse.status).to.be.equal(200)
  })

  it('Login com token inválido - Response 401', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate').set({
      Authorization: 'aaa'
    });

    expect(chaiHttpResponse.status).to.be.equal(401)
  })
})