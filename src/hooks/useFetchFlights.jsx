import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getFlightsService } from "@/store/Services/flightServices";

const useFetchFlights = (setLocalLoading) => {
    const dispatch = useDispatch();
    const router = useRouter();

    // ✅ pull searchParams (and anything else needed) straight from Redux
    const { searchParams } = useSelector((state) => state.flights);

    useEffect(() => {
        const { origin_id, destination_id, date } = searchParams || {};

        if (!origin_id || !destination_id || !date) {
            router.push("/");
        } else {
            dispatch(getFlightsService(searchParams)).then((action) => {
                if (getFlightsService.rejected.match(action)) {
                    router.push("/");
                }
            });

            const timer = setTimeout(() => {
                setLocalLoading(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [dispatch, router, searchParams]); // ✅ hook reruns if searchParams change
};

export default useFetchFlights;
