import { useEffect } from "react";

export default function useBlockInspect() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault();
      }

      // Ctrl+Shift+I or Ctrl+Shift+J
      if (e.ctrlKey && e.shiftKey && ['I', 'J'].includes(e.key)) {
        e.preventDefault();
      }

      // Ctrl+U (View Page Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault(); // 🔒 Block right-click
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);
}
