// src/app/api/cart/remove/route.js

import { NextResponse } from 'next/server';
import { getSessionCart } from '../../../../lib/cart';

export async function POST(request) {
    const formData = await request.formData();
    const productId = formData.get('deleteItem');

    console.log('Product ID to remove:', productId);

    // Retrieve the current cart
    let cart = await getSessionCart();
    console.log('Current cart before deletion:', JSON.stringify(cart, null, 2));

    // Filter out the item with the specified ID
    cart = cart.filter(item => item.id !== Number(productId));
    console.log('Cart after deletion:', JSON.stringify(cart, null, 2));

    // Redirect back to the cart page on your specified base URL
    const response = NextResponse.redirect('http://kuyadoga.com:3000/cart');
    response.cookies.set('cart', JSON.stringify(cart), {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    console.log('Updated cart successfully saved to cookies after deletion.');

    return response;
}
