import { handler } from '../../../src/handlers/get-player-by-id';
import { getPlayerById } from '../../../src/core/use-cases/get-player-by-id';
import { FilePlayerRepository } from '../../../src/infra/repositories/file-player-repository';
import {
  PlayerIdRequiredError,
  PlayerInvalidIdError,
  PlayerNotFoundError,
} from '../../../src/shared/errors/player-error';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

jest.mock('../../../src/core/use-cases/get-player-by-id');
jest.mock('../../../src/infra/repositories/file-player-repository');

const event = {
  pathParameters: { id: '1' },
  body: null,
  headers: {},
  multiValueHeaders: {},
  httpMethod: 'GET',
  isBase64Encoded: false,
  path: '',
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: null,
  requestContext: {} as unknown,
  resource: '',
} as APIGatewayProxyEvent;
const context = {} as Context;
const callback = jest.fn();

describe('get-player-by-id handler', () => {
  const mockGetPlayerById = getPlayerById as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 and the player data when a valid ID is provided', async () => {
    const mockPlayer = {
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
    };

    mockGetPlayerById.mockResolvedValue(mockPlayer);

    const response = await handler(event, context, callback);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(mockPlayer);
    expect(mockGetPlayerById).toHaveBeenCalledWith(
      expect.any(FilePlayerRepository),
      1
    );
  });

  it('should throw PlayerIdRequiredError if ID is missing', async () => {
    const response = await handler(
      { ...event, pathParameters: {} },
      context,
      callback
    );

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).message).toBe('Player ID is required');
  });

  it('should throw PlayerInvalidIdError if ID is not a number', async () => {
    const context = {} as Context;
    const callback = jest.fn();
    const response = await handler(
      { ...event, pathParameters: { id: 'invalid-123' } },
      context,
      callback
    );

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).message).toBe(
      'Player ID must be a valid number'
    );
  });

  it('should throw PlayerNotFoundError if player is not found', async () => {
    mockGetPlayerById.mockResolvedValue(null);

    const context = {} as Context;
    const callback = jest.fn();
    const response = await handler(
      { ...event, pathParameters: { id: '999' } },
      context,
      callback
    );

    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.body).message).toBe('Player not found');
  });

  it('should return 500 for unexpected errors', async () => {
    mockGetPlayerById.mockRejectedValue(new Error('Unexpected error'));

    const context = {} as Context;
    const callback = jest.fn();
    const response = await handler(event, context, callback);

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body).message).toBe('Internal Server Error');
  });
});
