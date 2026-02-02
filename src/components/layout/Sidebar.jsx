
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  Home,
  CalendarRange,
  CreditCard,
  ShoppingCart,
  ShieldCheck,
  Package,
  FileText,
  Settings,
  LogOut,
  PieChart } from
'lucide-react';

export function Sidebar() {
  const navGroups = [
  {
    title: 'MAIN',
    items: [
    {
      name: 'Dashboard',
      to: '/',
      icon: <LayoutDashboard className="w-5 h-5" />
    }]

  },
  {
    title: 'MANAGEMENT',
    items: [
    {
      name: 'Users',
      to: '/users',
      icon: <Users className="w-5 h-5" />
    },
    {
      name: 'Properties',
      to: '/properties',
      icon: <Building2 className="w-5 h-5" />
    },
    {
      name: 'Listings',
      to: '/listings',
      icon: <Home className="w-5 h-5" />
    },
    {
      name: 'Bookings',
      to: '/bookings',
      icon: <CalendarRange className="w-5 h-5" />
    }]

  },
  {
    title: 'FINANCE',
    items: [
    {
      name: 'Payments',
      to: '/payments',
      icon: <CreditCard className="w-5 h-5" />
    },
    {
      name: 'Orders',
      to: '/orders',
      icon: <ShoppingCart className="w-5 h-5" />
    }]

  },
  {
    title: 'OPERATIONS',
    items: [
    {
      name: 'Verifications',
      to: '/verifications',
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      name: 'Products',
      to: '/products',
      icon: <Package className="w-5 h-5" />
    }]

  },
  {
    title: 'SYSTEM',
    items: [
    {
      name: 'Audit Logs',
      to: '/audit-logs',
      icon: <FileText className="w-5 h-5" />
    },
    {
      name: 'Reports',
      to: '/reports',
      icon: <PieChart className="w-5 h-5" />
    },
    {
      name: 'Settings',
      to: '/settings',
      icon: <Settings className="w-5 h-5" />
    }]

  }];


  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-slate-300 flex flex-col z-30 transition-transform duration-300 ease-in-out">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-2 font-bold text-white text-xl tracking-tight">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white">C</span>
          </div>
          CampusHub
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
        {navGroups.map((group, index) =>
        <div key={index} className="mb-8">
            <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) =>
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
              `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors group ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`
              }>

                  <span className="mr-3 flex-shrink-0">{item.icon}</span>
                  {item.name}
                </NavLink>
            )}
            </div>
          </div>
        )}
      </nav>

      {/* User / Logout */}
      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              Admin User
            </p>
            <p className="text-xs text-slate-500 truncate">Super Admin</p>
          </div>
          <button className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>);

}