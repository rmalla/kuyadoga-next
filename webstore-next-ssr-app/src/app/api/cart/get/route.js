// src/app/api/cart/get/route.js

import { NextResponse } from 'next/server';
import { getSessionCart } from '../../../../lib/cart';

export async function GET(request) {
    const cart = getSessionCart(request.cookies);
    return NextResponse.json({ cart });
}
