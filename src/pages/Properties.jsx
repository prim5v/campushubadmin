
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { FilterDropdown } from '../components/ui/FilterDropdown';
import { Pagination } from '../components/ui/Pagination';
import { MapPin, ShieldCheck } from 'lucide-react';

export function Properties() {
  const properties = [
  { id: 1, name: 'Sunset Apartments', address: '123 University Way', landlord: 'John Doe', rooms: 12, verified: true, status: 'active' },
  { id: 2, name: 'Green Valley Hostel', address: '45 College Rd', landlord: 'Sarah Connor', rooms: 45, verified: false, status: 'pending' },
  { id: 3, name: 'Campus Heights', address: '88 Student Ave', landlord: 'Mike Ross', rooms: 20, verified: true, status: 'active' },
  { id: 4, name: 'The Lofts', address: '101 Main St', landlord: 'Jessica Pearson', rooms: 8, verified: false, status: 'rejected' }];


  const columns = [
  {
    header: 'Property Name',
    accessorKey: 'name',
    className: 'font-medium text-slate-900',
    cell: (row) =>
    <div className="flex items-center gap-2">
          {row.name}
          {row.verified && <ShieldCheck className="w-4 h-4 text-emerald-500" title="Verified Property" />}
        </div>

  },
  {
    header: 'Location',
    accessorKey: 'address',
    cell: (row) =>
    <div className="flex items-center text-slate-500">
          <MapPin className="w-3 h-3 mr-1" />
          {row.address}
        </div>

  },
  { header: 'Landlord', accessorKey: 'landlord' },
  { header: 'Rooms', accessorKey: 'rooms' },
  {
    header: 'Verification',
    accessorKey: 'verified',
    cell: (row) =>
    row.verified ?
    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Verified</span> :

    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Unverified</span>

  },
  { header: 'Status', accessorKey: 'status', cell: (row) => <StatusBadge status={row.status} /> }];


  const actions = (row) =>
  <div className="flex justify-end gap-2">
      <Button variant="secondary" size="sm">View</Button>
      {!row.verified &&
    <Button variant="primary" size="sm" className="bg-emerald-600 hover:bg-emerald-700">Verify</Button>
    }
    </div>;


  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Properties</h1>
          <p className="text-slate-500 mt-1">Manage rental properties and verification status.</p>
        </div>
        <Button>Add Property</Button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm mb-6">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <SearchInput className="w-full sm:w-72" placeholder="Search properties..." />
          <div className="flex gap-4 w-full sm:w-auto">
            <FilterDropdown
              label="Verification"
              options={[
              { label: 'Verified', value: 'true' },
              { label: 'Unverified', value: 'false' }]
              }
              value=""
              onChange={() => {}} />

            <FilterDropdown
              label="Status"
              options={[
              { label: 'Active', value: 'active' },
              { label: 'Pending', value: 'pending' },
              { label: 'Rejected', value: 'rejected' }]
              }
              value=""
              onChange={() => {}} />

          </div>
        </div>

        <DataTable columns={columns} data={properties} actions={actions} />

        <Pagination currentPage={1} totalPages={3} totalItems={24} itemsPerPage={10} onPageChange={() => {}} />
      </div>
    </DashboardLayout>);

}