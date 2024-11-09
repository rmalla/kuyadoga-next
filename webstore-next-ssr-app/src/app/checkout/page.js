// src/app/checkout/page.js

export const dynamic = 'force-dynamic'; // Ensures SSR

export default function CheckoutPage() {
    return (
        <div style={styles.container}>
            <h1>Checkout</h1>
            <form action="/api/checkout" method="POST" style={styles.form}>
                <div style={styles.field}>
                    <label htmlFor="name">Full Name</label>
                    <input id="name" name="name" type="text" required style={styles.input} />
                </div>

                <div style={styles.field}>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required style={styles.input} />
                </div>

                <div style={styles.field}>
                    <label htmlFor="address">Address</label>
                    <input id="address" name="address" type="text" required style={styles.input} />
                </div>

                <div style={styles.field}>
                    <label htmlFor="city">City</label>
                    <input id="city" name="city" type="text" required style={styles.input} />
                </div>

                <div style={styles.field}>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input id="postalCode" name="postalCode" type="text" required style={styles.input} />
                </div>

                <div style={styles.field}>
                    <label htmlFor="country">Country</label>
                    <input id="country" name="country" type="text" required style={styles.input} />
                </div>

                <button type="submit" style={styles.button}>Place Order</button>
            </form>
        </div>
    );
}

const styles = {
    container: { padding: '2rem', maxWidth: '600px', margin: '0 auto' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    field: { display: 'flex', flexDirection: 'column' },
    input: { padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' },
    button: { padding: '0.75rem', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
};
