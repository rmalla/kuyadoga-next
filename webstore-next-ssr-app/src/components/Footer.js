// src/components/Footer.js

export default function Footer() {
    return (
        <footer style={{ padding: '1rem', backgroundColor: '#333', color: '#fff', textAlign: 'center' }}>
            <p>© {new Date().getFullYear()} My E-commerce Store. All rights reserved.</p>
        </footer>
    );
}
