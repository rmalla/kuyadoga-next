import { getSessionCart } from '../../lib/cart';

export const dynamic = 'force-dynamic'; // Ensures SSR

export default async function CartPage() {
    // Retrieve the cart data directly from cookies on the server side
    const cart = await getSessionCart();

    // Ensure cart is an array before calling reduce
    const totalPrice = Array.isArray(cart) ? cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0) : 0;

    if (!Array.isArray(cart) || cart.length === 0) {
        return <div>Your cart is empty.</div>;
    }

    return (
        <div style={styles.container}>
            <h1>Your Cart</h1>

            {/* Form for updating quantities */}
            <form method="POST" action="/api/cart/update" style={styles.form}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Description</th>
                            <th style={styles.tableHeader}>Manufacturer</th>
                            <th style={styles.tableHeader}>Part Number</th>
                            <th style={styles.tableHeader}>Unit Price</th>
                            <th style={styles.tableHeader}>Quantity</th>
                            <th style={styles.tableHeader}>Total Price</th>
                            <th style={styles.tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(cart) && cart.map((item, index) => (
                            <tr
                                key={item.id}
                                style={{
                                    ...styles.tableRow,
                                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff'
                                }}
                            >
                                <td>{item.name}</td>
                                <td>{item.manufacturer}</td>
                                <td>{item.part_number || "N/A"}</td>
                                <td>${Number(item.price).toFixed(2)}</td>
                                <td>
                                    <input
                                        type="number"
                                        name={`quantity-${item.id}`}
                                        defaultValue={item.quantity}
                                        min="1"
                                        style={styles.quantityInput}
                                    />
                                </td>
                                <td>${(Number(item.price) * item.quantity).toFixed(2)}</td>
                                <td>
                                    {/* Separate form for deleting each item */}
                                    <form method="POST" action="/api/cart/remove" style={styles.deleteForm}>
                                        <input type="hidden" name="deleteItem" value={item.id} />
                                        <button
                                            type="submit"
                                            style={styles.deleteButton}
                                        >
                                            Delete
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="6" style={styles.totalLabel}>Total:</td>
                            <td>${totalPrice.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
                <button type="submit" style={styles.updateButton}>Update Cart</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
    },
    form: {
        width: '100%',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableRow: {
        borderBottom: '1px solid #ddd',
        lineHeight: '2.0',
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
    quantityInput: {
        width: '50px',
    },
    deleteButton: {
        color: '#ff0000',
        cursor: 'pointer',
    },
    updateButton: {
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#0070f3',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
    deleteForm: {
        display: 'inline', // Ensures delete forms don’t take extra space
    },
};
