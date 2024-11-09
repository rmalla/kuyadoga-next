// src/app/api/checkout/route.js

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        const address = formData.get('address');
        const city = formData.get('city');
        const postalCode = formData.get('postalCode');
        const country = formData.get('country');

        if (!name || !email || !address || !city || !postalCode || !country) {
            const errorUrl = new URL('/checkout?error=missing_fields', process.env.NEXT_PUBLIC_BASE_URL || 'http://kuyadoga.com:3000');
            return NextResponse.redirect(errorUrl);
        }

        // Save order to database or process logic here

        // Create a redirect response to the order summary page
        const redirectUrl = new URL('/order-summary', process.env.NEXT_PUBLIC_BASE_URL || 'http://kuyadoga.com:3000');
        const response = NextResponse.redirect(redirectUrl);

        // Retrieve cookies and clear the cart by setting it to an empty array
        const cookieHeader = await cookies();
        cookieHeader.set('cart', '[]', {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (error) {
        console.error('Error processing order:', error);
        return new NextResponse('Failed to place order', { status: 500 });
    }
}
