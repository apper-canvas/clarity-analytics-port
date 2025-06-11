import React from 'react';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';

const UsersFiltersAndActions = ({ searchTerm, onSearchChange, filterPlan, onFilterPlanChange, onAddUser }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <ApperIcon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={onSearchChange}
                        className="pl-10 pr-4 py-2 text-sm w-64"
                    />
                </div>
                <Select
                    value={filterPlan}
                    onChange={onFilterPlanChange}
                    className="px-3 py-2 text-sm"
                >
                    <option value="all">All Plans</option>
                    <option value="Free">Free</option>
                    <option value="Pro">Pro</option>
                    <option value="Enterprise">Enterprise</option>
                </Select>
            </div>
            <Button
                onClick={onAddUser}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
                icon={ApperIcon.bind(null, { name: 'Plus' })}
            >
                Add User
            </Button>
        </div>
    );
};

UsersFiltersAndActions.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    filterPlan: PropTypes.string.isRequired,
    onFilterPlanChange: PropTypes.func.isRequired,
    onAddUser: PropTypes.func.isRequired,
};

export default UsersFiltersAndActions;