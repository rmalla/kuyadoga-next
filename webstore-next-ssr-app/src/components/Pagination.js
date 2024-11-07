import Link from 'next/link';

const Pagination = ({ currentPage, totalPages, basePath }) => {
    const MAX_DISPLAY_PAGES = 5; // Adjust the number of pages to display

    const startPage = Math.max(1, currentPage - Math.floor(MAX_DISPLAY_PAGES / 2));
    const endPage = Math.min(totalPages, startPage + MAX_DISPLAY_PAGES - 1);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div style={styles.paginationContainer}>
            {currentPage > 1 && (
                <Link href={`${basePath}?page=${currentPage - 1}`} style={styles.paginationButton}>
                    Back
                </Link>
            )}

            {pageNumbers.map(page => (
                <Link
                    href={`${basePath}?page=${page}`}
                    key={page}
                    style={{
                        ...styles.pageLink,
                        fontWeight: currentPage === page ? 'bold' : 'normal',
                    }}
                >
                    {page}
                </Link>
            ))}

            {currentPage < totalPages && (
                <Link href={`${basePath}?page=${currentPage + 1}`} style={styles.paginationButton}>
                    Next
                </Link>
            )}
        </div>
    );
};

const styles = {
    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        marginTop: '2rem',
    },
    paginationButton: {
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        textDecoration: 'none',
        color: '#0070f3',
    },
    pageLink: {
        padding: '0.5rem',
        margin: '0 0.25rem',
        cursor: 'pointer',
        textDecoration: 'none',
        color: '#0070f3',
    },
};

export default Pagination;
