import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';
import { Save } from 'lucide-react';
import axios from 'axios';

export function Settings() {
  const [maintenance, setMaintenance] = useState({ active: false, loading: true });
  const [updating, setUpdating] = useState(false);

  // Fetch current maintenance status
  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        const res = await axios.get('https://campushub4293.pythonanywhere.com/comrade/system_maintenance');
        setMaintenance({ active: res.data.is_active === 1, loading: false });
      } catch (err) {
        console.error('Failed to fetch maintenance status:', err);
        setMaintenance({ active: false, loading: false });
      }
    };
    fetchMaintenance();
  }, []);

  // Toggle maintenance mode
  const toggleMaintenance = async () => {
    setUpdating(true);
    try {
      const newState = !maintenance.active;
      const res = await axios.put('https://campushub4293.pythonanywhere.com/admin/set_system_maintenance', {
        is_active: newState,
        message: "The system is currently under maintenance. Please check back later."
      });
      setMaintenance({ active: res.data.is_active === 1, loading: false });
    } catch (err) {
      console.error('Failed to update maintenance mode:', err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
        <p className="text-slate-500 mt-1">Configure global platform settings and plans.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* General Settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Platform Configuration</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Platform Name</label>
                <input
                  type="text"
                  defaultValue="CampusHub"
                  className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Support Email</label>
                <input
                  type="email"
                  defaultValue="support@campushub.com"
                  className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="pt-4">
                <Button leftIcon={<Save className="w-4 h-4" />}>Save Changes</Button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Subscription Plans</h2>
            <div className="space-y-4">
              {['Basic (Free)', 'Premium (Landlord)', 'Business (E-Service)'].map((plan, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-slate-900">{plan}</h3>
                    <p className="text-sm text-slate-500">Active • 120 users</p>
                  </div>
                  <Button variant="secondary" size="sm">Edit</Button>
                </div>
              ))}
              <Button variant="outline" className="w-full">Add New Plan</Button>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Maintenance Mode</h2>
            <p className="text-sm text-slate-500 mb-4">
              Enable maintenance mode to prevent users from accessing the platform during updates.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Status</span>
              <button
                onClick={toggleMaintenance}
                disabled={updating || maintenance.loading}
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  maintenance.active ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                    maintenance.active ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}