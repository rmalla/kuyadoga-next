// src/app/layout.js

import '../styles/global.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
    title: 'My E-commerce Site',
    description: 'Best products online',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
