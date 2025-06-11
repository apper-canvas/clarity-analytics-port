import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { userService } from '@/services';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import Card from '@/components/atoms/Card';
import UsersHeader from '@/components/organisms/UsersHeader';
import UsersFiltersAndActions from '@/components/organisms/UsersFiltersAndActions';
import UsersTable from '@/components/organisms/UsersTable';
import Modal from '@/components/molecules/Modal';
import UserDetailModalContent from '@/components/organisms/UserDetailModalContent';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('signupDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterPlan, setFilterPlan] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const itemsPerPage = 10;

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Failed to load users');
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectUser = (userId) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

const handleSelectAll = () => {
    if (selectedUsers.size === paginatedUsers.length && paginatedUsers.length > 0) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(paginatedUsers.map(user => user.id)));
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedUsers.size === 0) {
      toast.warning('Please select users first');
      return;
    }

    try {
      // Simulate bulk action
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (action === 'delete') {
        const updatedUsers = users.filter(user => !selectedUsers.has(user.id));
        setUsers(updatedUsers);
        toast.success(`Deleted ${selectedUsers.size} users`);
      } else if (action === 'export') {
        toast.success(`Exported ${selectedUsers.size} users`);
      }

      setSelectedUsers(new Set());
    } catch (err) {
      toast.error(`Failed to ${action} users`);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleAddUser = () => {
    toast.info('Add User functionality coming soon!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-semantic-success text-white';
      case 'inactive': return 'bg-gray-400 text-white';
      case 'trial': return 'bg-semantic-warning text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const filteredUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlan = filterPlan === 'all' || user.plan === filterPlan;
      return matchesSearch && matchesPlan;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'signupDate' || sortField === 'lastActive') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterPlan('all');
  };

  if (loading) {
    return (
      <div className="p-6">
        <Card>
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
          <div className="p-6">
            <LoadingSpinner message="Loading users..." />
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage
          title="Failed to Load Users"
          message={error}
          onRetry={loadUsers}
        />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full overflow-hidden">
      <Card>
        <UsersHeader
          filteredUserCount={filteredUsers.length}
          totalUserCount={users.length}
          selectedUsersSize={selectedUsers.size}
          onBulkAction={handleBulkAction}
        />
        <div className="p-6">
          <UsersFiltersAndActions
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            filterPlan={filterPlan}
            onFilterPlanChange={(e) => setFilterPlan(e.target.value)}
            onAddUser={handleAddUser}
          />
          <UsersTable
            paginatedUsers={paginatedUsers}
            filteredUsersLength={filteredUsers.length}
            selectedUsers={selectedUsers}
            onSelectAll={handleSelectAll}
            onSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
            onViewUserDetails={setSelectedUser}
            getStatusColor={getStatusColor}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
{filteredUsers.length === 0 && (searchTerm || filterPlan !== 'all') && (
            <div className="text-center mt-4">
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-primary hover:text-primary/80 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </Card>

      <Modal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="User Details"
      >
        <UserDetailModalContent user={selectedUser} getStatusColor={getStatusColor} />
      </Modal>
    </div>
  );
};

export default UsersPage;