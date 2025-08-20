import { useEffect } from "react";

export default function useBlockInspect() {
    useEffect(() => {
        const threshold = 160;
        let lastCheck = Date.now();

        const checkDevTools = () => {
            const widthGap = window.outerWidth - window.innerWidth;
            const heightGap = window.outerHeight - window.innerHeight;

            // Instead of fixed 160, use a ratio
            if (widthGap > window.outerWidth * 0.25 || heightGap > window.outerHeight * 0.25) {
                window.history.back(); // likely DevTools open
            }
        };


        const interval = setInterval(() => {
            if (Date.now() - lastCheck > 1000) {
                checkDevTools();
                lastCheck = Date.now();
            }
        }, 1500);

        // Block F12, Ctrl+Shift+I/U
        const handleKeyDown = (e) => {
            if (
                e.keyCode === 123 || // F12
                (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
                (e.ctrlKey && e.key === 'u')
            ) {
                e.preventDefault();
            }
        };

        const handleContextMenu = (e) => e.preventDefault();

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            clearInterval(interval);
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);
}
