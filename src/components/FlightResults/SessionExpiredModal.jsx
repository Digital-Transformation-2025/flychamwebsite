'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { Warning } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';

const SessionExpiredModal = ({ isOpen, handleClickCta, title, description, isSecBtnExsist,loading }) => {
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
            <Dialog.Panel className="w-full max-w-xl rounded-xl bg-[#FDFDFC] p-4 sm:p-6 text-center shadow-xl transition-all">
              <div className="mx-auto mb-4 sm:mb-6 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                <Warning size={50} className="sm:size-[60px]" color="#BAA981" weight="fill" />
              </div>

              <Dialog.Title
                as="h3"
                className="text-xl sm:text-[26px] font-semibold text-primary-1"
              >
                {title}
              </Dialog.Title>

              <p className="mt-3 sm:mt-4 text-sm sm:text-[16px] text-600 font-medium">
                {description}
              </p>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <button
                  onClick={() => router.push('/')}
                  className="border border-primary-1 text-primary-1 text-sm sm:text-[16px] font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-md transition hover:bg-primary-1 hover:text-white"
                >
                  Back to home page
                </button>
                {isSecBtnExsist
                  &&
                  <button
                    onClick={handleClickCta}
                    disabled={loading}
                    className={`flex items-center justify-center gap-2 text-sm sm:text-[16px] font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-md transition 
                    ${loading
                        ? 'bg-gray-300 cursor-not-allowed text-white'
                        : 'bg-primary-1 text-white hover:bg-white hover:text-primary-1 hover:border hover:border-primary-1 hover:shadow-lg'
                      }`}
                  >
                    {loading ? 'Loading...' : 'Search again'}
                  </button>
                }

              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SessionExpiredModal;
