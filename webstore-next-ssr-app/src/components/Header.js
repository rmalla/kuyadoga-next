// src/components/Header.js

import Link from 'next/link';
import SearchBox from './SearchBox';
import Image from 'next/image';
import { getSessionCart } from '../lib/cart'; // Import async getSessionCart

export default async function Header() {
    // Retrieve cart data directly from cookies for SSR
    const cart = await getSessionCart(); // Await the async function
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <header style={styles.header}>
            <div style={styles.container}>
                <div style={styles.logoContainer}>
                    <Link href="/" style={{ color: '#fff' }}>
                        <Image
                            src="/images/logo_kuyadoga.png"
                            alt="Logo"
                            width={175}
                            height={50}
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
        padding: '1rem 0',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '80%',
        margin: '0 auto',
    },
    logoContainer: {
        marginRight: '20px',
    },
    logo: {
        width: '175px',
        height: 'auto',
    },
    centerContent: {
        flex: '1',
        textAlign: 'center',
    },
    storeName: {
        margin: 0,
    },
    nav: {
        display: 'flex',
        gap: '1rem',
        marginLeft: 'auto',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
    },
};
