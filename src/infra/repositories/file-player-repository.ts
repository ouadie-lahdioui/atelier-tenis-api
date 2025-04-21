import { Player } from '../../core/domain/player';
import playersData from '../data/head-to-head.json';
import { PlayerRepository } from '../port/player-repository';

export class FilePlayerRepository implements PlayerRepository {
  async getAll(): Promise<Player[]> {
    return playersData.players;
  }
}