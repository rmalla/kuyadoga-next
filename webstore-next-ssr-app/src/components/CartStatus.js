// src/components/AddToCartButton.js

"use client";

export default function AddToCartButton({ product, updateCartCount }) {
    const handleAddToCart = async () => {
        await fetch('/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product }),
        });
        // Call the function to update the cart count
        updateCartCount();
    };

    return (
        <button
            onClick={handleAddToCart}
            style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1.2rem',
                color: '#fff',
                backgroundColor: '#0070f3',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '1rem',
            }}
        >
            Add to Cart
        </button>
    );
}
