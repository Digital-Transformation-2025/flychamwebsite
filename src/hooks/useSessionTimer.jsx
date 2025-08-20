// hooks/useSessionTimer.js or .ts
import { useEffect, useRef } from 'react';

const useSessionTimer = ({ duration = 7 * 60, onExpire }) => {
    const timerRef = useRef(duration);
    const intervalRef = useRef(null);

    const startTimer = () => {
        clearInterval(intervalRef.current);
        timerRef.current = duration;

        intervalRef.current = setInterval(() => {
            timerRef.current -= 1;

            if (timerRef.current <= 0) {
                clearInterval(intervalRef.current);
                onExpire?.(); // call onExpire if provided
            }
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(intervalRef.current);
    };

    useEffect(() => {
        startTimer();
        return () => stopTimer();
    }, []);

    return {
        restartTimer: startTimer,
        stopTimer,
    };
};

export default useSessionTimer;
