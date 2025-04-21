import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { FilePlayerRepository } from '../infra/repositories/file-player-repository';
import { getPlayerStats } from '../core/use-cases/get-players-stats';

export const handler: APIGatewayProxyHandler =
  async (): Promise<APIGatewayProxyResult> => {
    const repository = new FilePlayerRepository();
    const stats = await getPlayerStats(repository);

    return {
      statusCode: 200,
      body: JSON.stringify(stats),
    };
  };
