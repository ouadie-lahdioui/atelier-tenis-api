import { handler } from '../get-players-stats';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

describe('get-players-stats handler', () => {
  it('should return status 200 and players stats', async () => {
    const event = {} as APIGatewayProxyEvent;
    const context = {} as Context;

    const result = (await handler(event, context, () => {})) as {
      statusCode: number;
      body: string;
    };

    expect(result.statusCode).toBe(200);

    const body = JSON.parse(result.body);
    expect(body).toEqual({
      averageIMC: 23.36,
      bestCountry: 'SRB',
      medianHeight: 185,
    });
  });
});
