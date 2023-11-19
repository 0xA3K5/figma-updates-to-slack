import { Handler } from "@netlify/functions";
import { ILibraryPublish } from "../../types";
import { postToSlack } from "../..";

export const handler: Handler = async (event, context) => {
  try {
    const PASSKEY = process.env.PASSKEY as string;

    if (event.httpMethod !== "POST" || !event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Bad Request" }),
      };
    }

    const requestBody = JSON.parse(event.body);

    if (requestBody.passcode !== PASSKEY) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized" }),
      };
    }

    if (requestBody.event_type === "LIBRARY_PUBLISH") {
      await postToSlack(requestBody as ILibraryPublish);
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "OK" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};