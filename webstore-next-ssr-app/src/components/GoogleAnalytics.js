// src/components/GoogleAnalytics.js

import Script from 'next/script';

const GoogleAnalytics = () => (
    <>
        {/* External Google Analytics script */}
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-858PR1ZT2T"
            strategy="afterInteractive"
        />

        {/* Inline Google Analytics configuration script */}
        <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-858PR1ZT2T');
                `,
            }}
        />
    </>
);

export default GoogleAnalytics;
