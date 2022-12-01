import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcryptjs from 'bcryptjs';
import App from '../app';

import { Response } from 'superagent';

import { jwtMock, tokenMock } from './mocks/login/mocks';
import * as jwt from '../helpers/utils/jwt';
import TeamModel from '../database/models/Team';
import { teamMock } from './mocks/team/mock';
import MatchesModel from '../database/models/Matches';
import { matchesMock, savedMatch } from './mocks/match/mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes do endpoint /leaderboard', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.stub(MatchesModel, 'findAll').resolves(matchesMock as any)
    sinon.stub(TeamModel, 'findAll').resolves(teamMock as any);
  })

  afterEach(sinon.restore);

  it('Response 200 e a classificação dos times de casa', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/home')

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Response 200 e a classificação dos times de casa após adicionar nova partida', async () => {
    sinon.stub(jwt, 'verify').resolves(jwtMock);
    sinon.stub(MatchesModel, 'create').resolves(savedMatch as any);

    chaiHttpResponse = await chai.request(app).post('/matches')
      .set({ Authorization: tokenMock })
      .send({
        "homeTeam": 16, 
        "awayTeam": 8, 
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      });
    
    sinon.stub(MatchesModel, 'update').resolves(savedMatch as any);

    chaiHttpResponse = await chai.request(app).patch(`/matches/${chaiHttpResponse.body.id}/finish`);

    chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

    expect(chaiHttpResponse.status).to.be.equal(200)
  })

})