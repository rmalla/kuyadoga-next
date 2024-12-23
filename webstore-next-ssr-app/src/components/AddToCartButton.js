// src/components/AddToCartButton.js
"use client";
import { useRouter } from 'next/navigation';

export default function AddToCartButton({ product }) {
    const router = useRouter();

    const handleAddToCart = async () => {
        await fetch('/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product }),
        });

        // Refresh the page to show updated cart count
        router.refresh();
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
