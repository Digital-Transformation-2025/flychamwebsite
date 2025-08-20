import React from 'react'
import TestClient from './TestClient'
import { fetchFromAPI } from '@/lib/api'

// ✅ Async data fetching function
export async function getAirports() {
    return await fetchFromAPI(`/api/booking/AirPort?filters=language==en&sorts=iata`)
}
export async function getPos() {
    return await fetchFromAPI(`/api/booking/POS?filters=language==en`)
}

// ✅ Async Server Component
const Test = async () => {
    const flights = await getAirports()
    const pos = await getPos()
    return (
        <div>
            <TestClient flights={flights} pos={pos}/>
        </div>
    )
}

export default Test
