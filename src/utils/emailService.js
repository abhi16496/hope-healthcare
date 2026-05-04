import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

/**
 * SECURITY WARNING: 
 * Sending emails directly from the frontend using AWS credentials exposes your 
 * Secret Access Key to anyone who visits your website. 
 * 
 * Recommendation: Move this logic to a backend (Node.js, AWS Lambda, etc.) 
 * to keep your credentials secure.
 */

const REGION = import.meta.env.VITE_AWS_REGION || "ap-south-1";
const sesClient = new SESClient({
  region: REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

export const sendEmail = async ({ to, subject, body, fromName }) => {
  const verifiedEmail = import.meta.env.VITE_VERIFIED_EMAIL;

  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: `"${fromName}" <${verifiedEmail}>`,
    ReplyToAddresses: [verifiedEmail],
  };

  try {
    const command = new SendEmailCommand(params);
    const result = await sesClient.send(command);
    return { success: true, result };
  } catch (error) {
    console.error("SES Send Error:", error);
    return { success: false, error: error.message };
  }
};
