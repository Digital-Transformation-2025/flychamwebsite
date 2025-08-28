'use client';
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({
    open,
    onClose,
    children,
    className = "w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl p-4 animate-slide-up",
    overlayClassName = "bg-black/40",
    align = "start", // "start" | "center"
    closeOnOverlay = true,
    closeOnEsc = true,
    lockScroll = true,
    zIndex = 1000,   // << higher than z-[100]

}) {
    const containerRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    // mount portal safely in Next.js
    useEffect(() => setMounted(true), []);

    // close on ESC
    useEffect(() => {
        if (!open || !closeOnEsc) return;
        const onKey = e => { if (e.key === "Escape") onClose?.(); };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, closeOnEsc, onClose]);

    // lock body scroll
    useEffect(() => {
        if (!open || !lockScroll) return;
        const { overflow } = document.body.style;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = overflow; };
    }, [open, lockScroll]);

    if (!open || !mounted) return null;

    const alignClass = align === "center"
        ? "items-center"
        : "items-start pt-8";

    const modal = (
        <div
            style={{ zIndex }}                    // << bump z-index

            className={`fixed inset-0 z-50 flex ${alignClass} justify-center px-2`}>
            {/* overlay */}
            <div

                className={`absolute inset-0 ${overlayClassName}`}
                onMouseDown={() => closeOnOverlay && onClose?.()}
            />
            {/* content */}
            <div
                ref={containerRef}
                className={`relative z-10 ${className}`}
                onMouseDown={e => e.stopPropagation()} // prevent overlay close
                role="dialog"
                aria-modal="true"
            >
                {children}
            </div>
        </div>
    );

    return createPortal(modal, document.body);
}
