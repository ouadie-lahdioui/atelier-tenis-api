import { PlayerRepository } from '../../../infra/port/player-repository';
import { Player } from '../../domain/player';
import { getPlayerById } from '../get-player-by-id';

describe('getPlayerById', () => {
  const mockRepository: PlayerRepository = {
    getAll: jest.fn(),
  };

  it('should return the player with the given ID', async () => {
    const mockPlayers: Player[] = [
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
    ];

    (mockRepository.getAll as jest.Mock).mockResolvedValue(mockPlayers);

    const player = await getPlayerById(mockRepository, 1);

    expect(player).toBeDefined();
    expect(player?.id).toBe(1);
    expect(player?.firstname).toBe('John');
  });

  it('should return undefined if no player with the given ID is found', async () => {
    const mockPlayers: Player[] = [
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

    const player = await getPlayerById(mockRepository, 999);

    expect(player).toBeUndefined();
  });
});
