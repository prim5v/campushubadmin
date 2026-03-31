

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, MessageSquare, Phone, History } from 'lucide-react';
import { AnnouncementsTab } from '../components/AnnouncementsTab';
import { SmsMessagesTab } from '../components/SmsMessagesTab';
import { CallCenterTab } from '../components/CallCenterTab';
import { CommunicationHistoryTab } from '../components/CommunicationHistoryTab';
import { DashboardLayout } from '../components/layout/DashboardLayout';

const TABS = [
{
  id: 'announcements',
  label: 'Announcements',
  icon: Megaphone,
  component: AnnouncementsTab
},
{
  id: 'sms',
  label: 'SMS Messages',
  icon: MessageSquare,
  component: SmsMessagesTab
},
{
  id: 'calls',
  label: 'Call Center',
  icon: Phone,
  component: CallCenterTab
},
{
  id: 'history',
  label: 'Communication History',
  icon: History,
  component: CommunicationHistoryTab
}];


export function CommunicationCenter() {
  const [activeTab, setActiveTab] = useState('announcements');
  const ActiveComponent =
  TABS.find((t) => t.id === activeTab)?.component || AnnouncementsTab;

  return (
   
    <DashboardLayout>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Communication Center
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage announcements, SMS messages, and calls across your properties.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-8 border-b border-slate-200">
        <nav
          className="-mb-px flex space-x-8 overflow-x-auto"
          aria-label="Tabs">
          
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors
                  ${isActive ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
                `}>
                
                <Icon
                  className={`
                  mr-2 h-5 w-5 
                  ${isActive ? 'text-indigo-500' : 'text-slate-400 group-hover:text-slate-500'}
                `} />
                
                {tab.label}
              </button>);

          })}
        </nav>
      </div>

      {/* Tab Content Area with Animation */}
      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}>
            
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    </DashboardLayout>
    
    );

}