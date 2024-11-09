// src/app/cart/page.js

import { cookies } from 'next/headers';
import { getSessionCart } from '../../lib/cart';

export const dynamic = 'force-dynamic'; // Ensures SSR

export default async function CartPage() {
    // Retrieve the cart data directly from cookies on the server
    const cart = getSessionCart(cookies());

    if (cart.length === 0) {
        return <div>Your cart is empty.</div>;
    }

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div style={styles.container}>
            <h1>Your Cart</h1>
            <ul style={styles.cartList}>
                {cart.map((item) => (
                    <li key={item.id} style={styles.cartItem}>
                        <h3>{item.name}</h3>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                    </li>
                ))}
            </ul>
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
        </div>
    );
}

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
    },
    cartList: {
        listStyleType: 'none',
        padding: 0,
    },
    cartItem: {
        padding: '1rem',
        borderBottom: '1px solid #ddd',
        marginBottom: '1rem',
    },
};
