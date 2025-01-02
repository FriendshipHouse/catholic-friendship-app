'use client';

import Script from 'next/script';
import { useEffect } from 'react';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

const GoogleAnalytics = () => {
    useEffect(() => {
        if (!GA_TRACKING_ID) return;

        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
            window.dataLayer.push(args);
        }

        window.gtag = gtag;

        window.gtag('js', new Date());
        window.gtag('config', GA_TRACKING_ID, {
            page_path: window.location.pathname,
        });
    }, []);

    if (!GA_TRACKING_ID) return null;

    return (
        <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy="afterInteractive"
        />
    );
};

export default GoogleAnalytics;
