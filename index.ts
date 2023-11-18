import 'dotenv/config'
import * as express from "express";
import { Request, Response } from "express";
import { ILibraryPublish } from "./types";

const app = express();
const PORT = 3000;
const PASSKEY = process.env.PASSKEY as string;
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL as string;

app.use(express.json());

app.post("/figma-webhook", (req: Request, res: Response) => {
    if (req.body.passcode === PASSKEY) {
        if (req.body.event_type === "LIBRARY_PUBLISH") {
            postToSlack(req.body as ILibraryPublish);
        }
    }
    res.status(200).send("OK");
});

app.listen(PORT, () => {
    console.log(
        `Port: ${PORT} \nPASSKEY: ${PASSKEY} \nSLACK_WEBHOOK_URL: ${SLACK_WEBHOOK_URL}`
    );
});

const postToSlack = async (update: ILibraryPublish): Promise<void> => {
    const message = `New Update on ${update.file_name} 🎉
    \n\`\`\`${update.description}\n\`\`\`
    \n--${update.triggered_by.handle}
    \nhttps://www.figma.com/file/${update.file_key}/${update.file_name}
    `;

    const payload = { text: message };
    const response = await fetch(SLACK_WEBHOOK_URL as string, {
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