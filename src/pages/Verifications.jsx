
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { FilterDropdown } from '../components/ui/FilterDropdown';
import { FileText, Check, X } from 'lucide-react';

export function Verifications() {
  const verifications = [
  { id: 'VR-001', user: 'John Doe', type: 'Landlord Identity', submitted: '2024-02-28', documents: 2, status: 'pending' },
  { id: 'VR-002', user: 'Sunset Apartments', type: 'Property Ownership', submitted: '2024-02-27', documents: 4, status: 'review' },
  { id: 'VR-003', user: 'Mike Wilson', type: 'E-Service License', submitted: '2024-02-26', documents: 1, status: 'rejected' },
  { id: 'VR-004', user: 'Sarah Connor', type: 'Landlord Identity', submitted: '2024-02-25', documents: 2, status: 'verified' }];


  const columns = [
  { header: 'ID', accessorKey: 'id', className: 'font-mono text-xs' },
  { header: 'User / Entity', accessorKey: 'user', className: 'font-medium' },
  { header: 'Verification Type', accessorKey: 'type' },
  { header: 'Submitted', accessorKey: 'submitted' },
  {
    header: 'Documents',
    accessorKey: 'documents',
    cell: (row) =>
    <div className="flex items-center gap-1 text-indigo-600 cursor-pointer hover:underline">
          <FileText className="w-4 h-4" />
          {row.documents} Files
        </div>

  },
  { header: 'Status', accessorKey: 'status', cell: (row) => <StatusBadge status={row.status} /> }];


  const actions = (row) =>
  <div className="flex justify-end gap-2">
      <Button variant="secondary" size="sm">Review</Button>
      {row.status === 'pending' &&
    <>
          <Button variant="ghost" size="sm" className="text-emerald-600 hover:bg-emerald-50" title="Approve">
            <Check className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-rose-600 hover:bg-rose-50" title="Reject">
            <X className="w-4 h-4" />
          </Button>
        </>
    }
    </div>;


  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Identity & Security</h1>
          <p className="text-slate-500 mt-1">Review and approve user and property verifications.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm mb-6">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <SearchInput className="w-full sm:w-72" placeholder="Search requests..." />
          <div className="flex gap-4 w-full sm:w-auto">
            <FilterDropdown
              label="Type"
              options={[
              { label: 'Identity', value: 'identity' },
              { label: 'Property', value: 'property' },
              { label: 'License', value: 'license' }]
              }
              value=""
              onChange={() => {}} />

            <FilterDropdown
              label="Status"
              options={[
              { label: 'Pending', value: 'pending' },
              { label: 'Reviewing', value: 'review' },
              { label: 'Verified', value: 'verified' }]
              }
              value=""
              onChange={() => {}} />

          </div>
        </div>

        <DataTable columns={columns} data={verifications} actions={actions} />
      </div>
    </DashboardLayout>);

}