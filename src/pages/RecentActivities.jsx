import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { fetchAllActivities } from '../utils/ApiSocket';

export default function RecentActivities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function loadActivities() {
      const all = await fetchAllActivities();
      setActivities(all.map(act => ({
        user: act.user_id,
        action: act.title,
        target: act.description,
        time: new Date(act.timestamp).toLocaleString(),
        status: act.type === "verification_update" ? "review" : act.type === "payment_completed" ? "completed" : "active"
      })));
    }
    loadActivities();
  }, []);

  const columns = [
    { header: 'User', accessorKey: 'user', className: 'font-medium' },
    { header: 'Action', accessorKey: 'action' },
    { header: 'Target', accessorKey: 'target' },
    { header: 'Time', accessorKey: 'time', className: 'text-slate-500' },
    { header: 'Status', accessorKey: 'status', cell: row => <StatusBadge status={row.status} /> }
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">All System Activities</h1>
        <p className="text-slate-500 mt-1">Complete activity log of the system.</p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
        <DataTable columns={columns} data={activities} />
      </div>
    </DashboardLayout>
  );
}