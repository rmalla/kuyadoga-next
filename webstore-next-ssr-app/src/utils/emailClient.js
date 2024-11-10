// src/utils/emailClient.js
import { SESClient } from '@aws-sdk/client-ses';

// Initialize and export the SES client
export const sesClient = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
