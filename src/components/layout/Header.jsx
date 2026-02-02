
import React from 'react';
import { Bell, Search } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-slate-200 z-20 flex items-center justify-between px-6 shadow-sm">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border-none rounded-md leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 sm:text-sm"
            placeholder="Global search (users, listings, transactions)..." />

        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-slate-200 mx-1"></div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">
            Operations Team
          </span>
        </div>
      </div>
    </header>);

}