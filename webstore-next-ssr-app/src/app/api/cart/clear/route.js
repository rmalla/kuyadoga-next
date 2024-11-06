// src/app/api/cart/clear/route.js

import { NextResponse } from 'next/server';

export async function POST() {
    // Logic to clear the cart

    return NextResponse.json({ success: true });
}
