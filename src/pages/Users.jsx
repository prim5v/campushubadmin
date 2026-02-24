import React, { useEffect, useState, useMemo } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { FilterDropdown } from '../components/ui/FilterDropdown';
import { Modal } from '../components/ui/Modal';
import { Pagination } from '../components/ui/Pagination';
import { Eye, Edit, Ban, CheckCircle } from 'lucide-react';

export function Users() {
  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false); // user details
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false); // activate/deactivate
  const [selectedUser, setSelectedUser] = useState(null);

  /* =========================
     FETCH USERS FROM BACKEND
  ========================== */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          'https://campushub4293.pythonanywhere.com/admin/get_all_users',
          { credentials: 'include' }
        );
        const data = await res.json();

        setUsersCount(data.users_count);

        const mappedUsers = data.users.map((u) => ({
          id: u.user_id,
          name: u.username,
          email: u.email,
          phone: u.phone,
          role: u.role,
          status: u.is_active ? 'active' : 'inactive',
          joined: new Date(u.created_at).toISOString().split('T')[0],
          profile_image: u.profile_image,
          security_checks: u.security_checks
        }));

        setUsers(mappedUsers);
      } catch (err) {
        console.error('Failed to fetch users', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /* =========================
     ACTIVATE / DEACTIVATE API
  ========================== */
  const handleStatusConfirm = async () => {
    if (!selectedUser) return;

    const newStatus = selectedUser.status === 'active' ? 0 : 1;
    

    try {
      await fetch(
        'https://campushub4293.pythonanywhere.com/admin/set_status',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            user_id: selectedUser.id,
            is_active: newStatus
          })
        }
      );

      // update UI locally
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id
            ? { ...u, status: newStatus === 1 ? 'active' : 'inactive' }
            : u
        )
      );

      setSelectedUser((prev) => ({
        ...prev,
        status: newStatus === 1 ? 'active' : 'inactive'
      }));

      setIsStatusModalOpen(false);
    } catch (err) {
      console.error('Failed to update user status', err);
    }
  };

  /* =========================
     FILTER + SEARCH
  ========================== */
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole = filterRole ? u.role === filterRole : true;
      const matchesStatus = filterStatus ? u.status === filterStatus : true;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, filterRole, filterStatus]);

  /* =========================
     TABLE CONFIG
  ========================== */
  const columns = [
    { header: 'Name', accessorKey: 'name', className: 'font-medium text-slate-900' },
    { header: 'Email', accessorKey: 'email' },
    {
      header: 'Role',
      accessorKey: 'role',
      cell: (row) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">
          {row.role}
        </span>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'verifications',
      accessorKey: 'security_checks',
      sector: 'security_checks',
cell: (row) => {
  const status = row.security_checks?.[0]?.status;

  if (status === 'verified') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
        Verified
      </span>
    );
  }

  if (status === 'unverified') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
        Unverified
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
      Pending
    </span>
  );
}

    },
    { header: 'Joined', accessorKey: 'joined', className: 'text-slate-500' }
  ];

  const actions = (row) => (
    <div className="flex justify-end gap-2">
      <Button
        variant="ghost"
        size="sm"
        className="p-1 h-8 w-8"
        title="View Details"
        onClick={() => {
          setSelectedUser(row);
          setIsModalOpen(true);
        }}
      >
        <Eye className="w-4 h-4" />
      </Button>

      {row.status === 'active' ? (
        <Button
          variant="ghost"
          size="sm"
          className="p-1 h-8 w-8 text-rose-600 hover:bg-rose-50"
          title="Deactivate"
          onClick={() => {
            setSelectedUser(row);
            setIsStatusModalOpen(true);
          }}
        >
          <Ban className="w-4 h-4" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="p-1 h-8 w-8 text-emerald-600 hover:bg-emerald-50"
          title="Activate"
          onClick={() => {
            setSelectedUser(row);
            setIsStatusModalOpen(true);
          }}
        >
          <CheckCircle className="w-4 h-4" />
        </Button>
      )}
    </div>
  );

  /* =========================
     RENDER
  ========================== */
  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-slate-500">Total users: {usersCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-4 border-b flex gap-4 flex-wrap">
          <SearchInput
            className="w-72"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <FilterDropdown
            label="Role"
            options={[
              { label: 'Admin', value: 'admin' },
              { label: 'Landlord', value: 'landlord' },
              { label: 'Comrade', value: 'comrade' }
            ]}
            value={filterRole}
            onChange={setFilterRole}
          />

          <FilterDropdown
            label="Status"
            options={[
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' }
            ]}
            value={filterStatus}
            onChange={setFilterStatus}
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredUsers}
          actions={actions}
          loading={loading}
        />

        <Pagination
          currentPage={1}
          totalPages={1}
          totalItems={filteredUsers.length}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      </div>

      {/* USER DETAILS MODAL (UNCHANGED) */}
 <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="User Details"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex gap-4 items-center">
              {selectedUser.profile_image && (
                <img
                  src={selectedUser.profile_image}
                  alt="profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                <p className="text-slate-500">{selectedUser.email}</p>
                <p className="text-slate-500">{selectedUser.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-500">Role</span>
                <p className="font-medium">{selectedUser.role}</p>
              </div>
              <div>
                <span className="text-slate-500">Status</span>
                <StatusBadge status={selectedUser.status} />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Security Checks</h4>
              {selectedUser.security_checks?.length ? (
                selectedUser.security_checks.map((sc) => (
                  <div
                    key={sc.id}
                    className="border rounded p-3 mb-2 text-sm"
                  >
                    <p><strong>Type:</strong> {sc.check_type}</p>
                    <p><strong>ID Number:</strong> {sc.id_number}</p>
                    <p><strong>Status:</strong> {sc.status}</p>
                    <p><strong>Reviewed By:</strong> {sc.reviewed_by || '—'}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-sm">
                  No security checks available.
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* ACTIVATE / DEACTIVATE CONFIRM MODAL */}
      <Modal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        title={selectedUser?.status === 'active' ? 'Deactivate User' : 'Activate User'}
        footer={
          <>
            <Button
              variant={selectedUser?.status === 'active' ? 'danger' : 'primary'}
              onClick={handleStatusConfirm}
            >
              Confirm
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsStatusModalOpen(false)}
            >
              Cancel
            </Button>
          </>
        }
      >
        <p className="text-slate-600">
          Are you sure you want to{' '}
          {selectedUser?.status === 'active' ? 'deactivate' : 'activate'}
          <span className="font-semibold text-slate-900">
            {' '}
            {selectedUser?.name}
          </span>
          ?
          {selectedUser?.status === 'active' &&
            ' This will prevent them from logging in.'}
        </p>
      </Modal>
    </DashboardLayout>
  );
}
