import 'dotenv/config';
import {
  EEvents,
  IFileDete,
  ILibraryPublish,
  TEvent,
} from "../types";

export const getEventType = (requestBody: any): EEvents | null => {
  if (requestBody.event_type && typeof requestBody.event_type === "string") {
    if (Object.values(EEvents).includes(requestBody.event_type)) {
      return requestBody.event_type as EEvents;
    }
  }
  return null;
};

const getMessage = (event: TEvent): string => {
  const getFileUrl = (fileKey: string, fileName: string) => {
    return `https://www.figma.com/file/${fileKey}/${fileName}`;
  };

  switch (event.event_type) {
    case EEvents.LIBRARY_PUBLISH:
      const libraryUpdate = event as ILibraryPublish;
      return `
        🎉 New Update on ${libraryUpdate.file_name}
        \n\`\`\`${libraryUpdate.description}\n\`\`\`
        \n-${libraryUpdate.triggered_by.handle}
        \n${getFileUrl(libraryUpdate.file_key, libraryUpdate.file_name)}
        `;
    case EEvents.FILE_DELETE:
      const fileDelete = event as IFileDete;
      return `
        🗑️ ${fileDelete.file_name} is deleted by ${fileDelete.triggered_by.handle}
        \n${getFileUrl(fileDelete.file_key, fileDelete.file_name)}
        `;
  }
};

export const sendSlackMessage = async (event: TEvent): Promise<void> => {
  const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL as string;
  const message = getMessage(event)

  const payload = { text: message };
  const response = await fetch(SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const responseBody = await response.text();
    throw new Error(
      `Error posting to Slack: ${response.statusText}, Body: ${responseBody}`
    );
  }
};
