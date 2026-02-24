import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'; // make sure to import
import { FilterDropdown } from '../components/ui/FilterDropdown';
import { Pagination } from '../components/ui/Pagination';

/* ---------------- Modal ---------------- */
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

/* ---------------- Status Badge ---------------- */
function StatusBadge({ status }) {
  const map = {
    pending: 'bg-yellow-200 text-yellow-800',
    initiated: 'bg-yellow-200 text-yellow-800',
    confirmed: 'bg-green-200 text-green-800',
    completed: 'bg-green-300 text-green-900',
    cancelled: 'bg-red-200 text-red-800',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${map[status] || 'bg-gray-200 text-gray-800'}`}>
      {status}
    </span>
  );
}

/* ---------------- Main Component ---------------- */
export function Bookings() {
  const [requests, setRequests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [requestSearch, setRequestSearch] = useState('');
  const [bookingSearch, setBookingSearch] = useState('');
  const [requestStatus, setRequestStatus] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');

  const [requestPage, setRequestPage] = useState(1);
  const [bookingPage, setBookingPage] = useState(1);
  const itemsPerPage = 5;

  const [requestFilterOptions, setRequestFilterOptions] = useState([]);
  const [bookingFilterOptions, setBookingFilterOptions] = useState([]);

  const [paymentStatus, setPaymentStatus] = useState(null); // null | 'pending' | 'success' | 'failed'
  const [paymentPolling, setPaymentPolling] = useState(false);
  const [checkoutId, setCheckoutId] = useState(null)

  const [paymentLoading, setPaymentLoading] = useState(false);


  /* -------- Normalizer -------- */
  const normalize = (item) => ({
    ...item,
    listing_price: Number(item.listing_price || 0),
    renting_price: Number(item.renting_price || 0),
    latitude: item.latitude ? Number(item.latitude) : null,
    longitude: item.longitude ? Number(item.longitude) : null,
  });

  /* -------- Fetch Data -------- */
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        'https://campushub4293.pythonanywhere.com/admin/get_bookings_and_requests'
      );

      if (data.status === 'success') {
        const sortedRequests = data.data.requests
          .map(normalize)
          .sort((a, b) => new Date(b.requested_at) - new Date(a.requested_at));

        const sortedBookings = data.data.bookings
          .map(normalize)
          .sort((a, b) => new Date(b.booked_at) - new Date(a.booked_at));

        setRequests(sortedRequests);
        setBookings(sortedBookings);

        // dynamic filter options
        setRequestFilterOptions(
          Array.from(new Set(sortedRequests.map(r => r.status)))
            .map(s => ({ label: s.charAt(0).toUpperCase() + s.slice(1), value: s }))
        );

        setBookingFilterOptions(
          Array.from(new Set(sortedBookings.map(b => b.payment_status)))
            .map(s => ({ label: s.charAt(0).toUpperCase() + s.slice(1), value: s }))
        );
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  // Converts 0113899517 → 254113899517
const formatPhoneNumber = (number) => {
  if (!number) return '';
  number = number.trim();
  if (number.startsWith('0')) {
    return '254' + number.slice(1);
  }
  return number;
};

  /* -------- Filtering -------- */
  const filteredRequests = useMemo(() => {
    return requests
      .filter(r =>
        (r.requestor_username || '').toLowerCase().includes(requestSearch.toLowerCase())
      )
      .filter(r => !requestStatus || r.status === requestStatus);
  }, [requests, requestSearch, requestStatus]);

  const filteredBookings = useMemo(() => {
    return bookings
      .filter(b =>
        (b.tenant_username || '').toLowerCase().includes(bookingSearch.toLowerCase())
      )
      .filter(b => !bookingStatus || b.payment_status === bookingStatus);
  }, [bookings, bookingSearch, bookingStatus]);

  /* -------- Pagination -------- */
  const pagedRequests = filteredRequests.slice(
    (requestPage - 1) * itemsPerPage,
    requestPage * itemsPerPage
  );

  const pagedBookings = filteredBookings.slice(
    (bookingPage - 1) * itemsPerPage,
    bookingPage * itemsPerPage
  );

  /* -------- Card Renderer -------- */
  const renderCard = (item, type) => (
    <div
      key={item.id}
      className="border rounded-xl p-4 mb-3 shadow-sm hover:shadow-md transition flex justify-between"
    >
      <div className="text-sm space-y-1">
        <div className="font-semibold">{type === 'request' ? item.requestor_username : item.tenant_username}</div>
        <div>Call : {item.phone_number}</div>
        <div>{item.property_name}</div>
        <div>{item.listing_name}</div>
        <div>KES {item.listing_price}</div>
        <div>Date : {item.requested_at || item.booked_at}</div>
      </div>
      <div className="flex flex-col gap-2 items-end">
        <StatusBadge status={item.status || item.payment_status || item.booking_status} />
        <Button size="sm" variant="secondary" onClick={() => { setSelectedItem({ ...item, type }); setModalOpen(true); }}>
          Details
        </Button>
      </div>
    </div>
  );

  /* -------- Actions -------- */
  const handleBookRequest = async (r) => {
    try {
      await axios.post('https://campushub4293.pythonanywhere.com/admin/book_listing', {
        listing_id: r.listing_id,
        request_id: r.request_id,
        phone: r.phone_number,
        amount: 1000,
        user_id: r.user_id,
      });
      fetchData();
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Booking failed');
    }
  };

// const handlePayBooking = async (b) => {
//   try {
//     // Trigger payment
//     const response = await axios.post('https://campushub4293.pythonanywhere.com/admin/pay', {
//       phone: formatPhoneNumber(b.phone_number),
//       user_id: b.user_id,
//       amount: 1000,
//     });

//     if (response.status === 200 || response.data.status === 'success') {
//       setPaymentStatus('pending'); // show waiting
//       setPaymentPolling(true);
//       // setCheckoutId(response.data.checkout_request_id)
//       const checkout_id = response.data.checkout_request_id;
//       setCheckoutId(checkout_id);
//       console.log(checkout_id); // this will have the actual ID
//       console.log(checkoutId)
//     } else {
//       setPaymentStatus('failed');
//     }

//     setModalOpen(true); // keep modal open for status updates
//   } catch (err) {
//     console.error(err);
//     setPaymentStatus('failed');
//     setModalOpen(true);
//   }
// };

// useEffect(() => {
//   let interval;
//   if (paymentPolling && selectedItem) {
//     interval = setInterval(async () => {
//       try {
//         const res = await axios.post(
//           'https://campushub4293.pythonanywhere.com/mpesaPaymentGetways/check_transaction_status',
//           { checkout_id: checkoutId }
//         );

//         if (res.data.status === 'success') {
//           setPaymentStatus('success');
//           setPaymentPolling(false);
//           fetchData(); // refresh bookings
//         } else if (res.data.status === 'failed') {
//           setPaymentStatus('failed');
//           setPaymentPolling(false);
//         }
//         // else still pending
//       } catch (err) {
//         console.error('Polling error:', err);
//       }
//     }, 5000);
//   }

//   return () => interval && clearInterval(interval);
// }, [paymentPolling, selectedItem]);

useEffect(() => {
  if (paymentStatus === 'success' || paymentStatus === 'failed') {
    const timer = setTimeout(() => {
      setModalOpen(false);
      setPaymentStatus(null);
    }, 3000); // auto-close after 3s
    return () => clearTimeout(timer);
  }
}, [paymentStatus]);


const handlePayBooking = async (b) => {
  try {
    setPaymentLoading(true)
    // Trigger payment
    const response = await axios.post(
      'https://campushub4293.pythonanywhere.com/admin/pay',
      {
        phone: formatPhoneNumber(b.phone_number),
        user_id: b.user_id,
        amount: 1000,
      }
    );

    if (!(response.status === 200 || response.data.status === 'success')) {
      setPaymentStatus('failed');
      setModalOpen(true);
      return;
    }

    const cid = response.data.checkout_request_id;
    setCheckoutId(cid);
    setPaymentStatus('pending');
    setPaymentLoading(false)
    setModalOpen(true);

    // Polling config
    let retries = 0;
    const maxRetries = 24; // e.g., 2 minutes at 5s interval
    const intervalTime = 5000;

    const poll = setInterval(async () => {
      retries += 1;
      if (retries > maxRetries) {
        setPaymentStatus('failed');
        clearInterval(poll);
        return;
      }

      try {
        const res = await axios.post(
          'https://campushub4293.pythonanywhere.com/mpesaPaymentGetways/check_transaction_status',
          { checkout_id: cid }
        );

        if (res.data.status === 'success') {
          setPaymentStatus('success');
          fetchData();
          clearInterval(poll);
        } else if (res.data.status === 'failed') {
          setPaymentStatus('failed');
          clearInterval(poll);
        }
        // else still pending, continue polling
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, intervalTime);

  } catch (err) {
    console.error(err);
    setPaymentStatus('failed');
    setModalOpen(true);
  }
};


  /* -------- UI -------- */
  return (
    <DashboardLayout>

      {/* Requests Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-3">Requests</h1>
        <div className="flex gap-2 flex-wrap mb-3">
          <SearchInput placeholder="Search requests..." value={requestSearch} onChange={e => setRequestSearch(e.target.value)} />
          <FilterDropdown label="Status" options={requestFilterOptions} value={requestStatus} onChange={setRequestStatus} />
        </div>
        {pagedRequests.map(r => renderCard(r, 'request'))}
        <Pagination
          currentPage={requestPage}
          totalPages={Math.ceil(filteredRequests.length / itemsPerPage)}
          totalItems={filteredRequests.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setRequestPage}
        />
      </div>

      {/* Bookings Section */}
      <div className="mb-6 mt-10">
        <h1 className="text-2xl font-semibold mb-3">Bookings</h1>
        <div className="flex gap-2 flex-wrap mb-3">
          <SearchInput placeholder="Search bookings..." value={bookingSearch} onChange={e => setBookingSearch(e.target.value)} />
          <FilterDropdown label="Payment Status" options={bookingFilterOptions} value={bookingStatus} onChange={setBookingStatus} />
        </div>
        {pagedBookings.map(b => renderCard(b, 'booking'))}
        <Pagination
          currentPage={bookingPage}
          totalPages={Math.ceil(filteredBookings.length / itemsPerPage)}
          totalItems={filteredBookings.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setBookingPage}
        />
      </div>

      {/* Modal Section */}
      {modalOpen && selectedItem && (
        <Modal title={selectedItem.type === 'request' ? 'Request Details' : 'Booking Details'} onClose={() => setModalOpen(false)}>
          <div className="space-y-4 text-sm">
            {/* User Info */}
            <div className="border rounded p-3">
              <h3 className="font-semibold mb-2">User</h3>
              <div>Username: {selectedItem.requestor_username || selectedItem.tenant_username}</div>
              <div>Email: {selectedItem.requestor_email || selectedItem.tenant_email}</div>
              <div>Phone: {selectedItem.phone_number}</div>
              <div>Campus: Zetech</div>
            </div>

            {/* Property Info */}
            <div className="border rounded p-3">
              <h3 className="font-semibold mb-2">Property</h3>
              <div>Name: {selectedItem.property_name}</div>
              <div>Type: {selectedItem.property_type}</div>
              <div>Address: {selectedItem.address || 'N/A'}</div>
              <div>Latitude: {selectedItem.latitude ?? 'N/A'}</div>
              <div>Longitude: {selectedItem.longitude ?? 'N/A'}</div>
            </div>

            {/* Listing Info */}
            <div className="border rounded p-3">
              <h3 className="font-semibold mb-2">Listing</h3>
              <div>Name: {selectedItem.listing_name}</div>
              <div>Price: KES {selectedItem.listing_price}</div>
              <div>Status: {selectedItem.availability_status}</div>
              <div>listingId: {selectedItem.listing_id}</div>
            </div>

            {/* Landlord Info */}
            <div className="border rounded p-3">
              <h3 className="font-semibold mb-2">Landlord</h3>
              <div>Username: {selectedItem.landlord_username}</div>
              <div>Email: {selectedItem.landlord_email}</div>
              <div>Verification: {selectedItem.landlord_verification_status} to post listings</div>
              <div>Phone: {selectedItem.landlord_phone}</div>
            </div>

            {/* Actions */}
            {selectedItem.type === 'request' && selectedItem.status === 'pending' && (
              <Button className="mt-4 w-full" onClick={() => handleBookRequest(selectedItem)}>Book Request</Button>
            )}
          {selectedItem.type === 'booking' && selectedItem.payment_status !== 'paid' && (
  <div className="mt-4 flex flex-col items-center gap-3">
    {!paymentStatus && (
      // <Button className="w-full" onClick={() => handlePayBooking(selectedItem)}>
      //   Trigger Payment
      // </Button>
     <Button
  className="mt-4 w-full"
  onClick={() => handlePayBooking(selectedItem)}
  disabled={paymentLoading}
>
  {paymentLoading ? 'Processing Payment...' : 'Trigger Payment'}
</Button>
      
    )}

    {paymentStatus === 'pending' && (
      <div className="flex flex-col items-center gap-2 text-yellow-600 font-semibold">
        <Loader2 className="animate-spin w-8 h-8" />
        <span>Waiting for payment confirmation...</span>
      </div>
    )}

    {paymentStatus === 'success' && (
      <div className="flex flex-col items-center gap-2 text-green-600 font-semibold">
        <CheckCircle className="w-8 h-8" />
        <span>Payment Successful!</span>
      </div>
    )}

    {paymentStatus === 'failed' && (
      <div className="flex flex-col items-center gap-2 text-red-600 font-semibold">
        <XCircle className="w-8 h-8" />
        <span>Payment Failed!</span>
      </div>
    )}
  </div>
)}
          </div>
        </Modal>

        
      )}

      {loading && <div className="text-center mt-4">Loading...</div>}
    </DashboardLayout>
  );
}