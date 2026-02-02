
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { FilterDropdown } from '../components/ui/FilterDropdown';
import { Pagination } from '../components/ui/Pagination';
import { Download } from 'lucide-react';

export function Payments() {
  const payments = [
  { id: 'TXN-88392', user: 'Jane Smith', type: 'Rent Payment', amount: 'KES 8,000', method: 'M-Pesa', date: '2024-02-28 14:30', status: 'completed' },
  { id: 'TXN-88393', user: 'John Doe', type: 'Subscription (Premium)', amount: 'KES 2,500', method: 'Card', date: '2024-02-28 12:15', status: 'completed' },
  { id: 'TXN-88394', user: 'Mike Wilson', type: 'Service Fee', amount: 'KES 500', method: 'M-Pesa', date: '2024-02-28 10:00', status: 'failed' },
  { id: 'TXN-88395', user: 'Tom Brown', type: 'Deposit', amount: 'KES 12,000', method: 'Bank Transfer', date: '2024-02-27 16:45', status: 'pending' }];


  const columns = [
  { header: 'Transaction ID', accessorKey: 'id', className: 'font-mono text-xs' },
  { header: 'User', accessorKey: 'user', className: 'font-medium' },
  { header: 'Type', accessorKey: 'type' },
  { header: 'Amount', accessorKey: 'amount', className: 'font-bold text-slate-900' },
  { header: 'Method', accessorKey: 'method' },
  { header: 'Date', accessorKey: 'date', className: 'text-slate-500' },
  { header: 'Status', accessorKey: 'status', cell: (row) => <StatusBadge status={row.status} /> }];


  const actions = (row) =>
  <div className="flex justify-end gap-2">
      <Button variant="ghost" size="sm">Receipt</Button>
    </div>;


  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Financial Transactions</h1>
          <p className="text-slate-500 mt-1">Monitor payments, subscriptions, and revenue.</p>
        </div>
        <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>Export Report</Button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm mb-6">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <SearchInput className="w-full sm:w-72" placeholder="Search transactions..." />
          <div className="flex gap-4 w-full sm:w-auto">
            <FilterDropdown
              label="Type"
              options={[
              { label: 'Rent', value: 'rent' },
              { label: 'Subscription', value: 'subscription' },
              { label: 'Deposit', value: 'deposit' }]
              }
              value=""
              onChange={() => {}} />

            <FilterDropdown
              label="Status"
              options={[
              { label: 'Completed', value: 'completed' },
              { label: 'Pending', value: 'pending' },
              { label: 'Failed', value: 'failed' }]
              }
              value=""
              onChange={() => {}} />

          </div>
        </div>

        <DataTable columns={columns} data={payments} actions={actions} />

        <Pagination currentPage={1} totalPages={12} totalItems={115} itemsPerPage={10} onPageChange={() => {}} />
      </div>
    </DashboardLayout>);

}