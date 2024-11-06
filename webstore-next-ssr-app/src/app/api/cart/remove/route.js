// src/app/api/cart/remove/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
    const { productId } = await request.json();
    // Logic to remove the product from the cart

    return NextResponse.json({ success: true });
}
