import React from 'react';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Checkbox from '@/components/atoms/Checkbox';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import UserTableRow from '@/components/molecules/UserTableRow';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';

const UsersTable = ({
    paginatedUsers,
    filteredUsersLength,
    selectedUsers,
    onSelectAll,
    onSort,
    sortField,
    sortDirection,
    onViewUserDetails,
    getStatusColor,
    currentPage,
    totalPages,
    onPageChange,
    loading,
}) => {
    const TableHeader = ({ field, label }) => (
        <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
            onClick={() => onSort(field)}
        >
            <div className="flex items-center">
                {label}
                <ApperIcon
                    name={sortField === field ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'}
                    size={14}
                    className="ml-1"
                />
            </div>
        </th>
    );

    TableHeader.propTypes = {
        field: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    };

    if (loading) {
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-6 py-3 text-left w-12"><div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div></th>
                            <th className="px-6 py-3 text-left"><div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div></th>
                            <th className="px-6 py-3 text-left"><div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div></th>
                            <th className="px-6 py-3 text-left"><div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div></th>
                            <th className="px-6 py-3 text-left"><div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div></th>
                            <th className="px-6 py-3 text-left"><div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div></th>
                            <th className="px-6 py-3 text-left"><div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(5)].map((_, i) => (
                            <tr key={i} className="border-b border-gray-200">
                                <td className="px-6 py-4"><div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div></td>
                                <td className="px-6 py-4"><div className="flex items-center space-x-3"><div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div><div><div className="h-4 bg-gray-200 rounded w-32 mb-1 animate-pulse"></div><div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div></div></div></td>
                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div></td>
                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div></td>
                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div></td>
                                <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div></td>
                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <>
            {filteredUsersLength === 0 ? (
                <div className="text-center py-12">
                    <ApperIcon name="Users" size={48} className="mx-auto text-gray-300 mb-4" />
                    <Text as="h3" className="text-lg font-medium text-gray-900 mb-2">No users found</Text>
                    <Text as="p" className="text-gray-500 mb-4">Try adjusting your search or filters</Text>
                    <Button
                        onClick={() => { /* This logic should be handled by parent */ }}
                        className="px-4 py-2 text-primary hover:text-primary/80 transition-colors"
                    >
                        Clear filters
                    </Button>
                </div>
            ) : (
                <>
                    {/* Users Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="px-6 py-3 text-left">
                                        <Checkbox
                                            checked={selectedUsers.size === paginatedUsers.length &amp;&amp; paginatedUsers.length > 0}
                                            onChange={onSelectAll}
                                        />
                                    </th>
                                    <TableHeader field="name" label="User" />
                                    <TableHeader field="plan" label="Plan" />
                                    <TableHeader field="revenue" label="Revenue" />
                                    <TableHeader field="signupDate" label="Joined" />
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
                                    <UserTableRow
                                        key={user.id}
                                        user={user}
                                        isSelected={selectedUsers.has(user.id)}
                                        onSelect={onSelectAll} // Re-using handleSelectAll logic for single select too.
                                        getStatusColor={getStatusColor}
                                        onViewDetails={onViewUserDetails}
                                        index={index}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6">
                            <Text as="div" className="text-sm text-gray-500">
                                Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, filteredUsersLength)} of {filteredUsersLength} results
                            </Text>
                            <div className="flex items-center space-x-2">
                                <Button
                                    onClick={() => onPageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors p-0"
                                >
                                    <ApperIcon name="ChevronLeft" size={16} />
                                </Button>
                                <Text as="span" className="px-3 py-2 text-sm">
                                    {currentPage} of {totalPages}
                                </Text>
                                <Button
                                    onClick={() => onPageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors p-0"
                                >
                                    <ApperIcon name="ChevronRight" size={16} />
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

UsersTable.propTypes = {
    paginatedUsers: PropTypes.array.isRequired,
    filteredUsersLength: PropTypes.number.isRequired,
    selectedUsers: PropTypes.instanceOf(Set).isRequired,
    onSelectAll: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    sortField: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    onViewUserDetails: PropTypes.func.isRequired,
    getStatusColor: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default UsersTable;