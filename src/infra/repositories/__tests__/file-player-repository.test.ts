import { Player } from '../../../core/domain/player';
import { FilePlayerRepository } from '../file-player-repository';

jest.mock('../../data/head-to-head.json', () => ({
  players: [
    {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      shortname: 'JD',
      sex: 'M',
      country: { picture: 'url', code: 'USA' },
      picture: 'url',
      data: {
        rank: 1,
        points: 1000,
        weight: 80,
        height: 180,
        age: 25,
        last: [1, 1, 0, 1, 0],
      },
    },
    {
      id: 2,
      firstname: 'Jane',
      lastname: 'Smith',
      shortname: 'JS',
      sex: 'F',
      country: { picture: 'url', code: 'FRA' },
      picture: 'url',
      data: {
        rank: 2,
        points: 900,
        weight: 70,
        height: 170,
        age: 23,
        last: [1, 0, 1, 1, 1],
      },
    },
  ],
}));

describe('FilePlayerRepository', () => {
  let repository: FilePlayerRepository;

  beforeEach(() => {
    repository = new FilePlayerRepository();
  });

  it('should return all players from the data file', async () => {
    const players: Player[] = await repository.getAll();

    expect(players).toBeDefined();
    expect(players).toHaveLength(2);
    expect(players[0].firstname).toBe('John');
    expect(players[1].firstname).toBe('Jane');
  });

  it('should return players with correct structure', async () => {
    const players: Player[] = await repository.getAll();

    players.forEach((player) => {
      expect(player).toHaveProperty('id');
      expect(player).toHaveProperty('firstname');
      expect(player).toHaveProperty('lastname');
      expect(player).toHaveProperty('shortname');
      expect(player).toHaveProperty('sex');
      expect(player).toHaveProperty('country');
      expect(player).toHaveProperty('picture');
      expect(player).toHaveProperty('data');
      expect(player.data).toHaveProperty('rank');
      expect(player.data).toHaveProperty('points');
      expect(player.data).toHaveProperty('weight');
      expect(player.data).toHaveProperty('height');
      expect(player.data).toHaveProperty('age');
      expect(player.data).toHaveProperty('last');
    });
  });
});
