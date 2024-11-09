// src/app/cart/page.js

import { getSessionCart } from '../../lib/cart';

export const dynamic = 'force-dynamic'; // Ensures SSR

export default async function CartPage() {
    // Retrieve the cart data directly from cookies on the server side
    const cart = await getSessionCart();

    if (cart.length === 0) {
        return <div>Your cart is empty.</div>;
    }

    const totalPrice = cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

    return (
        <div style={styles.container}>
            <h1>Your Cart</h1>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>Description</th>
                        <th style={styles.tableHeader}>Manufacturer</th>
                        <th style={styles.tableHeader}>Part Number</th>
                        <th style={styles.tableHeader}>Unit Price</th>
                        <th style={styles.tableHeader}>Quantity</th>
                        <th style={styles.tableHeader}>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item, index) => (
                        <tr
                            key={item.id}
                            style={{
                                ...styles.tableRow,
                                backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' // Alternating colors
                            }}
                        >
                            <td>{item.name}</td>
                            <td>{item.manufacturer}</td>
                            <td>{item.part_number || "N/A"}</td>
                            <td>${Number(item.price).toFixed(2)}</td>
                            <td>{item.quantity}</td>
                            <td>${(Number(item.price) * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="5" style={styles.totalLabel}>Total:</td>
                        <td>${totalPrice.toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableRow: {
        borderBottom: '1px solid #ddd',
        lineHeight: '2.0', // Increased line height
    },
    tableHeader: {
        textAlign: 'left',
        padding: '0.5rem',
        fontWeight: 'bold',
        borderBottom: '2px solid #ddd',
    },
    totalLabel: {
        textAlign: 'right',
        paddingRight: '1rem',
        fontWeight: 'bold',
    },
};

