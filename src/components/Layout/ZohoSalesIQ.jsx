'use client'

import { useEffect } from 'react';

export default function ZohoSalesIQ() {
  useEffect(() => {
    window.$zoho = window.$zoho || {};
    window.$zoho.salesiq = window.$zoho.salesiq || {
      ready: function () { }
    };

    const script = document.createElement('script');
    script.id = 'zsiqscript';
    script.src = 'https://salesiq.zohopublic.com/widget?wc=siqdcc05fbb2750949090e0aed29f16498a04d048c67b5eaaf0ff6301df4e922f24';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.getElementById('zsiqscript')?.remove();
    };
  }, []);

  return null;
}
