
import React from 'react';
import { X } from 'lucide-react';

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md'
}) {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true">

      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}>
        </div>

        {/* Modal centering trick */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true">

          &#8203;
        </span>

        {/* Modal panel */}
        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full ${sizes[size]}`}>

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-start mb-4">
              <h3
                className="text-lg leading-6 font-medium text-slate-900"
                id="modal-title">

                {title}
              </h3>
              <button
                type="button"
                className="bg-white rounded-md text-slate-400 hover:text-slate-500 focus:outline-none"
                onClick={onClose}>

                <span className="sr-only">Close</span>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-2">{children}</div>
          </div>
          {footer &&
          <div className="bg-slate-50 px-4 py-3 sm:px-6 flex flex-row-reverse gap-2">
              {footer}
            </div>
          }
        </div>
      </div>
    </div>);

}