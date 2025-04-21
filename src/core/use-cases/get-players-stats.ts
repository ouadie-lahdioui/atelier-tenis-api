import { Player } from '../domain/player';
import { PlayerRepository } from '../../infra/port/player-repository';
import { calculateIMC, getAverageIMC } from '../../utils/imc';

type CountryStats = {
  [code: string]: { wins: number; matches: number };
};

export async function getPlayerStats(repository: PlayerRepository): Promise<{
  bestCountry: string;
  averageIMC: number;
  medianHeight: number;
}> {
  const players = await repository.getAll();

  const countryStats: CountryStats = {};
  const imcs: number[] = [];
  const heights: number[] = [];

  for (const player of players) {
    const { weight, height, last } = player.data;
    const country = player.country.code;

    const wins = last.filter((r) => r === 1).length;
    const matches = last.length;

    if (!countryStats[country]) {
      countryStats[country] = { wins: 0, matches: 0 };
    }

    countryStats[country].wins += wins;
    countryStats[country].matches += matches;

    imcs.push(calculateIMC(weight, height));
    heights.push(height);
  }

  // Pays avec le meilleur ratio
  let bestCountry = '';
  let bestRatio = 0;

  for (const [country, { wins, matches }] of Object.entries(countryStats)) {
    const ratio = wins / matches;
    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestCountry = country;
    }
  }

  // Médiane taille
  heights.sort((a, b) => a - b);
  const mid = Math.floor(heights.length / 2);
  const medianHeight =
    heights.length % 2 === 0
      ? (heights[mid - 1] + heights[mid]) / 2
      : heights[mid];

  return Promise.resolve({
    bestCountry,
    averageIMC: Number(getAverageIMC(imcs).toFixed(2)),
    medianHeight,
  });
}
