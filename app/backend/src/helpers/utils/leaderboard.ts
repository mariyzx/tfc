import ILeaderboard from '../../interfaces/ILeaderboard';
import { IMatch } from '../../interfaces/IMatch';

// template de informações;
const data = {
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

const addVictory = (homeTeamGoals: number, awayTeamGoals: number) => {
  data.totalPoints += 3;
  data.totalVictories += 1;
  data.goalsFavor += homeTeamGoals;
  data.goalsOwn += awayTeamGoals;
};

const addDraws = (homeTeamGoals: number, awayTeamGoals: number) => {
  data.totalPoints += 1;
  data.totalDraws += 1;
  data.goalsFavor += homeTeamGoals;
  data.goalsOwn += awayTeamGoals;
};

const orderClass = (matches: ILeaderboard[]) => matches.sort((t1, t2) => (
  t1.totalPoints - t2.totalPoints
  || t1.totalVictories - t2.totalVictories
  || t1.goalsBalance - t2.goalsBalance
  || t1.goalsFavor - t2.goalsFavor
  || t1.goalsOwn - t2.goalsOwn
));

const addLoss = (homeTeamGoals: number, awayTeamGoals: number) => {
  data.totalLosses += 1;
  data.goalsFavor += homeTeamGoals;
  data.goalsOwn += awayTeamGoals;
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

export { returnStatisticsHome, orderClass };
