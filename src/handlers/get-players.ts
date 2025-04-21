import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { FilePlayerRepository } from '../infra/repositories/file-player-repository';
import { getPlayers } from '../core/use-cases/get-players';

export const handler: APIGatewayProxyHandler =
  async (): Promise<APIGatewayProxyResult> => {
    const repository = new FilePlayerRepository();
    const players = await getPlayers(repository);

    return {
      statusCode: 200,
      body: JSON.stringify(players),
    };
  };
