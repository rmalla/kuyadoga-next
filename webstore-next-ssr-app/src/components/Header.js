import Link from 'next/link';
import SearchBox from './SearchBox'; // Make sure the path to SearchBox is correct

export default function Header() {
    return (
        <header style={{ display: 'flex', alignItems: 'center', padding: '1rem', backgroundColor: '#333', color: '#fff' }}>
            {/* Logo on the Left */}
            <div style={{ marginRight: '20px' }}>
                
                <Link href="/" style={{ color: '#fff' }}>
                    <img src="/images/logo_kuyadoga.png" alt="Logo" style={{ width: '175px', height: 'auto' }} />
                </Link>

            </div>

            {/* Centered Content: Store Name, Search Box, and Navigation */}
            <div style={{ flex: '1', textAlign: 'center' }}>
                <h1 style={{ margin: 0 }}>Kuyadoga</h1>
                <SearchBox />
            </div>

            {/* Navigation Links */}
            <nav style={{ display: 'flex', gap: '1rem', marginLeft: 'auto' }}>
                <Link href="/" style={{ color: '#fff' }}>
                    Home
                </Link>
                <Link href="/cart" style={{ color: '#fff' }}>
                    Cart
                </Link>
                <Link href="/checkout" style={{ color: '#fff' }}>
                    Checkout
                </Link>
            </nav>
        </header>
    );
}
