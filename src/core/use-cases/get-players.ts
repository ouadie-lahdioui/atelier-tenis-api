import { Player } from '../domain/player';
import { PlayerRepository } from '../../infra/port/player-repository';

export async function getPlayers(repository: PlayerRepository): Promise<Player[]> {
  const players = await repository.getAll();
  return players.sort((player1, player2) => player1.data.rank - player2.data.rank);
}