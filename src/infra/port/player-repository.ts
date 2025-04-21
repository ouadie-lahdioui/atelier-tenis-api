import { Player } from '../../core/domain/player';

export interface PlayerRepository {
  getAll(): Promise<Player[]>;
}