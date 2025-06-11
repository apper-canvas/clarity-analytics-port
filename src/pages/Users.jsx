import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';
import { userService } from '../services';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const Users = () => {
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

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
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
  };

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
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map(user => user.id)));
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedUsers.size === 0) {
      toast.warning('Please select users first');
      return;
    }

    try {
      const userList = Array.from(selectedUsers);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-semantic-success text-white';
      case 'inactive': return 'bg-gray-400 text-white';
      case 'trial': return 'bg-semantic-warning text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const SkeletonRow = () => (
    <tr className="border-b border-gray-200">
      <td className="px-6 py-4">
        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-1 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div>
      </td>
    </tr>
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="h-10 bg-gray-200 rounded w-64 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    {[...Array(7)].map((_, i) => (
                      <th key={i} className="px-6 py-3 text-left">
                        <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, i) => (
                    <SkeletonRow key={i} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <ApperIcon name="AlertCircle" size={48} className="mx-auto text-semantic-error mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to Load Users</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={loadUsers}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full overflow-hidden">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Users</h1>
              <p className="text-gray-500 text-sm mt-1">
                {filteredUsers.length} of {users.length} users
              </p>
            </div>
            {selectedUsers.size > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {selectedUsers.size} selected
                </span>
                <button
                  onClick={() => handleBulkAction('export')}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Export
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1 text-sm bg-semantic-error text-white rounded-md hover:bg-semantic-error/90 transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <ApperIcon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm w-64"
                />
              </div>
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              >
                <option value="all">All Plans</option>
                <option value="Free">Free</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm">
              <ApperIcon name="Plus" size={16} className="inline mr-2" />
              Add User
            </button>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <ApperIcon name="Users" size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || filterPlan !== 'all' ? 'No users found' : 'No users yet'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || filterPlan !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Users will appear here as they sign up'
                }
              </p>
              {(searchTerm || filterPlan !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterPlan('all');
                  }}
                  className="px-4 py-2 text-primary hover:text-primary/80 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedUsers.size === filteredUsers.length}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center">
                          User
                          <ApperIcon 
                            name={sortField === 'name' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                            size={14} 
                            className="ml-1" 
                          />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                        onClick={() => handleSort('plan')}
                      >
                        <div className="flex items-center">
                          Plan
                          <ApperIcon 
                            name={sortField === 'plan' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                            size={14} 
                            className="ml-1" 
                          />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                        onClick={() => handleSort('revenue')}
                      >
                        <div className="flex items-center">
                          Revenue
                          <ApperIcon 
                            name={sortField === 'revenue' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                            size={14} 
                            className="ml-1" 
                          />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                        onClick={() => handleSort('signupDate')}
                      >
                        <div className="flex items-center">
                          Joined
                          <ApperIcon 
                            name={sortField === 'signupDate' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                            size={14} 
                            className="ml-1" 
                          />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedUsers.has(user.id)}
                            onChange={() => handleSelectUser(user.id)}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <ApperIcon name="User" size={14} className="text-primary" />
                            </div>
                            <div className="ml-3 min-w-0">
                              <p className="text-sm font-medium text-gray-900 break-words">{user.name}</p>
                              <p className="text-sm text-gray-500 break-words">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-900">{user.plan}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-900">${user.revenue.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">
                            {format(new Date(user.signupDate), 'MMM dd, yyyy')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="text-primary hover:text-primary/80 transition-colors"
                          >
                            <ApperIcon name="Eye" size={16} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-500">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} results
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ApperIcon name="ChevronLeft" size={16} />
                    </button>
                    <span className="px-3 py-2 text-sm">
                      {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ApperIcon name="ChevronRight" size={16} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">User Details</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ApperIcon name="X" size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Basic Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-400">Name</label>
                      <p className="text-sm text-gray-900 break-words">{selectedUser.name}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Email</label>
                      <p className="text-sm text-gray-900 break-words">{selectedUser.email}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Plan</label>
                      <p className="text-sm text-gray-900">{selectedUser.plan}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedUser.status)}`}>
                        {selectedUser.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Account Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-400">Revenue</label>
                      <p className="text-sm text-gray-900">${selectedUser.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Signup Date</label>
                      <p className="text-sm text-gray-900">
                        {format(new Date(selectedUser.signupDate), 'MMMM dd, yyyy')}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Last Active</label>
                      <p className="text-sm text-gray-900">
                        {format(new Date(selectedUser.lastActive), 'MMMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Users;