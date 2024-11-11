// src/components/ContactForm.js

export default function ContactForm({ product }) {
    const defaultMessage = product
        ? `Please send me more information on ${product.manufacturer} - ${product.part_number} - ${product.name} `
        : '';

    return (
        <div style={styles.contactFormSection}>
            <h2>Enquire about this Product</h2>
            <form style={styles.contactForm} method="POST" action="/api/contact">
                <label htmlFor="name" style={styles.label}>Name</label>
                <input type="text" id="name" name="name" required style={styles.input} />

                <label htmlFor="email" style={styles.label}>Email</label>
                <input type="email" id="email" name="email" required style={styles.input} />

                <label htmlFor="message" style={styles.label}>Message</label>
                <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    style={styles.textarea}
                    defaultValue={defaultMessage}
                ></textarea>

                <button type="submit" style={styles.submitButton}>Send Message</button>
            </form>
        </div>
    );
}

// Styles for ContactForm
const styles = {
    contactFormSection: {
        marginTop: '3rem',
        padding: '1.5rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
    },
    contactForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    label: {
        fontWeight: 'bold',
        fontSize: '1rem',
    },
    input: {
        padding: '0.5rem',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    textarea: {
        padding: '0.5rem',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    submitButton: {
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
    },
};
