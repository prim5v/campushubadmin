import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { FilterDropdown } from '../components/ui/FilterDropdown';
import { Pagination } from '../components/ui/Pagination';
import { MapPin, ShieldCheck } from 'lucide-react';
import axios from 'axios';

export function Properties() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch from backend
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get(
        'https://campushub4293.pythonanywhere.com/admin/get_properties'
      );

      // Map backend structure to frontend structure
      const mapped = res.data.properties.map((p) => ({
        id: p.property_id,
        property_id: p.property_id,
        name: p.property_name,
        address: p.address,
        landlord: p.landlord_name,
        rooms: p.listing_count,
        verified: p.verification_status === 'verified',
        status: p.account_status,
        images: p.images,
        latitude: parseFloat(p.latitude),
        longitude: parseFloat(p.longitude),
        verification_status: p.verification_status
      }));

      setProperties(mapped);
    } catch (err) {
      console.error('Failed to fetch properties', err);
    }
  };

  const handleVerify = async () => {
    if (!transactionId) return;

    setLoading(true);
    try {
      await axios.post(
        'https://campushub4293.pythonanywhere.com/admin/check_transaction',
        {
          transaction_id: transactionId,
          property_id: selectedProperty.property_id
        }
      );

      setShowVerifyModal(false);
      setTransactionId('');
      fetchProperties(); // refresh
    } catch (err) {
      alert('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      header: 'Property Name',
      accessorKey: 'name',
      cell: (row) => (
        <div className="flex items-center gap-2">
          {row.name}
          {row.verified && (
            <ShieldCheck
              className="w-4 h-4 text-emerald-500"
              title="Verified Property"
            />
          )}
        </div>
      )
    },
    {
      header: 'Location',
      accessorKey: 'address',
      cell: (row) => (
        <div className="flex items-center text-slate-500">
          <MapPin className="w-3 h-3 mr-1" />
          {row.address}
        </div>
      )
    },
    { header: 'Landlord', accessorKey: 'landlord' },
    { header: 'Rooms', accessorKey: 'rooms' },
    {
      header: 'Verification',
      accessorKey: 'verified',
      cell: (row) =>
        row.verified ? (
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            Verified
          </span>
        ) : (
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            Unverified
          </span>
        )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => <StatusBadge status={row.status} />
    }
  ];

  const actions = (row) => (
    <div className="flex justify-end gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => {
          setSelectedProperty(row);
          setShowViewModal(true);
        }}
      >
        View
      </Button>

      {!row.verified && (
        <Button
          variant="primary"
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => {
            setSelectedProperty(row);
            setShowVerifyModal(true);
          }}
        >
          Verify
        </Button>
      )}
    </div>
  );

  return (
    <DashboardLayout>
      <DataTable columns={columns} data={properties} actions={actions} />

      {/* View Modal */}
      {showViewModal && selectedProperty && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-3/4 max-w-4xl rounded-lg overflow-hidden">
            <img
              src={selectedProperty.images[0]}
              alt="property"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold">
                {selectedProperty.name}
              </h2>
              <p className="text-slate-500">
                {selectedProperty.address}
              </p>

              <div className="mt-4 h-64">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={`https://www.google.com/maps?q=${selectedProperty.latitude},${selectedProperty.longitude}&output=embed`}
                  allowFullScreen
                />
              </div>

              <div className="mt-4 text-right">
                <Button onClick={() => setShowViewModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verify Modal */}
      {showVerifyModal && selectedProperty && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">
              Verify Property
            </h2>

            <input
              type="text"
              placeholder="Enter Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
            />

            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowVerifyModal(false)}
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                onClick={handleVerify}
                disabled={loading}
              >
                {loading ? 'Checking...' : 'Confirm Verification'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}