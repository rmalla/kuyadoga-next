// src/app/order-summary/page.js

export const dynamic = 'force-dynamic';

export default function OrderSummaryPage() {
    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Order Summary</h1>
            <p>Thank you for your order! Your order has been placed successfully.</p>
            {/* Display any additional order details here */}
        </div>
    );
}
