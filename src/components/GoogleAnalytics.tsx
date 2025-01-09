'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

const GoogleAnalytics = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!GA_TRACKING_ID) return;

        const handleRouteChange = () => {
            let queryString = '';
            if (searchParams) {
                queryString = '?' + searchParams.toString();
            }

            const url = pathname + queryString;
            window.gtag('config', GA_TRACKING_ID, { page_path: url });
        };

        handleRouteChange();
    }, [pathname, searchParams]);

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}');
                `}
            </Script>
        </>
    );
};

export default GoogleAnalytics;