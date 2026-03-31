
export const mockAnnouncements = [
{
  id: '1',
  title: 'Scheduled Maintenance: Water Shutoff',
  message:
  'Water will be shut off in Building A from 10 AM to 2 PM on Thursday for routine maintenance.',
  audience: 'All Comrades',
  date: 'Oct 24, 2023 09:00 AM',
  status: 'Delivered'
},
{
  id: '2',
  title: 'New Lease Agreement Templates Available',
  message:
  'Updated lease templates for the 2024 academic year are now available in the landlord portal.',
  audience: 'Landlords',
  date: 'Oct 22, 2023 02:15 PM',
  status: 'Delivered'
},
{
  id: '3',
  title: 'Community Event: Fall Festival',
  message:
  'Join us in the courtyard this Friday at 5 PM for food, drinks, and games!',
  audience: 'All Users',
  date: 'Oct 20, 2023 11:30 AM',
  status: 'Delivered'
},
{
  id: '4',
  title: 'Rent Reminder: November',
  message:
  'Friendly reminder that rent for November is due on the 1st. Please ensure your payment methods are up to date.',
  audience: 'All Comrades',
  date: 'Oct 15, 2023 08:00 AM',
  status: 'Delivered'
}];


export const mockSmsMessages = [
{
  id: '1',
  recipient: 'Sarah Jenkins',
  phone: '+1 (555) 019-2834',
  message: 'Hi Sarah, your maintenance request #4029 has been completed.',
  status: 'Delivered',
  date: 'Oct 25, 2023 10:45 AM'
},
{
  id: '2',
  recipient: 'Michael Chen',
  phone: '+1 (555) 018-9921',
  message: 'CampusHub: Your package has arrived at the front desk.',
  status: 'Delivered',
  date: 'Oct 25, 2023 09:12 AM'
},
{
  id: '3',
  recipient: 'All Landlords',
  phone: 'Multiple',
  message: 'Reminder: Q3 property performance reports are now available.',
  status: 'Sent',
  date: 'Oct 24, 2023 04:00 PM'
}];


export const mockCalls = [
{
  id: '1',
  name: 'Emily Rodriguez',
  phone: '+1 (555) 012-3456',
  duration: '4m 12s',
  status: 'Completed',
  date: 'Oct 25, 2023 11:30 AM',
  role: 'Comrade'
},
{
  id: '2',
  name: 'David Kim',
  phone: '+1 (555) 013-4567',
  duration: '0m 0s',
  status: 'Missed',
  date: 'Oct 25, 2023 10:15 AM',
  role: 'Landlord'
},
{
  id: '3',
  name: 'Jessica Taylor',
  phone: '+1 (555) 014-5678',
  duration: '12m 45s',
  status: 'Completed',
  date: 'Oct 24, 2023 03:45 PM',
  role: 'Comrade'
},
{
  id: '4',
  name: 'Marcus Johnson',
  phone: '+1 (555) 015-6789',
  duration: '0m 0s',
  status: 'Failed',
  date: 'Oct 24, 2023 01:20 PM',
  role: 'Comrade'
}];


export const mockCommunicationHistory = [
{
  id: '1',
  type: 'SMS',
  recipient: 'Sarah Jenkins',
  audience: 'Specific User',
  messagePreview: 'Hi Sarah, your maintenance request...',
  status: 'Delivered',
  date: 'Oct 25, 2023 10:45 AM'
},
{
  id: '2',
  type: 'Call',
  recipient: 'Emily Rodriguez',
  audience: 'Specific User',
  messagePreview: 'Outbound call (4m 12s)',
  status: 'Completed',
  date: 'Oct 25, 2023 11:30 AM'
},
{
  id: '3',
  type: 'Announcement',
  recipient: 'Multiple',
  audience: 'All Comrades',
  messagePreview: 'Water will be shut off in Building A...',
  status: 'Delivered',
  date: 'Oct 24, 2023 09:00 AM'
},
{
  id: '4',
  type: 'SMS',
  recipient: 'Multiple',
  audience: 'All Landlords',
  messagePreview: 'Reminder: Q3 property performance...',
  status: 'Sent',
  date: 'Oct 24, 2023 04:00 PM'
},
{
  id: '5',
  type: 'Call',
  recipient: 'David Kim',
  audience: 'Specific User',
  messagePreview: 'Inbound call (Missed)',
  status: 'Missed',
  date: 'Oct 25, 2023 10:15 AM'
},
{
  id: '6',
  type: 'Announcement',
  recipient: 'Multiple',
  audience: 'Landlords',
  messagePreview: 'Updated lease templates for the 2024...',
  status: 'Delivered',
  date: 'Oct 22, 2023 02:15 PM'
},
{
  id: '7',
  type: 'SMS',
  recipient: 'Michael Chen',
  audience: 'Specific User',
  messagePreview: 'CampusHub: Your package has arrived...',
  status: 'Failed',
  date: 'Oct 25, 2023 09:12 AM'
},
{
  id: '8',
  type: 'Call',
  recipient: 'Marcus Johnson',
  audience: 'Specific User',
  messagePreview: 'Outbound call (Failed connection)',
  status: 'Failed',
  date: 'Oct 24, 2023 01:20 PM'
}];


export const mockUsers = [
{
  id: '1',
  name: 'Emily Rodriguez',
  role: 'Comrade',
  phone: '+1 (555) 012-3456',
  email: 'emily.r@example.com'
},
{
  id: '2',
  name: 'David Kim',
  role: 'Landlord',
  phone: '+1 (555) 013-4567',
  email: 'david.k@example.com'
},
{
  id: '3',
  name: 'Jessica Taylor',
  role: 'Comrade',
  phone: '+1 (555) 014-5678',
  email: 'jessica.t@example.com'
},
{
  id: '4',
  name: 'Marcus Johnson',
  role: 'Comrade',
  phone: '+1 (555) 015-6789',
  email: 'marcus.j@example.com'
}];