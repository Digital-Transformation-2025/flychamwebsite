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
    onEdit,
    contactInfo
}) {
    const { title, firstName, lastName, telephone, mobile, email, countryCodeTele } = contactInfo || {}

    // Define fields as an array and render with .map()
    const fields = [
        { label: 'Passenger name', value: `${title}.${firstName} ${lastName}` },
        { label: 'Type', value: 'Primary' },
        {
            label: 'E-mail',
            value: (
                <a href={`mailto:${email}`} className="hover:underline">
                    {email}
                </a>
            ),
        },
        {
            label: 'Mobile number',
            value: (
                <p  className="hover:underline">
                    +{countryCodeTele} {telephone}
                </p>
            ),
        },
    ];

    return (
        <div className="w-full my-4">
            {/* Card container */}
            <div className='mb-4'>

                <SectionTitle>Contact  details</SectionTitle>
            </div>

            <div className="relative rounded-xl bg-[#F5F5F4] ring-1 ring-[#EAEAE8] p-4 md:p-5">
                {/* Edit action */}
                <button
                    type="button"
                    // disabled
                    onClick={onEdit}
                    className=" absolute right-3 top-2 lg:top-1/2 lg:-translate-y-1/2 inline-flex items-center gap-1 text-primary-1 text-sm lg:text-[16px] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-1 focus-visible:ring-offset-2"
                    aria-label="Edit contact"
                >
                    Edit <Pencil className="size-4" />
                </button>


                {/* Horizontal boxes built from array */}
                <div className="block">
                    <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                        {fields.map((f) => (
                            <div
                                key={f.label}
                                className="rounded-lg  "
                            >
                                <div className="text-[12px] lg:text-sm leading-none text-[#8A8A87] mb-2">{f.label}</div>
                                <div className="text-[14px] lg:text-sm text-black  lg:text-primary-1 font-medium truncate">{f.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
