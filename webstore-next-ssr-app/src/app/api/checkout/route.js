// src/app/api/checkout/route.js

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

        // Debugging: Log cartCookie to inspect its contents
        console.log("cartCookie value:", cartCookie);

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
        } catch (error) {
            console.error("Failed to send order confirmation email:", error);
            return NextResponse.json({ error: 'Failed to send confirmation email' }, { status: 500 });
        }

        // Redirect to the order summary page
        const redirectUrl = new URL('/order-summary', process.env.NEXT_PUBLIC_BASE_URL || 'http://kuyadoga.com:3000');
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
