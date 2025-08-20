'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { Warning } from '@phosphor-icons/react';

const AlertModal = ({ isOpen, handleSearchAgain, message }) => {
  const router = useRouter();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => { }}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          leave="ease-in duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>

        {/* Centered Panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            leave="ease-in duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-xl rounded-xl bg-[#FDFDFC] p-6 text-center shadow-xl transition-all">
              <div className="mx-auto mb-6 w-12 h-12 flex items-center justify-center">
                <Warning size={60} color="#BAA981" weight="fill" />
              </div>

              <Dialog.Title as="h3" className="text-[26px] font-semibold text-primary-1">
                Alert Message
              </Dialog.Title>

              <p className="mt-4 text-[16px] text-600 font-medium">
                {message}
              </p>

              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={() => router.push('/')}
                  className="border border-primary-1 text-primary-1 text-[16px] font-semibold px-6 py-3 rounded-md transition hover:bg-primary-1 hover:text-white"
                >
                  Back to home page
                </button>


              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AlertModal;
