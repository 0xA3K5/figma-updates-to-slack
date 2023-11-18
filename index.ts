import { IVersion } from "./types";

const FIGMA_API_TOKEN = process.env.FIGMA_ACCESS_TOKEN as string;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY as string;
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL as string;

let LAST_VERSION_ID = ''

const figmaFetchSettings = {
    headers: {
        'X-Figma-Token': FIGMA_API_TOKEN
    }
}

const getFile = async () => {
    const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`;

    const response = await fetch(url, figmaFetchSettings)
    if (!response.ok) {
        throw new Error(`Error fetching Figma file: ${response.statusText}`);
    }

    console.log(response)
}

const getFileVersions = async (): Promise<IVersion[]> => {
    const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/versions`;

    const response = await fetch(url, figmaFetchSettings)

    if (!response.ok) {
        throw new Error(`Error fetching Figma file: ${response.statusText}`);
    }

    const versions: IVersion[] = (await response.json()).versions;

    versions.sort((a, b) => b.created_at.localeCompare(a.created_at));
    return versions
}

const updateLastVersionId = async () => {
    LAST_VERSION_ID = (await getFileVersions())[0].id;
}

const postToSlack = async (message: string): Promise<void> => {
    const payload = { text: message };
    const response = await fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const responseBody = await response.text();
        throw new Error(`Error posting to Slack: ${response.statusText}, Body: ${responseBody}`);
    }

};

getFile()
