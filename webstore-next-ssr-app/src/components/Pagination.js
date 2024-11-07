import Link from 'next/link';

export default function Pagination({ currentPage, totalPages, onPageChange, baseUrl }) {
    const visiblePages = 5;
    const pageNumbers = [];

    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, currentPage + Math.floor(visiblePages / 2));

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div style={styles.pagination}>
            {/* Previous Button */}
            {currentPage > 1 && (
                <Link href={`${baseUrl}?page=${currentPage - 1}`} style={styles.pageLink}>
                    Previous
                </Link>
            )}

            {/* First Page */}
            {startPage > 1 && (
                <Link href={`${baseUrl}?page=1`} style={styles.pageLink}>
                    1
                </Link>
            )}

            {/* Ellipsis if needed */}
            {startPage > 2 && <span style={styles.ellipsis}>...</span>}

            {/* Page Numbers */}
            {pageNumbers.map(pageNumber => (
                <Link
                    href={`${baseUrl}?page=${pageNumber}`}
                    key={pageNumber}
                    style={{
                        ...styles.pageLink,
                        fontWeight: pageNumber === currentPage ? 'bold' : 'normal'
                    }}
                >
                    {pageNumber}
                </Link>
            ))}

            {/* Ellipsis if needed */}
            {endPage < totalPages - 1 && <span style={styles.ellipsis}>...</span>}

            {/* Last Page */}
            {endPage < totalPages && (
                <Link href={`${baseUrl}?page=${totalPages}`} style={styles.pageLink}>
                    {totalPages}
                </Link>
            )}

            {/* Next Button */}
            {currentPage < totalPages && (
                <Link href={`${baseUrl}?page=${currentPage + 1}`} style={styles.pageLink}>
                    Next
                </Link>
            )}
        </div>
    );
}

const styles = {
    pagination: {
        marginTop: '2rem',
        textAlign: 'center',
        display: 'flex',
        gap: '0.5rem',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageLink: {
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        textDecoration: 'none',
        color: '#0070f3',
    },
    ellipsis: {
        padding: '0.5rem',
        color: '#666',
    },
};
