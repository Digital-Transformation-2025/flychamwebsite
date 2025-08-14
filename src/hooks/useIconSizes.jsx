'use client'
import { useState, useEffect } from 'react';

export default function useIconSizes() {
    const getSizesForScreen = (width) => {
        if (width >= 1024) {
            return { container: 40, logo: 24 }; // desktop
        } else if (width >= 768) {
            return { container: 36, logo: 20 }; // tablet
        } else if (width >= 480) {
            return { container: 32, logo: 18 }; // mobile
        } else {
            return { container: 28, logo: 16 }; // very small
        }
    };

    const [sizes, setSizes] = useState(() =>
        typeof window !== 'undefined' ? getSizesForScreen(window.innerWidth) : { container: 40, logo: 24 }
    );

    useEffect(() => {
        const updateSizes = () => {
            setSizes(getSizesForScreen(window.innerWidth));
        };

        updateSizes(); // initial
        window.addEventListener('resize', updateSizes);
        return () => window.removeEventListener('resize', updateSizes);
    }, []);

    return sizes; // { container, logo }
}
