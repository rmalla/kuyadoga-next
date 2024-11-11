// src/app/layout.js

import '../styles/global.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ZendeskChat from '../components/ZendeskChat';
import GoogleAnalytics from '../components/GoogleAnalytics';

export const metadata = {
    metadataBase: new URL("https://www.kuyadoga.com"),
    title: 'Kuyadoga - Americas Trusted Partner',
    description: 'Wide range of high-quality products from trusted manufacturers.',
};
export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            <GoogleAnalytics/>
        </head>
        <body>
        <Header/>
        <main>{children}</main>
        <Footer/>
        <ZendeskChat/> {/* Add Zendesk Chat to be loaded on all pages */}
        </body>
        </html>
    );
}
