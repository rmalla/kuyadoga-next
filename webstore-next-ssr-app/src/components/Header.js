// src/components/Header.js

import Link from 'next/link';
import SearchBox from './SearchBox';
import Image from 'next/image';
import { getSessionCart } from '../lib/cart';

export default async function Header() {
    const cart = await getSessionCart();
    const itemCount = Array.isArray(cart) ? cart.reduce((count, item) => count + item.quantity, 0) : 0;

    return (
        <header style={styles.header}>
            <div style={styles.container}>
                <div style={styles.logoContainer}>
                    <Link href="/" style={{ color: '#fff' }}>
                        <Image
                            src="/images/logo_kuyadoga.png"
                            alt="Logo"
                            width={150}
                            height={40}
                            style={styles.logo}
                        />
                    </Link>
                </div>

                <div style={styles.centerContent}>
                    <h1 style={styles.storeName}>Kuyadoga</h1>
                    <SearchBox />
                </div>

                <nav style={styles.nav}>
                    <Link href="/" style={styles.navLink}>
                        Home
                    </Link>
                    <Link href="/cart" style={styles.navLink}>
                        Cart ({itemCount})
                    </Link>
                    <Link href="/checkout" style={styles.navLink}>
                        Checkout
                    </Link>
                </nav>
            </div>
        </header>
    );
}

const styles = {
    header: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '1rem',
        width: '100%',
        boxSizing: 'border-box',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '90%',
        margin: '0 auto',
        flexWrap: 'wrap', // Allow wrapping on smaller screens
    },
    logoContainer: {
        flex: '1 1 auto',
        minWidth: '120px',
    },
    logo: {
        width: '150px',
        height: 'auto',
    },
    centerContent: {
        flex: '2 1 300px', // Flexible width to adapt on smaller screens
        textAlign: 'center',
        margin: '0.5rem 0',
    },
    storeName: {
        margin: 0,
        fontSize: '1.5rem', // Smaller font size for responsiveness
    },
    nav: {
        display: 'flex',
        gap: '1rem',
        flex: '1 1 auto',
        justifyContent: 'flex-end',
        minWidth: '120px',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1rem', // Adjust font size for readability on smaller screens
    },
    '@media (max-width: 768px)': {
        container: {
            flexDirection: 'column',
            alignItems: 'center',
        },
        logo: {
            width: '120px',
        },
        storeName: {
            fontSize: '1.25rem',
        },
        nav: {
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
        },
    },
    '@media (max-width: 480px)': {
        logo: {
            width: '100px',
        },
        storeName: {
            fontSize: '1rem',
        },
        navLink: {
            fontSize: '0.9rem',
        },
    },
};
