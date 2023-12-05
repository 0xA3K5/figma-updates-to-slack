import { Handler } from '@netlify/functions';
import { getEventType, sendSlackMessage } from '../../src/utils';

export const handler: Handler = async (event) => {
  try {
    const PASSCODE = process.env.PASSCODE as string;

    if (event.httpMethod !== 'POST' || !event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Bad Request' }),
      };
    }

    const requestBody = JSON.parse(event.body);

    if (requestBody.passcode !== PASSCODE) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Unauthorized' }),
      };
    }

    const eventType = getEventType(requestBody);

    if (eventType) {
      console.log(eventType);
      sendSlackMessage(requestBody);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'OK' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

export default { handler };
