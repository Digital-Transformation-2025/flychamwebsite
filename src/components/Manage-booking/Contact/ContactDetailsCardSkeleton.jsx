'use client';
import React from 'react';

export default function ContactDetailsCardSkeleton() {
  return (
    <div className="w-full my-4" role="status" aria-busy="true" aria-live="polite">
  

      {/* Card */}
      <div className="relative rounded-xl bg-[#F5F5F4] ring-1 ring-[#EAEAE8] p-4 md:p-5">
        {/* Edit button placeholder (aligned like your real button) */}
        <div className="absolute right-3 top-2 lg:top-1/2 lg:-translate-y-1/2">
          <div className="h-6 w-16 rounded-full bg-gray-200 animate-pulse" />
        </div>

        {/* Fields grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              {/* label line */}
              <div className="h-3 w-1/2 rounded bg-gray-200 animate-pulse" />
              {/* value line */}
              <div className="h-4 w-4/5 rounded bg-gray-200 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
