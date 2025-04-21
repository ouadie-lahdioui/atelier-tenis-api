import { Player } from '../domain/player';
import { PlayerRepository } from '../../infra/port/player-repository';

export async function getPlayerById(repository: PlayerRepository, id: number): Promise<Player | undefined> {
  const players = await repository.getAll();
  return players.find(player => player.id === id);
}