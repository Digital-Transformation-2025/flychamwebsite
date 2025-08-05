'use client';

import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setSearchParams } from '@/store/flightSlice';
import formatDate from '@/util/formatDate';

export default function useFlightSearchForm() {
    const dispatch = useDispatch();
    const router = useRouter();

    const formik = useFormik({
        enableReinitialize: false,
        initialValues: {
            source: '',
            destination: '',
            adults: 1,
            children: 0,
            infants: 0,
            promoCode: '',
            cabinClass: 'Economy',
            dateStart: '',
            dateEnd: '',
            type: 0,
            tripType: 'OneWay',
            nearby: false,
            hasClickCalendar: false,
        },
        onSubmit: (values) => {
            const {
                cabinClass,
                source,
                destination,
                dateStart,
                dateEnd,
                adults,
                children,
                infants,
                tripType,
                nearby,
            } = values;

            const formattedDeparture = formatDate(dateStart);
            const formattedReturn = formatDate(dateEnd);
            const flightclass = cabinClass === 'Economy' ? 'Y' : 'C';

            const data = {
                origin_id: source,
                destination_id: destination,
                date: formattedDeparture,
                adults,
                children,
                infants,
                flightclass,
                flighttype: tripType,
                pos_id: 0,
                neirby: nearby,
            };

            if (tripType !== 'OneWay' && formattedReturn) {
                data.date_return = formattedReturn;
            }

            dispatch(setSearchParams(data));

            if (!dateStart || !source || !destination) return;

            router.push('/search-results');
        },
    });

    return formik;
}
