import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sendOrderEmail } from '../../../utils/sendOrderEmail';

export async function POST(request) {
    try {
        // Parse form data
        const formData = await request.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        const address = formData.get('address');
        const city = formData.get('city');
        const postalCode = formData.get('postalCode');
        const country = formData.get('country');

        // Validate required fields
        if (!name || !email || !address || !city || !postalCode || !country) {
            const errorUrl = new URL('/checkout?error=missing_fields', process.env.NEXT_PUBLIC_BASE_URL || 'http://kuyadoga.com:3000');
            return NextResponse.redirect(errorUrl);
        }

        // Retrieve the cart data from cookies
        const cookieHeader = await cookies();
        const cartCookie = cookieHeader.get('cart');

        // Parse the cart data from cartCookie.value
        let cart = [];
        if (cartCookie && cartCookie.value) {
            try {
                cart = JSON.parse(cartCookie.value);
            } catch (parseError) {
                console.error("Error parsing cartCookie.value:", parseError);
                return NextResponse.json({ error: 'Invalid cart data' }, { status: 500 });
            }
        }

        // Check if cart is an array
        if (!Array.isArray(cart)) {
            console.error('Cart data is not an array:', cart);
            return NextResponse.json({ error: 'Cart data is invalid' }, { status: 500 });
        }

        // Safely split name into first and last names, with fallback for last name
        const [firstName, lastName = 'Not Provided'] = name.split(' ');

        // Prepare order data for the Django backend
        const orderData = {
            customer: {
                first_name: firstName,
                last_name: lastName,
                email,
                address,
                city,
                postal_code: postalCode,
                country,
            },
            order_date: new Date().toISOString(),
            status: 'pending',
            total_price: cart.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0),
            order_lines: cart.map(item => ({
                product: item.id,
                quantity: item.quantity,
                unit_price: parseFloat(item.price),
            })),
        };

        // Log the order data being sent to Django
        console.log("Order Data being sent to Django:", orderData);

        // Send order data to Django API
        try {
            const djangoResponse = await fetch('http://kuyadoga.com:8002/api/orders/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            // Log the raw response before attempting to parse it
            const rawResponse = await djangoResponse.text();
            console.log("Raw response from Django:", rawResponse);

            // Attempt to parse JSON if response is expected to be JSON
            let djangoResponseData;
            try {
                djangoResponseData = JSON.parse(rawResponse);
            } catch (jsonError) {
                console.error("Failed to parse JSON response from Django. Response may not be in JSON format.");
                djangoResponseData = rawResponse; // Fall back to raw response for debugging
            }

            console.log("Parsed response from Django:", djangoResponseData);

            if (!djangoResponse.ok) {
                console.error('Failed to save order in Django:', djangoResponseData);
                return NextResponse.json({ error: 'Failed to save order in backend' }, { status: 500 });
            }
        } catch (error) {
            console.error("Error sending order to Django API:", error);
            return NextResponse.json({ error: 'Failed to communicate with backend' }, { status: 500 });
        }

        // Format cart items for email content
        const cartDetails = cart.map(item => (
            `Description: ${item.description}\n` +
            `Manufacturer: ${item.manufacturer}\n` +
            `Part Number: ${item.part_number}\n` +
            `Unit Price: $${parseFloat(item.price).toFixed(2)}\n` +
            `Quantity: ${item.quantity}\n` +
            `Total Price: $${(parseFloat(item.price) * item.quantity).toFixed(2)}\n\n`
        )).join('');

        // Send order confirmation email
        try {
            await sendOrderEmail(
                'ricardo.malla@malla-group.com', // Recipient email
                name,
                address,
                city,
                postalCode,
                country,
                email, // Customer email for inclusion in the email content
                cartDetails // Cart details for email content
            );
            console.log("Order confirmation email sent successfully.");
        } catch (error) {
            console.error("Failed to send order confirmation email:", error);
            return NextResponse.json({ error: 'Failed to send confirmation email' }, { status: 500 });
        }

        // Redirect to the order summary page
        console.log("Environment Mode:", process.env.NODE_ENV);
        console.log("NEXT_PUBLIC_BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL);

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://kuyadoga.com:3000';
        console.log("Resolved Base URL:", baseUrl);

        const redirectUrl = new URL('/order-summary', baseUrl);
        // const redirectUrl = new URL('/order-summary', process.env.NEXT_PUBLIC_BASE_URL || 'http://kuyadoga.com:3000');

        const response = NextResponse.redirect(redirectUrl);

        // Clear the cart cookie
        cookieHeader.set('cart', '[]', {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (error) {
        console.error('Error processing order:', error);
        return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
    }
}
