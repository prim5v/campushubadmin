
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { FilterDropdown } from '../components/ui/FilterDropdown';
import { Pagination } from '../components/ui/Pagination';

export function Listings() {
  const listings = [
  { id: 1, property: 'Sunset Apartments', unit: '402', type: 'Single Room', price: 'KES 8,000', availability: 'Available', status: 'active' },
  { id: 2, property: 'Green Valley Hostel', unit: 'B-12', type: 'Bed Sitter', price: 'KES 12,000', availability: 'Occupied', status: 'active' },
  { id: 3, property: 'Campus Heights', unit: '105', type: '1 Bedroom', price: 'KES 15,000', availability: 'Available', status: 'active' },
  { id: 4, property: 'The Lofts', unit: 'PH-1', type: 'Studio', price: 'KES 18,000', availability: 'Maintenance', status: 'inactive' },
  { id: 5, property: 'Sunset Apartments', unit: '301', type: 'Single Room', price: 'KES 8,000', availability: 'Reserved', status: 'pending' }];


  const columns = [
  { header: 'Property', accessorKey: 'property', className: 'font-medium text-slate-900' },
  { header: 'Unit', accessorKey: 'unit' },
  { header: 'Type', accessorKey: 'type' },
  { header: 'Price/Month', accessorKey: 'price', className: 'font-medium' },
  {
    header: 'Availability',
    accessorKey: 'availability',
    cell: (row) =>
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${row.availability === 'Available' ? 'bg-emerald-100 text-emerald-800' : row.availability === 'Occupied' ? 'bg-slate-100 text-slate-800' : row.availability === 'Reserved' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}`}>

          {row.availability}
        </span>

  },
  { header: 'Status', accessorKey: 'status', cell: (row) => <StatusBadge status={row.status} /> }];


  const actions = (row) =>
  <div className="flex justify-end gap-2">
      <Button variant="ghost" size="sm">Edit</Button>
      <Button variant="ghost" size="sm" className="text-rose-600 hover:bg-rose-50">Delete</Button>
    </div>;


  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Listings Management</h1>
          <p className="text-slate-500 mt-1">Manage individual rental units, pricing, and availability.</p>
        </div>
        <Button>Create Listing</Button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm mb-6">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <SearchInput className="w-full sm:w-72" placeholder="Search listings..." />
          <div className="flex gap-4 w-full sm:w-auto">
            <FilterDropdown
              label="Type"
              options={[
              { label: 'Single Room', value: 'single' },
              { label: 'Bed Sitter', value: 'bedsitter' },
              { label: '1 Bedroom', value: '1bedroom' }]
              }
              value=""
              onChange={() => {}} />

            <FilterDropdown
              label="Availability"
              options={[
              { label: 'Available', value: 'available' },
              { label: 'Occupied', value: 'occupied' },
              { label: 'Reserved', value: 'reserved' }]
              }
              value=""
              onChange={() => {}} />

          </div>
        </div>

        <DataTable columns={columns} data={listings} actions={actions} />

        <Pagination currentPage={1} totalPages={8} totalItems={75} itemsPerPage={10} onPageChange={() => {}} />
      </div>
    </DashboardLayout>);

}