// src/components/Header.js

export default function Header() {
    return (
        <header style={{ padding: '1rem', backgroundColor: '#333', color: '#fff', textAlign: 'center' }}>
            <h1>My E-commerce Store</h1>
            <nav>
                <a href="/" style={{ color: '#fff', marginRight: '1rem' }}>Home</a>
                <a href="/cart" style={{ color: '#fff', marginRight: '1rem' }}>Cart</a>
                <a href="/checkout" style={{ color: '#fff' }}>Checkout</a>
            </nav>
        </header>
    );
}
