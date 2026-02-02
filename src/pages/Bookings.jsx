
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { FilterDropdown } from '../components/ui/FilterDropdown';
import { Pagination } from '../components/ui/Pagination';

export function Bookings() {
  const bookings = [
  { id: 'BK-001', property: 'Sunset Apartments', unit: '402', tenant: 'Jane Smith', checkIn: '2024-03-01', duration: '6 months', amount: 'KES 48,000', status: 'confirmed' },
  { id: 'BK-002', property: 'Green Valley Hostel', unit: 'B-12', tenant: 'Tom Brown', checkIn: '2024-02-15', duration: '3 months', amount: 'KES 36,000', status: 'active' },
  { id: 'BK-003', property: 'Campus Heights', unit: '105', tenant: 'New Student', checkIn: '2024-04-01', duration: '1 year', amount: 'KES 180,000', status: 'pending' },
  { id: 'BK-004', property: 'The Lofts', unit: 'PH-1', tenant: 'Richie Rich', checkIn: '2024-02-01', duration: '1 year', amount: 'KES 216,000', status: 'cancelled' }];


  const columns = [
  { header: 'Booking ID', accessorKey: 'id', className: 'font-mono text-xs' },
  { header: 'Property', accessorKey: 'property', className: 'font-medium' },
  { header: 'Unit', accessorKey: 'unit' },
  { header: 'Tenant', accessorKey: 'tenant' },
  { header: 'Check In', accessorKey: 'checkIn' },
  { header: 'Duration', accessorKey: 'duration' },
  { header: 'Total Amount', accessorKey: 'amount', className: 'font-medium' },
  { header: 'Status', accessorKey: 'status', cell: (row) => <StatusBadge status={row.status} /> }];


  const actions = (row) =>
  <div className="flex justify-end gap-2">
      <Button variant="secondary" size="sm">Details</Button>
    </div>;


  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bookings & Tenants</h1>
          <p className="text-slate-500 mt-1">Track leases, tenant details, and booking statuses.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm mb-6">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <SearchInput className="w-full sm:w-72" placeholder="Search bookings..." />
          <div className="flex gap-4 w-full sm:w-auto">
            <FilterDropdown
              label="Status"
              options={[
              { label: 'Confirmed', value: 'confirmed' },
              { label: 'Pending', value: 'pending' },
              { label: 'Active', value: 'active' },
              { label: 'Cancelled', value: 'cancelled' }]
              }
              value=""
              onChange={() => {}} />

          </div>
        </div>

        <DataTable columns={columns} data={bookings} actions={actions} />

        <Pagination currentPage={1} totalPages={2} totalItems={15} itemsPerPage={10} onPageChange={() => {}} />
      </div>
    </DashboardLayout>);

}