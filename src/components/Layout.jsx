
import React, { useState } from 'react';
import {
  Building2,
  LayoutDashboard,
  Users,
  MessageSquare,
  Settings,
  Menu,
  X,
  Bell } from
'lucide-react';

export function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, active: false },
  { name: 'Properties', icon: Building2, active: false },
  { name: 'Users', icon: Users, active: false },
  { name: 'Communication Center', icon: MessageSquare, active: true },
  { name: 'Settings', icon: Settings, active: false }];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg text-slate-900">CampusHub</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-md">
          
          {isMobileMenuOpen ?
          <X className="h-6 w-6" /> :

          <Menu className="h-6 w-6" />
          }
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`
        ${isMobileMenuOpen ? 'block' : 'hidden'} 
        md:block w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0
        fixed md:sticky top-[61px] md:top-0 h-[calc(100vh-61px)] md:h-screen z-10 overflow-y-auto
      `}>
        
        <div className="p-6 hidden md:flex items-center gap-2 mb-2">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-sm">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">
            CampusHub
          </span>
        </div>

        <nav className="px-4 py-4 md:py-0 space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">
            Admin Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href="#"
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${item.active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                `}>
                
                <Icon
                  className={`h-5 w-5 ${item.active ? 'text-indigo-600' : 'text-slate-400'}`} />
                
                {item.name}
              </a>);

          })}
        </nav>

        {/* User Profile Snippet at bottom of sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100 bg-white">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold text-sm">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                Admin User
              </p>
              <p className="text-xs text-slate-500 truncate">
                admin@campushub.com
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-hidden">
        {/* Topbar (Desktop) */}
        <header className="hidden md:flex bg-white border-b border-slate-200 h-16 items-center justify-end px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-500 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="h-[calc(100vh-61px)] md:h-[calc(100vh-64px)] overflow-y-auto">
          {children}
        </div>
      </main>
    </div>);

}