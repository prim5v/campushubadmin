
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage
}) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-slate-200 sm:px-6">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-700">
            Showing <span className="font-medium">{startItem}</span> to{' '}
            <span className="font-medium">{endItem}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination">

            <Button
              variant="secondary"
              className="rounded-l-md rounded-r-none px-2 py-2"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}>

              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700">
              Page {currentPage} of {totalPages}
            </div>

            <Button
              variant="secondary"
              className="rounded-r-md rounded-l-none px-2 py-2"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}>

              <span className="sr-only">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </div>
    </div>);

}