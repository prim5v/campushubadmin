

import React, { useState } from 'react';
import { MessageSquare, Send, CreditCard } from 'lucide-react';
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
  Alert } from
'./ui';

export function SmsMessagesTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    audience: 'All Comrades',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
    !formData.message ||
    formData.audience === 'Specific User' && !formData.phone)
    {
      setAlert({
        type: 'error',
        message: 'Please fill in all required fields.'
      });
      return;
    }
    setIsLoading(true);
    setAlert(null);
    setTimeout(() => {
      setIsLoading(false);
      setAlert({
        type: 'success',
        message: 'SMS message(s) queued for delivery.'
      });
      setFormData({
        ...formData,
        message: '',
        phone: ''
      });
      setTimeout(() => setAlert(null), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-indigo-600" />
                <CardTitle>Send SMS Message</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {alert &&
                <Alert
                  variant={alert.type}
                  message={alert.message}
                  onClose={() => setAlert(null)} />

                }

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="sms-audience">Audience</Label>
                    <Select
                      id="sms-audience"
                      value={formData.audience}
                      onChange={(e) =>
                      setFormData({
                        ...formData,
                        audience: e.target.value
                      })
                      }>
                      
                      <option value="All Comrades">All Comrades</option>
                      <option value="All Landlords">All Landlords</option>
                      <option value="Specific User">Specific User</option>
                    </Select>
                  </div>

                  {formData.audience === 'Specific User' &&
                  <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value
                      })
                      } />
                    
                    </div>
                  }
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <Label htmlFor="sms-message" className="mb-0">
                      Message
                    </Label>
                    <span className="text-xs text-slate-500">
                      {formData.message.length} / 160 characters
                    </span>
                  </div>
                  <Textarea
                    id="sms-message"
                    rows={4}
                    placeholder="Type your text message here..."
                    value={formData.message}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value
                    })
                    }
                    maxLength={160} />
                  
                </div>

                <div className="flex justify-end">
                  <Button type="submit" isLoading={isLoading}>
                    <Send className="mr-2 h-4 w-4" />
                    Send SMS
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Credits Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-slate-600" />
                <CardTitle>SMS Credits</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  2,450
                </div>
                <p className="text-sm text-slate-500 mb-6">
                  Credits remaining this month
                </p>

                <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{ width: '45%' }}>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mb-6">
                  <span>0</span>
                  <span>5,000 limit</span>
                </div>

                <Button variant="outline" className="w-full">
                  Purchase More Credits
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);

}