import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import App from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

import UserModel from '../database/models/User';
import { tokenMock, userMock } from './mocks/login/mocks';


describe('Testes do endpoint /login', () => {
  let chaiHttpResponse: Response;

  describe('Login com credenciais válidas' , () => { 
    before(async () => {
      sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel)
    })
  
    after(sinon.restore)

    it('Login com credenciais válidas - Response 200 e token', async () => {
      sinon.stub(bcryptjs, "compareSync").returns(true);

      chaiHttpResponse = await chai.request(app)
        .post('/login').send({
          email: "admin@admin.com",
          password: "secret_admin"
        });
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.have.property('token');
    });
  })

 describe('Login com credenciais inválidas', () => {
  before(async () => {
    sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel)
  })

  after(sinon.restore)

    it('Email em branco - Response 400 e mensagem de erro', async () => {
      sinon.stub(bcryptjs, "compareSync").returns(false);

      chaiHttpResponse = await chai.request(app)
        .post('/login').send({
          email: "",
          password: "secret_admin"
        });
  
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
    });

    it('Email inválido - Response 401 e mensagem de erro', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login').send({
          email: "admin@xablau.com",
          password: "secret_admin"
        });
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
    });

    it('Senha em branco - Response 400 e mensagem de erro', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login').send({
          email: "admin@admin.com",
          password: ""
        });
  
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
    });

    it('Senha inválida - Response 401 e mensagem de erro', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login').send({
          email: "admin@admin.com",
          password: "secret_xablau"
        });
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
    });
  })

  describe('Validar login com um login válido', () => {
    before(async () => {
      sinon.stub(jwt, 'verify').returns({data: {
        email: "admin@admin.com",
        password: "secret_admin"
      }} as any)
    });
  
    after(() => {
      (jwt.verify as sinon.SinonStub).restore()
    })

    it('Retorna status 200 e role', async () => {
      sinon.stub(bcryptjs, "compareSync").returns(true);

      chaiHttpResponse = await chai.request(app)
        .get('/login/validate')
        .set('authorization', `Bearer ${tokenMock}`).send()


        expect(chaiHttpResponse.status).to.be.equal(200)
    })
  }) 

  describe('Validar login com um login inválido', () => {
    before(async () => {
      sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel)
    })
  
    after(sinon.restore)

    it('Retorna status 401 e mensagem de erro', async () => {
      sinon.stub(bcryptjs, "compareSync").returns(false);

      chaiHttpResponse = await chai.request(app)
        .get('/login/validate')
        .set('Authorization', tokenMock)

        expect(chaiHttpResponse.status).to.be.equal(401)
        expect(chaiHttpResponse.body.message).to.be.equal('Invalid token');
    })
  }) 
}) 