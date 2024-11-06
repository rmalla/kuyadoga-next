// src/app/api/products/route.js

import { NextResponse } from 'next/server';

export async function GET() {
    // Logic to fetch all products
    const products = []; // Fetch products from database or API

    return NextResponse.json(products);
}
