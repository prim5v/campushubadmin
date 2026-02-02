
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StatCard } from '../components/ui/StatCard';
import {
  Users,
  Building2,
  CreditCard,
  ShieldCheck,
  Activity } from
'lucide-react';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';

export function Dashboard() {
  const recentActivity = [
  {
    id: 1,
    user: 'John Doe',
    action: 'New Listing Created',
    target: 'Sunset Apartments #402',
    time: '2 mins ago',
    status: 'pending'
  },
  {
    id: 2,
    user: 'Sarah Smith',
    action: 'Verification Request',
    target: 'Landlord Identity',
    time: '15 mins ago',
    status: 'review'
  },
  {
    id: 3,
    user: 'Mike Johnson',
    action: 'Payment Received',
    target: 'Rent - Feb 2024',
    time: '1 hour ago',
    status: 'completed'
  },
  {
    id: 4,
    user: 'Emily Davis',
    action: 'New User Signup',
    target: 'Student Account',
    time: '3 hours ago',
    status: 'active'
  },
  {
    id: 5,
    user: 'Robert Wilson',
    action: 'Booking Request',
    target: 'Green Valley Hostel',
    time: '5 hours ago',
    status: 'pending'
  }];


  const columns = [
  {
    header: 'User',
    accessorKey: 'user',
    className: 'font-medium'
  },
  {
    header: 'Action',
    accessorKey: 'action'
  },
  {
    header: 'Target',
    accessorKey: 'target'
  },
  {
    header: 'Time',
    accessorKey: 'time',
    className: 'text-slate-500'
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: (row) => <StatusBadge status={row.status} />
  }];


  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 mt-1">
          Welcome back, Admin. Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value="12,345"
          icon={<Users className="w-6 h-6" />}
          trend={{
            value: 12,
            label: 'vs last month',
            positive: true
          }}
          color="indigo" />

        <StatCard
          title="Active Listings"
          value="843"
          icon={<Building2 className="w-6 h-6" />}
          trend={{
            value: 5,
            label: 'vs last month',
            positive: true
          }}
          color="emerald" />

        <StatCard
          title="Revenue (Feb)"
          value="KES 4.2M"
          icon={<CreditCard className="w-6 h-6" />}
          trend={{
            value: 8,
            label: 'vs last month',
            positive: true
          }}
          color="amber" />

        <StatCard
          title="Pending Verifications"
          value="28"
          icon={<ShieldCheck className="w-6 h-6" />}
          trend={{
            value: 2,
            label: 'new today',
            positive: false
          }}
          color="rose" />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area - Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-500" />
                Recent System Activity
              </h2>
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                View All
              </button>
            </div>
            <DataTable columns={columns} data={recentActivity} />
          </div>
        </div>

        {/* Side Panel - System Status */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              System Health
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Server Load</span>
                  <span className="font-medium text-emerald-600">
                    Normal (24%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: '24%' }}>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Database Connections</span>
                  <span className="font-medium text-indigo-600">
                    452 Active
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: '65%' }}>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Storage Usage</span>
                  <span className="font-medium text-amber-600">
                    1.2TB / 2TB
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{ width: '60%' }}>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>);

}