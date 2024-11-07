import Link from 'next/link';
import SearchBox from './SearchBox'; // Make sure the path to SearchBox is correct

export default function Header() {
    return (
        <header style={{ padding: '1rem', backgroundColor: '#333', color: '#fff', textAlign: 'center' }}>
            <h1>My E-commerce Store</h1>
            <SearchBox /> {/* Add the SearchBox here */}
            <nav>
                <Link href="/" style={{ color: '#fff', marginRight: '1rem' }}>
                    Home
                </Link>
                <Link href="/cart" style={{ color: '#fff', marginRight: '1rem' }}>
                    Cart
                </Link>
                <Link href="/checkout" style={{ color: '#fff' }}>
                    Checkout
                </Link>
            </nav>
        </header>
    );
}
