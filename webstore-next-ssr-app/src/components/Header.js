import Link from 'next/link';
import SearchBox from './SearchBox'; // Ensure the path to SearchBox is correct

export default function Header() {
    return (
        <header style={styles.header}>
            <div style={styles.container}>
                {/* Logo on the Left */}
                <div style={styles.logoContainer}>
                    <Link href="/" style={{ color: '#fff' }}>
                        <img src="/images/logo_kuyadoga.png" alt="Logo" style={styles.logo} />
                    </Link>
                </div>

                {/* Centered Content: Store Name, Search Box, and Navigation */}
                <div style={styles.centerContent}>
                    <h1 style={styles.storeName}>Kuyadoga</h1>
                    <SearchBox />
                </div>

                {/* Navigation Links */}
                <nav style={styles.nav}>
                    <Link href="/" style={styles.navLink}>
                        Home
                    </Link>
                    <Link href="/cart" style={styles.navLink}>
                        Cart
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
        margin: '0 auto', // Centering the container
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
