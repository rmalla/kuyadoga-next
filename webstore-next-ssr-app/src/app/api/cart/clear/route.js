// src/app/api/cart/clear/route.js

import { NextResponse } from 'next/server';
import { saveSessionCart } from '../../../../lib/cart';

export async function POST() {
    const response = NextResponse.json({ cart: [] });
    saveSessionCart(response, []); // Clear the cart in cookies
    return response;
}
