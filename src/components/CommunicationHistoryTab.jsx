

import React from 'react';
import { History, Megaphone, MessageSquare, Phone } from 'lucide-react';
import { Card, Badge } from './ui';
import { mockCommunicationHistory } from '../data/mockData';

export function CommunicationHistoryTab() {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Announcement':
        return <Megaphone className="h-4 w-4 text-indigo-500" />;
      case 'SMS':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'Call':
        return <Phone className="h-4 w-4 text-emerald-500" />;
      default:
        return <History className="h-4 w-4 text-slate-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
      case 'Completed':
        return <Badge variant="success">{status}</Badge>;
      case 'Sent':
        return <Badge variant="info">{status}</Badge>;
      case 'Missed':
        return <Badge variant="warning">{status}</Badge>;
      case 'Failed':
        return <Badge variant="error">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">
                Type
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                Recipient / Audience
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                Message Preview
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                Status
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockCommunicationHistory.map((item) =>
            <tr
              key={item.id}
              className="bg-white hover:bg-slate-50/50 transition-colors">
              
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <span className="font-medium text-slate-900">
                      {item.type}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-slate-900 font-medium">
                    {item.recipient}
                  </div>
                  <div className="text-slate-500 text-xs mt-0.5">
                    {item.audience}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div
                  className="text-slate-600 max-w-xs truncate"
                  title={item.messagePreview}>
                  
                    {item.messagePreview}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(item.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs">
                  {item.date}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer (Visual Only) */}
      <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50 rounded-b-xl">
        <span className="text-sm text-slate-500">
          Showing <span className="font-medium text-slate-900">1</span> to{' '}
          <span className="font-medium text-slate-900">8</span> of{' '}
          <span className="font-medium text-slate-900">24</span> results
        </span>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 text-sm border border-slate-300 rounded-md bg-white text-slate-500 disabled:opacity-50"
            disabled>
            
            Previous
          </button>
          <button className="px-3 py-1 text-sm border border-slate-300 rounded-md bg-white text-slate-700 hover:bg-slate-50">
            Next
          </button>
        </div>
      </div>
    </Card>);

}