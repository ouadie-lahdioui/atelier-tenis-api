import { PlayerRepository } from '../../../infra/port/player-repository';
import { Player } from '../../domain/player';
import { getPlayers } from '../get-players';

describe('getPlayers', () => {
  const mockRepository: PlayerRepository = {
    getAll: jest.fn(),
  };

  it('should return players sorted by rank', async () => {
    const mockPlayers: Player[] = [
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
    ];

    (mockRepository.getAll as jest.Mock).mockResolvedValue(mockPlayers);

    const players = await getPlayers(mockRepository);

    expect(players).toHaveLength(2);
    expect(players[0].id).toBe(1);
    expect(players[1].id).toBe(2);
  });

  it('should return an empty array if no players are found', async () => {
    (mockRepository.getAll as jest.Mock).mockResolvedValue([]);

    const players = await getPlayers(mockRepository);

    expect(players).toEqual([]);
  });
});
