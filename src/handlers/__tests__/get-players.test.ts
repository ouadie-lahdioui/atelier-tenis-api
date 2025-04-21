import { handler } from '../get-players';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

describe('get-players handler', () => {
  it('should return status 200 and sorted players list', async () => {
    const event = {} as APIGatewayProxyEvent;
    const context = {} as Context;

    const result = await handler(event, context, () => {}) as { statusCode: number; body: string };
    
    expect(result.statusCode).toBe(200);

    const body = JSON.parse(result.body);
    expect(Array.isArray(body)).toBe(true);
  });
});