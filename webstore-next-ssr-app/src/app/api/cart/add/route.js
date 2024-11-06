// src/app/api/cart/add/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
    const { product } = await request.json();
    // Logic to add the product to a cart stored in cookies or session

    return NextResponse.json({ success: true });
}
