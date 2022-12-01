import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcryptjs from 'bcryptjs';
import App from '../app';

import { Response } from 'superagent';
import TeamModel from '../database/models/Team';
import { oneTeamMock, teamMock } from './mocks/team/mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes do endpoint /teams', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.stub(TeamModel, 'findAll').resolves(teamMock as any)
  })

  afterEach(sinon.restore);
  
  it('Response 200 e uma lista com os times', async () => {
    chaiHttpResponse = await chai.request(app)
      .get('/teams');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(teamMock)
  })
  

  it('Response 200 e o time com o id', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(oneTeamMock as any);

    chaiHttpResponse = await chai.request(app)
      .get('/teams/2');


    expect(chaiHttpResponse.status).to.be.deep.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(oneTeamMock);
  })

  it('Caso o time não exista - Response 400 e mensagem de erro', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(null);

    chaiHttpResponse = await chai.request(app)
      .get('/teams/9999');


    expect(chaiHttpResponse.status).to.be.deep.equal(400);
  })
})