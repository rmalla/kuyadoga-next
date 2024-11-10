// src/app/api/order/route.js

import { NextResponse } from 'next/server';
import { sesClient } from '../../../utils/emailClient';
import { SendEmailCommand } from '@aws-sdk/client-ses';

export async function POST(request) {
    try {
        // Parse request data
        const { name, email, address, city, postalCode, country } = await request.json();

        // Validate required fields
        if (!name || !email || !address || !city || !postalCode || !country) {
            return NextResponse.json({ error: 'All fields are required for order confirmation' }, { status: 400 });
        }

        // Define email content
        const params = {
            Source: process.env.EMAIL_SENDER, // Sender's email address (verified in SES)
            Destination: {
                ToAddresses: [process.env.EMAIL_RECEIVER], // Change to recipient's email if it's fixed
            },
            Message: {
                Subject: { Data: `Order Confirmation for ${name}` },
                Body: {
                    Text: {
                        Data: `Thank you for your order, ${name}!\n\nHere are your order details:\n\n` +
                              `Name: ${name}\nEmail: ${email}\nAddress: ${address}\nCity: ${city}\n` +
                              `Postal Code: ${postalCode}\nCountry: ${country}\n\n` +
                              `We appreciate your business!`,
                    },
                },
            },
        };

        // Send the email
        const command = new SendEmailCommand(params);
        await sesClient.send(command);

        // Return success response
        return NextResponse.json({ success: 'Order confirmation email sent successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
        return NextResponse.json({ error: 'An error occurred while sending the order confirmation email' }, { status: 500 });
    }
}


