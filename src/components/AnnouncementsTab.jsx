

import React, { useState } from 'react';
import { Megaphone, Send } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Label,
  Input,
  Textarea,
  Select,
  Alert,
  Badge } from
'./ui';
import { mockAnnouncements } from '../data/mockData';
import axios from "axios";

export function AnnouncementsTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    audience: 'all',
    title: '',
    message: ''
  });



const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation
  if (!formData.title || !formData.message) {
    setAlert({
      type: 'error',
      message: 'Please fill in all fields.'
    });
    return;
  }

  setIsLoading(true);
  setAlert(null);

  try {
    // POST request to your backend
    const response = await axios.post(
      "https://campushub4293.pythonanywhere.com/admin/post_announcement",
      formData
    );

    // Assuming your backend returns { success: true } or similar
    if (response.data.message) {
      setAlert({
        type: 'success',
        message: response.data.message
      });
      setFormData({
        audience: 'all',
        title: '',
        message: ''
      });
    } else {
      setAlert({
        type: 'error',
        message: response.data.message || 'Failed to send announcement.'
      });
    }
  } catch (error) {
    setAlert({
      type: 'error',
      message: error.response?.data?.error || 'An error occurred while sending.'
    });
  } finally {
    setIsLoading(false);
    setTimeout(() => setAlert(null), 3000);
  }
};

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-indigo-600" />
                <CardTitle>New Announcement</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {alert &&
                <Alert
                  variant={alert.type}
                  message={alert.message}
                  onClose={() => setAlert(null)} />

                }

                <div>
                  <Label htmlFor="audience">Audience</Label>
                  <Select
                    id="audience"
                    value={formData.audience}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      audience: e.target.value
                    })
                    }>
                    
                    <option value="all">All Users</option>
                    <option value="comrades">All Comrades</option>
                    <option value="landlords">Landlords</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="title">Announcement Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Scheduled Maintenance"
                    value={formData.title}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value
                    })
                    } />
                  
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="Write your announcement here..."
                    value={formData.message}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value
                    })
                    } />
                  
                </div>

                <Button type="submit" className="w-full" isLoading={isLoading}>
                  <Send className="mr-2 h-4 w-4" />
                  Send Announcement
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Previous Announcements Section */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnnouncements.map((announcement) =>
                <div
                  key={announcement.id}
                  className="p-4 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-slate-900">
                          {announcement.title}
                        </h4>
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {announcement.message}
                        </p>
                      </div>
                      <Badge variant="info" className="whitespace-nowrap">
                        {announcement.audience}
                      </Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                      <span>{announcement.date}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {announcement.status}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);

}