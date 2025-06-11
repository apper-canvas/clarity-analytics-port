import React from 'react';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const UsersHeader = ({ filteredUserCount, totalUserCount, selectedUsersSize, onBulkAction }) => {
    return (
        <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                    <Text as="h1" className="text-xl font-semibold text-gray-900">Users</Text>
                    <Text as="p" className="text-gray-500 text-sm mt-1">
                        {filteredUserCount} of {totalUserCount} users
                    </Text>
                </div>
                {selectedUsersSize > 0 && (
                    <div className="flex items-center space-x-2">
                        <Text as="span" className="text-sm text-gray-500">
                            {selectedUsersSize} selected
                        </Text>
                        <Button
                            onClick={() => onBulkAction('export')}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Export
                        </Button>
                        <Button
                            onClick={() => onBulkAction('delete')}
                            className="px-3 py-1 text-sm bg-semantic-error text-white rounded-md hover:bg-semantic-error/90 transition-colors"
                        >
                            Delete
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

UsersHeader.propTypes = {
    filteredUserCount: PropTypes.number.isRequired,
    totalUserCount: PropTypes.number.isRequired,
    selectedUsersSize: PropTypes.number.isRequired,
    onBulkAction: PropTypes.func.isRequired,
};

export default UsersHeader;