import { useEffect } from "react";

export default function useBlockInspect() {
    useEffect(() => {
        const threshold = 160;
        let lastCheck = Date.now();

        const checkDevTools = () => {
            const widthThreshold = window.outerWidth - window.innerWidth > 160;
            const heightThreshold = window.outerHeight - window.innerHeight > 160;

            if (widthThreshold || heightThreshold) {
                window.history.back(); // Detected — go back
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
