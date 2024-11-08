// src/app/api/contact/route.js

import { NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

// Add console logs here to check environment variable values
// console.log("AWS Access Key:", process.env.AWS_ACCESS_KEY_ID);
// console.log("AWS Secret Key:", process.env.AWS_SECRET_ACCESS_KEY);
// console.log("Sender Email:", process.env.EMAIL_SENDER);
// console.log("Receiver Email:", process.env.EMAIL_RECEIVER);

const sesClient = new SESClient({
    region: 'us-east-1', // e.g., 'us-east-1'
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export async function POST(request) {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const params = {
        Source: process.env.EMAIL_SENDER, // The sender's email address
        Destination: {
            ToAddresses: [process.env.EMAIL_RECEIVER],
        },
        Message: {
            Subject: { Data: `Contact Form Submission from ${name}` },
            Body: {
                Text: {
                    Data: `Message from ${name} <${email}>:\n\n${message}`,
                },
            },
        },
    };

    try {
        const command = new SendEmailCommand(params);
        await sesClient.send(command);
        return NextResponse.json({ success: 'Message sent successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email with SES:', error);
        return NextResponse.json({ error: 'An error occurred while sending the email' }, { status: 500 });
    }
}
