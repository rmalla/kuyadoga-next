// src/components/SearchBox.js
import Link from 'next/link';

const SearchBox = () => {
    return (
        <form
            action="/search"
            method="get"
            style={{ display: 'flex', marginBottom: '20px' }}
        >
            <input
                type="text"
                name="query"
                placeholder="Search products..."
                style={{
                    padding: '8px',
                    flex: '1',
                    borderRadius: '4px 0 0 4px',
                    border: '1px solid #ddd',
                }}
            />
            <button
                type="submit"
                style={{
                    padding: '8px 16px',
                    borderRadius: '0 4px 4px 0',
                    border: '1px solid #ddd',
                    backgroundColor: '#333',
                    color: '#fff',
                }}
            >
                Search
            </button>
        </form>
    );
};

export default SearchBox;
