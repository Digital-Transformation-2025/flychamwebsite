import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getFlightsService } from "@/store/Services/flightServices";

const useFetchFlights = (setLocalLoading, setIsPageLoaded) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const isFirstLoad = useRef(true);

    const { searchParams } = useSelector((state) => state.flights);

    useEffect(() => {
        const { origin_id, destination_id, date } = searchParams || {};
        console.log('origin_id', origin_id);
        console.log('destination_id', destination_id);
        console.log('date', date);

        // if (!origin_id || !destination_id || !date) {
        //     router.push("/");
        //     return;
        // }

        // ✅ Show loader only on first load
        if (isFirstLoad.current) {
            setIsPageLoaded(true);      // Enable loader
            setLocalLoading(true);
        }

        dispatch(getFlightsService(searchParams)).then((action) => {
            if (getFlightsService.rejected.match(action)) {
                router.push("/");
            }
        });

        const timer = setTimeout(() => {
            setLocalLoading(false);
            setIsPageLoaded(false);     // Disable loader after first fetch
            isFirstLoad.current = false; // ✅ Ensure it won't trigger again
        }, 3000);

        return () => clearTimeout(timer);
    }, [dispatch, router, searchParams, setLocalLoading, setIsPageLoaded]);
};

export default useFetchFlights;
