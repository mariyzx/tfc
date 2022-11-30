import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcryptjs from 'bcryptjs';
import App from '../app';

import { Response } from 'superagent';
import TeamModel from '../database/models/Team';
import { teamMock } from './mocks/login/mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes do endpoint /teams', () => {
  let chaiHttpResponse: Response;
  

  describe('Retorna todos os times' , () => { 
    before(async () => {
      sinon.stub(TeamModel, 'findAll').resolves(teamMock as any)
    })
  
    after(sinon.restore)

    it('Response 200 e uma lista com os times', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/teams');

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(teamMock)
    })
  });

  describe('Retorna o time com o id específico', () => {
    before(async () => {
      sinon.stub(TeamModel, 'findByPk').resolves(teamMock as any)
    })
  
    after(sinon.restore)

    it('Response 200 e o time com o id', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/teams/2');


      expect(chaiHttpResponse.status).to.be.deep.equal(200);
    })
  })

  describe('Caso o time não exista', () => {
    before(async () => {
      sinon.stub(TeamModel, 'findByPk').resolves(teamMock as any)
    })
  
    after(sinon.restore)

    it('Response 404 e mensagem de erro', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/teams/487');


      expect(chaiHttpResponse.status).to.be.deep.equal(400);
    })
  })
})