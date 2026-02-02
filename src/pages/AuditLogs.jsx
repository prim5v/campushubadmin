
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/ui/DataTable';
import { SearchInput } from '../components/ui/SearchInput';
import { FilterDropdown } from '../components/ui/FilterDropdown';
import { Pagination } from '../components/ui/Pagination';

export function AuditLogs() {
  const logs = [
  { id: 1, action: 'USER_LOGIN', actor: 'admin@campushub.com', ip: '192.168.1.1', resource: 'System', details: 'Successful login', timestamp: '2024-02-28 14:30:05' },
  { id: 2, action: 'UPDATE_PROPERTY', actor: 'john@landlord.com', ip: '10.0.0.5', resource: 'Property #12', details: 'Updated rent price', timestamp: '2024-02-28 13:15:22' },
  { id: 3, action: 'VERIFY_USER', actor: 'admin@campushub.com', ip: '192.168.1.1', resource: 'User #45', details: 'Approved landlord ID', timestamp: '2024-02-28 11:05:10' },
  { id: 4, action: 'DELETE_LISTING', actor: 'sarah@landlord.com', ip: '172.16.0.2', resource: 'Listing #88', details: 'Removed listing', timestamp: '2024-02-28 09:45:00' },
  { id: 5, action: 'FAILED_LOGIN', actor: 'unknown', ip: '45.33.22.11', resource: 'Auth', details: 'Invalid password attempt', timestamp: '2024-02-28 04:20:15' }];


  const columns = [
  { header: 'Timestamp', accessorKey: 'timestamp', className: 'text-slate-500 font-mono text-xs' },
  { header: 'Action', accessorKey: 'action', className: 'font-medium text-slate-900' },
  { header: 'Actor', accessorKey: 'actor' },
  { header: 'IP Address', accessorKey: 'ip', className: 'font-mono text-xs' },
  { header: 'Resource', accessorKey: 'resource' },
  { header: 'Details', accessorKey: 'details', className: 'text-slate-600' }];


  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">System Audit Logs</h1>
        <p className="text-slate-500 mt-1">Track all system activities for security and compliance.</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm mb-6">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <SearchInput className="w-full sm:w-96" placeholder="Search logs by actor, action, or IP..." />
          <div className="flex gap-4 w-full sm:w-auto">
            <FilterDropdown
              label="Action"
              options={[
              { label: 'Login', value: 'login' },
              { label: 'Update', value: 'update' },
              { label: 'Delete', value: 'delete' }]
              }
              value=""
              onChange={() => {}} />

          </div>
        </div>

        <DataTable columns={columns} data={logs} />

        <Pagination currentPage={1} totalPages={50} totalItems={500} itemsPerPage={10} onPageChange={() => {}} />
      </div>
    </DashboardLayout>);

}