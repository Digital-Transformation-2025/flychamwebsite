'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ZohoSalesIQController() {
  const pathname = usePathname();

  useEffect(() => {
    const shouldShow =( pathname !== '/search-results' ||pathname !== '/booking-confirm');

    // Helper to nuke existing widget DOM
    const cleanupZoho = () => {
      // Try the official hide if available
      try {
        // If ready is a callback API
        if (typeof window !== 'undefined' && (window ).$zoho?.salesiq?.floatwindow) {
          (window ).$zoho.salesiq.floatwindow.hide();
        }
      } catch {/* no-op */}

      // Remove injected script and common widget containers
      document.getElementById('zsiqscript')?.remove();
      document.getElementById('zsiqwidget')?.remove();
      document.querySelectorAll('[id^="siqiframe"], .zsiq-widget, .zsiq_floatmain')
        .forEach((n) => n.remove());
    };

    if (!shouldShow) {
      // On /search-results -> hide/cleanup if present
      cleanupZoho();
      return;
    }

    // Already injected? do nothing
    if (document.getElementById('zsiqscript')) return;

    // Inject script on allowed pages
    (window ).$zoho = (window ).$zoho || {};
    (window ).$zoho.salesiq = (window ).$zoho.salesiq || { ready: function () {} };

    const script = document.createElement('script');
    script.id = 'zsiqscript';
    script.defer = true;
    script.src =
      'https://salesiq.zohopublic.com/widget?wc=siqdcc05fbb2750949090e0aed29f16498a04d048c67b5eaaf0ff6301df4e922f24';
    document.body.appendChild(script);

    // Optional: cleanup if this controller ever unmounts
    return () => {
      if (!shouldShow) return;
      cleanupZoho();
    };
  }, [pathname]);

  return null;
}
