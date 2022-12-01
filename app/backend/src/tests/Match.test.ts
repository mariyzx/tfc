import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcryptjs from 'bcryptjs';
import App from '../app';

import { Response } from 'superagent';
import MatchesModel from '../database/models/Matches';
import { matchesMock, savedMatch } from './mocks/match/mock';
import { matchesInProgress, matchesNotInProgress } from './mocks/match/matchesProgress';
import { jwtMock, tokenMock } from './mocks/login/mocks';
import * as jwt from '../helpers/utils/jwt';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;


describe('Testes do endpoint /matches', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.stub(MatchesModel, 'findAll').resolves(matchesMock as any)
  })

  afterEach(sinon.restore);

  it('Response 200 e uma lista com todas as partidas', async () => {
    chaiHttpResponse = await chai.request(app)
      .get('/matches');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock)
  })
  
  it('Response 200 e uma lista com partidas em progresso', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesInProgress)
  })

  it('Response 200 e uma lista com partidas que não estão em progresso', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/matches?inProgress=false');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesNotInProgress)
  })

  it('Response 201 e a partida salva', async () => {
    sinon.stub(jwt, 'verify').resolves(jwtMock);
    sinon.stub(MatchesModel, 'create').resolves(savedMatch as any);

    chaiHttpResponse = await chai.request(app)
      .post('/matches')
      .set({ Authorization: tokenMock })
      .send({
        "homeTeam": 16, 
        "awayTeam": 8, 
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      });

    expect(chaiHttpResponse.status).to.be.deep.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal(savedMatch);
  })

  it('Response 401 e mensagem de erro quando é dado post com token inválido', async () => {
    sinon.stub(MatchesModel, 'create').resolves(savedMatch as any);

    chaiHttpResponse = await chai.request(app)
      .post('/matches')
      .set('authorization', 'aa')


    expect(chaiHttpResponse.status).to.be.deep.equal(401);
    expect(chaiHttpResponse.body.message).to.be.deep.equal('Token must be a valid token');
  })
})