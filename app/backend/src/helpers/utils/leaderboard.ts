import ILeaderboard from '../../interfaces/ILeaderboard';
import { IMatch } from '../../interfaces/IMatch';

// template de informações;
let data = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

const resetInfo = () => {
  data.totalPoints = 0;
  data.totalGames = 0;
  data.totalVictories = 0;
  data.totalDraws = 0;
  data.totalLosses = 0;
  data.goalsFavor = 0;
  data.goalsOwn = 0;
  data.goalsBalance = 0;
  data.efficiency = 0;
};

const orderClass = (matches: ILeaderboard[]) => matches.sort((t1, t2) => (
  t1.totalPoints - t2.totalPoints
  || t1.totalVictories - t2.totalVictories
  || t1.goalsBalance - t2.goalsBalance
  || t1.goalsFavor - t2.goalsFavor
  || t1.goalsOwn - t2.goalsOwn
));

const addVictory = (homeTeamGoals: number, awayTeamGoals: number) => {
  data.totalPoints += 3;
  data.totalVictories += 1;
  data.goalsFavor += homeTeamGoals;
  data.goalsOwn += awayTeamGoals;
};

const addVictoryAway = (homeTeamGoals: number, awayTeamGoals: number) => {
  data.totalPoints += 3;
  data.totalVictories += 1;
  data.goalsFavor += awayTeamGoals;
  data.goalsOwn += homeTeamGoals;
};

const addDraws = (homeTeamGoals: number, awayTeamGoals: number) => {
  data.totalPoints += 1;
  data.totalDraws += 1;
  data.goalsFavor += homeTeamGoals;
  data.goalsOwn += awayTeamGoals;
};

const addDrawsAway = (homeTeamGoals: number, awayTeamGoals: number) => {
  data.totalPoints += 1;
  data.totalDraws += 1;
  data.goalsFavor += awayTeamGoals;
  data.goalsOwn += homeTeamGoals;
};

const addLoss = (homeTeamGoals: number, awayTeamGoals: number) => {
  data.totalLosses += 1;
  data.goalsFavor += homeTeamGoals;
  data.goalsOwn += awayTeamGoals;
};

const addLossAway = (homeTeamGoals: number, awayTeamGoals: number) => {
  data.totalLosses += 1;
  data.goalsFavor += awayTeamGoals;
  data.goalsOwn += homeTeamGoals;
};

const returnPointsHome = (matches: IMatch[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    // se homeTeam tiver mais gols +1 vitória:
    if (homeTeamGoals > awayTeamGoals) addVictory(homeTeamGoals, awayTeamGoals);
    // se empatar +1 empate;
    if (homeTeamGoals === awayTeamGoals) addDraws(homeTeamGoals, awayTeamGoals);
    // se tiver menos gols +1 derrota;
    if (homeTeamGoals < awayTeamGoals) addLoss(homeTeamGoals, awayTeamGoals);
  });
};

const returnPointsAway = (matches: IMatch[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    // se awayTeam tiver mais gols +1 vitória:
    if (homeTeamGoals < awayTeamGoals) addVictoryAway(homeTeamGoals, awayTeamGoals);
    // se empatar +1 empate;
    if (homeTeamGoals === awayTeamGoals) addDrawsAway(homeTeamGoals, awayTeamGoals);
    // se tiver menos gols +1 derrota;
    if (homeTeamGoals > awayTeamGoals) addLossAway(homeTeamGoals, awayTeamGoals);
  });
};

const returnStatisticsHome = (name: string, matches: IMatch[]) => {
  // se o nome não for uma string vazia, as informações são 'limpas'
  if (name !== data.name) resetInfo();
  data.name = name;
  returnPointsHome(matches);
  data.totalGames += 1;
  data.goalsBalance = data.goalsFavor - data.goalsOwn;
  const ef = (data.totalPoints / (data.totalGames * 3)) * 100;
  const eff = Number(ef).toFixed(2);
  data.efficiency = Number(eff);

  return data;
};

const returnStatisticsAway = (name: string, matches: IMatch[]) => {
  if (name !== data.name) resetInfo();
  data.name = name;
  returnPointsAway(matches);
  data.totalGames += 1;
  data.goalsBalance = data.goalsFavor - data.goalsOwn;
  const ef = (data.totalPoints / (data.totalGames * 3)) * 100;
  const eff = Number(ef).toFixed(2);
  data.efficiency = Number(eff);

  return data;
};

const returnAllStatistics = (tm: ILeaderboard[]) => {
  const totalPoints = tm[0].totalPoints + tm[1].totalPoints;
  const totalGames = tm[0].totalGames + tm[1].totalGames;
  data = {
    name: tm[0].name,
    totalPoints,
    totalGames,
    totalVictories: tm[0].totalVictories + tm[1].totalVictories,
    totalDraws: tm[0].totalDraws + tm[1].totalDraws,
    totalLosses: tm[0].totalLosses + tm[1].totalLosses,
    goalsFavor: tm[0].goalsFavor + tm[1].goalsFavor,
    goalsOwn: tm[0].goalsOwn + tm[1].goalsOwn,
    goalsBalance: tm[0].goalsBalance + tm[1].goalsBalance,
    efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
  };
  return data;
};

export { returnStatisticsHome, returnStatisticsAway, orderClass, returnAllStatistics };
