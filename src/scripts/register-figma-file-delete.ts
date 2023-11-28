import 'dotenv/config';

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN as string;
const FIGMA_TEAM_ID = process.env.FIGMA_TEAM_ID as string;
const ENDPOINT = process.env.ENDPOINT as string;
const PASSCODE = process.env.PASSCODE as string;

if (!FIGMA_ACCESS_TOKEN || !FIGMA_TEAM_ID || !ENDPOINT || !PASSCODE) {
  console.error('Missing environment variables.');
  process.exit(1);
}

async function registerFileDelete() {
  try {
    const response = await fetch('https://api.figma.com/v2/webhooks', {
      method: 'POST',
      headers: {
        'X-FIGMA-TOKEN': FIGMA_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: 'FILE_DELETE',
        team_id: FIGMA_TEAM_ID,
        endpoint: ENDPOINT,
        passcode: PASSCODE,
      }),
    });
    if (response.status === 200) {
      console.log('FILE_DELETE event is registered');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

registerFileDelete();
