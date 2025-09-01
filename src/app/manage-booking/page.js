import React from 'react'
import ManageBookingClient from './ManageBookingClient'
import { fetchFromAPI } from '@/lib/api';
export async function getRules() {
    return await fetchFromAPI(`/api/managebooking/CancelAndRefundRule`)
}
export async function getReasons() {
    return await fetchFromAPI(`/api/managebooking/CancelReason`)
}
export default async function ManagePage() {
    const rulesData = await getRules()
    const reasonsData = await getReasons()
    const rules = rulesData.result.items
    const reasons = reasonsData.result.items
    return (
        <ManageBookingClient
            rules={rules}
            reasons={reasons}
        />
    )
}
