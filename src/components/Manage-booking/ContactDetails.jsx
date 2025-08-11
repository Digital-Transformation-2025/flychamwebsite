'use client';
import { Pencil } from '@phosphor-icons/react/dist/ssr';
import SectionTitle from './SectionTitle';

/**
 * ContactDetailsCard
 * Boxed, horizontal layout built from an array + map.
 * - Desktop (md+): boxes in a single row (wraps if very narrow)
 * - Mobile: stacked vertically
 */
export default function ContactDetailsCard({
    contact = {
        name: 'MR.Mouayad Hawari',
        type: 'Primary',
        email: 'moaidhawari@gmail.com',
        mobile: '+963 935679806',
    },
    onEdit,
}) {


    // Define fields as an array and render with .map()
    const fields = [
        { label: 'Passenger name', value: contact.name },
        { label: 'Type', value: contact.type },
        {
            label: 'E-mail',
            value: (
                <a href={`mailto:${contact.email}`} className="hover:underline">
                    {contact.email}
                </a>
            ),
        },
        {
            label: 'Mobile number',
            value: (
                <a href={`tel:${contact.mobile.replace(/\s/g, '')}`} className="hover:underline">
                    {contact.mobile}
                </a>
            ),
        },
    ];

    return (
        <div className="w-full my-4">
            {/* Card container */}
            <SectionTitle>Contact  details</SectionTitle>

            <div className="relative rounded-xl bg-[#F5F5F4] ring-1 ring-[#EAEAE8] p-4 md:p-5">
                {/* Edit action */}
                <button
                    onClick={onEdit}
                    className="absolute right-3 top-[50%] translate-y-[50%] inline-flex items-center gap-1 text-primary-1 text-sm font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-1  "
                    aria-label="Edit contact"
                >
                    Edit <Pencil />
                </button>

                {/* Horizontal boxes built from array */}
                <div className="block">
                    <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                        {fields.map((f) => (
                            <div
                                key={f.label}
                                className="rounded-lg  "
                            >
                                <div className="text-sm leading-none text-[#8A8A87] mb-2">{f.label}</div>
                                <div className="text-sm text-primary-1 font-medium truncate">{f.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
