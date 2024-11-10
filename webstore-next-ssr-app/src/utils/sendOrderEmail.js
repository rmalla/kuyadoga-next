// src/utils/emailClient.js

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

export const sesClient = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export async function sendOrderEmail(recipientEmail, name, address, city, postalCode, country, customerEmail, cartDetails) {
    const emailParams = {
        Source: process.env.EMAIL_SENDER,
        Destination: {
            ToAddresses: [recipientEmail],
        },
        Message: {
            Subject: { Data: `Order Confirmation for ${name}` },
            Body: {
                Text: {
                    Data: `Thank you for your order, ${name}!\n\nHere are your order details:\n\n` +
                          `Name: ${name}\nEmail: ${customerEmail}\nAddress: ${address}\nCity: ${city}\n` +
                          `Postal Code: ${postalCode}\nCountry: ${country}\n\n` +
                          `Order Items:\n\n${cartDetails}\n` +
                          `We appreciate your business!`,
                },
            },
        },
    };

    try {
        const command = new SendEmailCommand(emailParams);
        await sesClient.send(command);
        console.log("Order confirmation email sent successfully.");
    } catch (error) {
        console.error("Failed to send order confirmation email:", error);
        throw new Error("Email sending failed");
    }
}
