import React, { useEffect, useMemo, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { FilterDropdown } from '../components/ui/FilterDropdown';
import { Pagination } from '../components/ui/Pagination';

const API_BASE = "https://campushub4293.pythonanywhere.com/admin";

export function Listings() {

  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [typeFilter, setTypeFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [search, setSearch] = useState("");

  const [editModal, setEditModal] = useState(false);
  const [editingListing, setEditingListing] = useState(null);

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [listings, typeFilter, availabilityFilter, search]);

  const capitalize = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

  /* ================= FETCH ================= */

  const fetchListings = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/get_listings`);
      const data = await res.json();

      if (data.listings) {
        const mapped = data.listings.map(item => ({
          id: item.listing_id,
          property: item.property_name,
          unit: item.unit,
          type: item.type,
          rawType: item.type,
          price: item.price,
          priceFormatted: `KES ${Number(item.price).toLocaleString()}`,
          availability: capitalize(item.availability),
          rawAvailability: item.availability,
          status: item.status
        }));

        setListings(mapped);
      }

    } catch (e) {
      console.error("Fetch listings failed", e);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTER LOGIC ================= */

  const applyFilters = () => {
    let data = [...listings];

    if (typeFilter) {
      data = data.filter(l => l.rawType === typeFilter);
    }

    if (availabilityFilter) {
      data = data.filter(l => l.rawAvailability === availabilityFilter);
    }

    if (search) {
      const s = search.toLowerCase();
      data = data.filter(l =>
        l.property.toLowerCase().includes(s) ||
        l.unit.toLowerCase().includes(s)
      );
    }

    setFilteredListings(data);
  };

  /* ================= DYNAMIC FILTER OPTIONS ================= */

  const typeOptions = useMemo(() => {
    const types = [...new Set(listings.map(l => l.rawType))];
    return types.map(t => ({
      label: capitalize(t),
      value: t
    }));
  }, [listings]);

  const availabilityOptions = useMemo(() => {
    const values = [...new Set(listings.map(l => l.rawAvailability))];
    return values.map(v => ({
      label: capitalize(v),
      value: v
    }));
  }, [listings]);

  /* ================= DELETE ================= */

  const deleteListing = async (id) => {
    if (!window.confirm("Delete this listing?")) return;

    try {
      await fetch(`${API_BASE}/delete_listing/${id}`, {
        method: "DELETE"
      });

      fetchListings();

    } catch (e) {
      console.error("Delete failed", e);
    }
  };

  /* ================= EDIT ================= */

  const openEditModal = (row) => {
    setEditingListing({
      id: row.id,
      availability_status: row.rawAvailability,
      price: row.price
    });
    setEditModal(true);
  };

  const saveEdit = async () => {
    try {
      await fetch(`${API_BASE}/edit_listing/${editingListing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          availability_status: editingListing.availability_status,
          price: editingListing.price
        })
      });

      setEditModal(false);
      fetchListings();

    } catch (e) {
      console.error("Edit failed", e);
    }
  };

  /* ================= TABLE ================= */

  const columns = [
    { header: 'Property', accessorKey: 'property' },
    { header: 'Unit', accessorKey: 'unit' },
    { header: 'Type', accessorKey: 'type' },
    { header: 'Price/Month', accessorKey: 'priceFormatted' },
    {
      header: 'Availability',
      accessorKey: 'availability',
      cell: (row) =>
        <span className="px-2 py-1 rounded text-xs bg-slate-100">
          {row.availability}
        </span>
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => <StatusBadge status={row.status} />
    }
  ];

  const actions = (row) =>
    <div className="flex gap-2 justify-end">
      <Button size="sm" variant="ghost" onClick={() => openEditModal(row)}>
        Edit
      </Button>

      <Button
        size="sm"
        variant="ghost"
        className="text-rose-600"
        onClick={() => deleteListing(row.id)}
      >
        Delete
      </Button>
    </div>;

  /* ================= UI ================= */

  return (
    <DashboardLayout>

      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Listings Management</h1>
          <p className="text-slate-500">Manage rental units and pricing.</p>
        </div>
        <Button>Create Listing</Button>
      </div>

      <div className="bg-white border rounded-lg shadow-sm">

        <div className="p-4 border-b flex gap-4 flex-wrap justify-between">
          <SearchInput
            className="w-72"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="flex gap-4">
            <FilterDropdown
              label="Type"
              options={typeOptions}
              value={typeFilter}
              onChange={setTypeFilter}
            />

            <FilterDropdown
              label="Availability"
              options={availabilityOptions}
              value={availabilityFilter}
              onChange={setAvailabilityFilter}
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredListings}
          actions={actions}
        />

        <Pagination
          currentPage={1}
          totalPages={1}
          totalItems={filteredListings.length}
          itemsPerPage={10}
          onPageChange={() => {}}
        />

      </div>

      {/* ================= EDIT MODAL ================= */}
      {editModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">

            <h2 className="text-lg font-semibold mb-4">Edit Listing</h2>

            <div className="space-y-3">

              <div>
                <label className="text-sm">Price</label>
                <input
                  className="w-full border rounded p-2"
                  value={editingListing.price}
                  onChange={e =>
                    setEditingListing({
                      ...editingListing,
                      price: Number(e.target.value)
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm">Availability</label>
                <select
                  className="w-full border rounded p-2"
                  value={editingListing.availability_status}
                  onChange={e =>
                    setEditingListing({
                      ...editingListing,
                      availability_status: e.target.value
                    })
                  }
                >
                  <option value="available">Available</option>
                  <option value="rented">Rented</option>
                </select>
              </div>

            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="ghost" onClick={() => setEditModal(false)}>
                Cancel
              </Button>
              <Button onClick={saveEdit}>
                Save Changes
              </Button>
            </div>

          </div>
        </div>
      )}

    </DashboardLayout>
  );
}