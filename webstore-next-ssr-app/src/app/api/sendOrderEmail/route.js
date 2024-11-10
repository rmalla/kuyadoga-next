import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Initialize the SES client with the region from environment variables
const sesClient = new SESClient({ region: process.env.AWS_REGION });

export async function POST(req) {
    const { customerEmail, orderDetails } = await req.json();

    // Prepare email parameters
    const emailParams = {
        Source: process.env.SES_VERIFIED_EMAIL, // Verified email from environment variable
        Destination: {
            ToAddresses: [customerEmail],
        },
        Message: {
            Subject: {
                Data: "Order Confirmation",
            },
            Body: {
                Text: {
                    Data: `Thank you for your order!\n\nOrder Details:\n${orderDetails}`,
                },
            },
        },
    };

    try {
        const command = new SendEmailCommand(emailParams);
        await sesClient.send(command);
        return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return new Response(JSON.stringify({ message: 'Error sending email', error: error.message }), { status: 500 });
    }
}
