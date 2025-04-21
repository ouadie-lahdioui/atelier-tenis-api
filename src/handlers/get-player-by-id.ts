import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { getPlayerById } from '../core/use-cases/get-player-by-id';
import { FilePlayerRepository } from '../infra/repositories/file-player-repository';
import {
  PlayerIdRequiredError,
  PlayerInvalidIdError,
  PlayerNotFoundError,
} from '../shared/errors/player-error';
import { BaseError } from '../shared/errors/base-error';

import { APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (
  event: APIGatewayProxyEvent,
  context: unknown,
  callback: unknown
): Promise<APIGatewayProxyResult> => {
  try {
    const idParam = event.pathParameters?.id;

    if (!idParam) {
      throw new PlayerIdRequiredError();
    }

    const id = Number(idParam);

    if (isNaN(id)) {
      throw new PlayerInvalidIdError();
    }

    const repository = new FilePlayerRepository();
    const player = await getPlayerById(repository, id);

    if (!player) {
      throw new PlayerNotFoundError();
    }

    return {
      statusCode: 200,
      body: JSON.stringify(player),
    };
  } catch (error) {
    if (error instanceof BaseError) {
      return {
        statusCode: error.statusCode,
        body: JSON.stringify({ message: error.message }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
