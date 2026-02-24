import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StatCard } from '../components/ui/StatCard';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Users, Building2, CreditCard, ShieldCheck, Activity } from 'lucide-react';
import { fetchDashboardOverview, fetchRecentActivity } from '../utils/ApiSocket';

export function Dashboard() {
  const navigate = useNavigate();
  const [overview, setOverview] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [maintenance, setMaintenance] = useState({ active: false, loading: true });

  useEffect(() => {
    async function loadData() {
      const dashboard = await fetchDashboardOverview();
      if (dashboard) setOverview(dashboard);

      const activities = await fetchRecentActivity(10);
      setRecentActivity(
        activities.map(act => ({
          user: act.user_id,
          action: act.title,
          target: act.description,
          time: new Date(act.timestamp).toLocaleString(),
          status:
            act.type === "verification_update"
              ? "review"
              : act.type === "payment_completed"
              ? "completed"
              : "active"
        }))
      );
    }
    loadData();
  }, []);

  // Fetch maintenance status
  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        const res = await axios.get(
          'https://campushub4293.pythonanywhere.com/comrade/system_maintenance'
        );
        setMaintenance({
          active: res.data.is_active === 1,
          loading: false
        });
      } catch (err) {
        console.error('Failed to fetch maintenance status:', err);
        setMaintenance({ active: false, loading: false });
      }
    };

    fetchMaintenance();
  }, []);

  const systemOnline = !maintenance.active;

  const columns = [
    { header: 'User', accessorKey: 'user', className: 'font-medium' },
    { header: 'Action', accessorKey: 'action' },
    { header: 'Target', accessorKey: 'target' },
    { header: 'Time', accessorKey: 'time', className: 'text-slate-500' },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: row => <StatusBadge status={row.status} />
    }
  ];

  if (!overview) return <DashboardLayout>Loading...</DashboardLayout>;

  const {
    total_users,
    active_listings,
    total_revenue,
    pending_verifications
  } = overview.overview;

  const {
    cpu_percent,
    database_connections,
    disk_usage
  } = overview.system_health;

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
          value={total_users}
          icon={<Users className="w-6 h-6" />}
          trend={{
            value: overview.analytics_percent_change.users,
            label: 'vs last month',
            positive: true
          }}
          color="indigo"
        />

        <StatCard
          title="Active Listings"
          value={active_listings}
          icon={<Building2 className="w-6 h-6" />}
          trend={{
            value: overview.analytics_percent_change.listings,
            label: 'vs last month',
            positive: true
          }}
          color="emerald"
        />

        <StatCard
          title="Revenue (Feb)"
          value={`KES ${total_revenue}`}
          icon={<CreditCard className="w-6 h-6" />}
          trend={{
            value: overview.analytics_percent_change.revenue,
            label: 'vs last month',
            positive: true
          }}
          color="amber"
        />

        <StatCard
          title="Pending Verifications"
          value={pending_verifications}
          icon={<ShieldCheck className="w-6 h-6" />}
          trend={{
            value: overview.analytics_percent_change.verifications,
            label: 'new today',
            positive: false
          }}
          color="rose"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-500" />
                Recent System Activity
              </h2>
              <button
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                onClick={() => navigate('/recent')}
              >
                View All
              </button>
            </div>
            <DataTable columns={columns} data={recentActivity} />
          </div>
        </div>

        {/* System Health */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">
                System Health
              </h3>

              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
                ${
                  maintenance.loading
                    ? "bg-slate-100 text-slate-600 border border-slate-200"
                    : systemOnline
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-rose-50 text-rose-700 border border-rose-200"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full
                  ${
                    maintenance.loading
                      ? "bg-slate-400"
                      : systemOnline
                      ? "bg-emerald-500 animate-pulse"
                      : "bg-rose-500"
                  }`}
                />
                {maintenance.loading
                  ? "Checking..."
                  : systemOnline
                  ? "Online"
                  : "Offline"}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Server Load</span>
                  <span className="font-medium text-emerald-600">
                    {cpu_percent}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${cpu_percent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">
                    Database Connections
                  </span>
                  <span className="font-medium text-indigo-600">
                    {database_connections} Active
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: '65%' }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Storage Usage</span>
                  <span className="font-medium text-amber-600">
                    {disk_usage.used_gb}GB / {disk_usage.total_gb}GB
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{
                      width: `${
                        (disk_usage.used_gb / disk_usage.total_gb) * 100
                      }%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}