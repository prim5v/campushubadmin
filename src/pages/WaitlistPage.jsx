import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';

export function WaitlistPage() {
  const [waitlist, setWaitlist] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    campus: "",
    location: "",
    minBudget: "",
    maxBudget: ""
  });
  const [statusFilter, setStatusFilter] = useState("");
  const [sort, setSort] = useState({ field: "created_at", order: "desc" });
  const [selected, setSelected] = useState([]);

  // 🔥 FETCH DATA (fixed)
  useEffect(() => {
    const fetchWaitlist = async () => {
      try {
        const res = await axios.get(
          'https://campushub4293.pythonanywhere.com/admin/get_waitlist'
        );
        setWaitlist(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWaitlist();
  }, []);

  // 🔍 FILTER + SEARCH
  const filteredData = waitlist.filter(user => {
    const matchesSearch =
      user.full_name.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search) ||
      user.campus.toLowerCase().includes(search.toLowerCase());

    return (
      matchesSearch &&
      (!filters.campus || user.campus.toLowerCase().includes(filters.campus.toLowerCase())) &&
      (!filters.location || user.preferred_location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.minBudget || user.budget >= Number(filters.minBudget)) &&
      (!filters.maxBudget || user.budget <= Number(filters.maxBudget)) &&
      (!statusFilter || user.status === statusFilter)
    );
  });

  // 🔄 SORTING
  const sortedData = [...filteredData].sort((a, b) => {
    if (sort.field === "budget") {
      return sort.order === "asc"
        ? a.budget - b.budget
        : b.budget - a.budget;
    }

    if (sort.field === "created_at") {
      return sort.order === "asc"
        ? new Date(a.created_at) - new Date(b.created_at)
        : new Date(b.created_at) - new Date(a.created_at);
    }

    return 0;
  });

  // ✅ SELECTION
  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  // 🔥 BULK ACTION
  const markAsContacted = () => {
    setWaitlist(prev =>
      prev.map(user =>
        selected.includes(user.id)
          ? { ...user, status: "contacted" }
          : user
      )
    );
  };

  // 📥 EXPORT CSV
  const exportCSV = () => {
    const csv = Papa.unparse(sortedData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "waitlist.csv";
    link.click();
  };

  // 📄 EXPORT PDF
  const exportPDF = () => {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [["Name", "Phone", "Campus", "Budget"]],
      body: sortedData.map(u => [
        u.full_name,
        u.phone,
        u.campus,
        u.budget
      ])
    });

    doc.save("waitlist.pdf");
  };

  // 🖨️ PRINT
  const handlePrint = () => {
    window.print();
  };

  // 📊 COUNTS
  const totalCount = waitlist.length;
  const filteredCount = sortedData.length;

  // 📋 TABLE COLUMNS
  const columns = [
    {
      header: "",
      accessorKey: "id",
      cell: row => (
        <input
          type="checkbox"
          checked={selected.includes(row.id)}
          onChange={() => toggleSelect(row.id)}
        />
      )
    },
    { header: 'Name', accessorKey: 'full_name' },
    { header: 'Phone', accessorKey: 'phone' },
    { header: 'Campus', accessorKey: 'campus' },
    { header: 'Budget', accessorKey: 'budget' },
    { header: 'Location', accessorKey: 'preferred_location' },
    { header: 'Move-in Date', accessorKey: 'preferred_move_in_date' },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: row => <StatusBadge status={row.status} />
    }
  ];

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Waitlist Users</h1>

      {/* 🔍 SEARCH */}
      <input
        placeholder="Search name, phone, campus..."
        className="border p-2 rounded w-full mb-4"
        onChange={e => setSearch(e.target.value)}
      />

      {/* 🎯 FILTERS */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input placeholder="Campus" className="border p-2 rounded"
          onChange={e => setFilters({ ...filters, campus: e.target.value })} />

        <input placeholder="Location" className="border p-2 rounded"
          onChange={e => setFilters({ ...filters, location: e.target.value })} />

        <input type="number" placeholder="Min Budget" className="border p-2 rounded"
          onChange={e => setFilters({ ...filters, minBudget: e.target.value })} />

        <input type="number" placeholder="Max Budget" className="border p-2 rounded"
          onChange={e => setFilters({ ...filters, maxBudget: e.target.value })} />

        <select onChange={e => setStatusFilter(e.target.value)} className="border p-2 rounded">
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
        </select>
      </div>

      {/* 🔄 SORT */}
      <div className="flex gap-4 mb-4">
        <select onChange={e => setSort({ ...sort, field: e.target.value })} className="border p-2 rounded">
          <option value="created_at">Newest</option>
          <option value="budget">Budget</option>
        </select>

        <select onChange={e => setSort({ ...sort, order: e.target.value })} className="border p-2 rounded">
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {/* ⚡ ACTIONS */}
      <div className="flex gap-3 mb-4">
        <button onClick={markAsContacted} className="bg-indigo-600 text-white px-4 py-2 rounded">
          Mark as Contacted
        </button>

        <button onClick={exportCSV} className="bg-blue-600 text-white px-4 py-2 rounded">
          Export CSV
        </button>

        <button onClick={exportPDF} className="bg-emerald-600 text-white px-4 py-2 rounded">
          Export PDF
        </button>

        <button onClick={handlePrint} className="border px-4 py-2 rounded">
          Print
        </button>
      </div>

      {/* 📊 COUNTS */}
      <div className="flex justify-between mb-4 text-sm text-slate-600">
        <div>Total: <strong>{totalCount}</strong></div>
        <div>Filtered: <strong>{filteredCount}</strong></div>
        <div>Selected: <strong>{selected.length}</strong></div>
      </div>

      {/* 📋 TABLE */}
      <DataTable columns={columns} data={sortedData} />
    </DashboardLayout>
  );
}