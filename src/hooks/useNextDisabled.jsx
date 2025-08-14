'use client';
import { useState, useEffect } from 'react';

export default function useNavDisabled(searchParams) {
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [isPrevDisabled, setIsPrevDisabled] = useState(false);

    useEffect(() => {
        if (!searchParams?.date) return;

        const originalDate = new Date(searchParams.date + 'Z'); // treat as UTC
        const dateReturn = searchParams.date_return
            ? new Date(searchParams.date_return + 'Z')
            : null;

        // ---- NEXT DISABLED ----
        if (!dateReturn) {
            setIsNextDisabled(false);
        } else {
            const nextDate = new Date(originalDate);
            nextDate.setUTCDate(originalDate.getUTCDate() + 1);
            setIsNextDisabled(nextDate > dateReturn);
        }

        // ---- PREV DISABLED ----
        const todayUTC = new Date();
        todayUTC.setUTCHours(0, 0, 0, 0); // midnight UTC
        // Disable if current date is before today
        setIsPrevDisabled(originalDate <= todayUTC);
    }, [searchParams?.date, searchParams?.date_return]);
    console.log('isPrevDisabled', isPrevDisabled);

    return { isNextDisabled, isPrevDisabled };
}
