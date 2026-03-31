import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Input,
  Badge
} from './ui';
import { mockUsers, mockCalls } from '../data/mockData';

const DIALPAD = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['*', '0', '#'],
];

export function CallCenterTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [callingId, setCallingId] = useState(null);
  const [dialNumber, setDialNumber] = useState('');
  const [inCall, setInCall] = useState(false);
  const [callModal, setCallModal] = useState(null); // {name, number, duration}

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
  );

  // Start call from directory or dialer
  const startCall = (name, number, id = null) => {
    setCallingId(id);
    setDialNumber(number);
    setInCall(true);
    setCallModal({ name, number, duration: 0 });
  };

  const handleDialPress = (digit) => {
    if (inCall) return;
    setDialNumber((prev) => prev + digit);
  };

  const handleDialCall = () => {
    if (!dialNumber) return;
    startCall(dialNumber, dialNumber);
  };

  const handleHangup = () => {
    setInCall(false);
    setCallingId(null);
    setDialNumber('');
    setCallModal(null);
  };

  // Call duration timer
  useEffect(() => {
    if (!callModal || !inCall) return;
    const interval = setInterval(() => {
      setCallModal((prev) => ({ ...prev, duration: prev.duration + 1 }));
    }, 1000);
    return () => clearInterval(interval);
  }, [callModal, inCall]);

  const formatDuration = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <Phone className="h-4 w-4 text-emerald-500" />;
      case 'Missed':
        return <PhoneOff className="h-4 w-4 text-rose-500" />;
      default:
        return <Phone className="h-4 w-4 text-slate-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <Badge variant="success">Completed</Badge>;
      case 'Missed':
        return <Badge variant="error">Missed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Users + Recent Calls */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative">
            <Input
              placeholder="Search users by name or phone..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="hover:border-indigo-200 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold">
                        {user.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">{user.name}</h4>
                        <p className="text-xs text-slate-500">{user.phone}</p>
                      </div>
                    </div>
                    <Badge variant={user.role === 'Comrade' ? 'info' : 'default'}>{user.role}</Badge>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 truncate pr-2">{user.email}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startCall(user.name, user.phone, user.id)}
                      isLoading={callingId === user.id}
                    >
                      <Phone className="h-3.5 w-3.5 mr-1.5" /> Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredUsers.length === 0 && (
              <div className="col-span-full py-8 text-center text-slate-500">
                No users found matching "{searchQuery}"
              </div>
            )}
          </div>

          {/* Recent Calls below users */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Calls</CardTitle>
            </CardHeader>
            <div className="divide-y divide-slate-100">
              {mockCalls.map((call) => (
                <div key={call.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(call.status)}
                      <span className="text-sm font-medium text-slate-900">{call.name}</span>
                    </div>
                    {getStatusBadge(call.status)}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 ml-6">
                    <span>{call.phone}</span>
                    <span>{call.duration}</span>
                  </div>
                  <div className="text-xs text-slate-400 ml-6 mt-1">{call.date}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Dialer */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-gradient-to-b from-indigo-50 to-indigo-100">
            <CardHeader>
              <CardTitle>Dialer</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-full bg-white rounded-lg p-3 mb-4 text-center text-xl font-mono text-slate-900 border border-slate-200">
                {dialNumber || 'Enter Number'}
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {DIALPAD.flat().map((digit) => (
                  <button
                    key={digit}
                    onClick={() => handleDialPress(digit)}
                    disabled={inCall}
                    className="bg-white border border-slate-300 rounded-full h-14 w-14 flex items-center justify-center text-lg font-bold text-slate-800 hover:bg-indigo-50 active:bg-indigo-100 transition"
                  >
                    {digit}
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                {!inCall ? (
                  <Button onClick={handleDialCall} className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Call
                  </Button>
                ) : (
                  <Button onClick={handleHangup} className="bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-2">
                    <PhoneOff className="h-4 w-4" /> Hang Up
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call Modal */}
      {inCall && callModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-96 bg-white rounded-xl shadow-xl p-6 flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-2xl mb-4">
              {callModal.name[0]}
            </div>
            <h3 className="text-lg font-semibold">{callModal.name}</h3>
            <p className="text-sm text-slate-500 mb-4">{callModal.number}</p>
            <p className="text-xs text-slate-400 mb-6">Duration: {formatDuration(callModal.duration)}</p>
            <Button onClick={handleHangup} className="bg-rose-500 hover:bg-rose-600 text-white w-full flex justify-center items-center gap-2">
              <PhoneOff className="h-4 w-4" /> Hang Up
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}