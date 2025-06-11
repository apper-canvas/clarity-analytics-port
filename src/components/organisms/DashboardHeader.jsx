import React from 'react';
import PropTypes from 'prop-types';
import Select from '@/components/atoms/Select';
import Text from '@/components/atoms/Text';

const DashboardHeader = ({ dateRange, onDateRangeChange }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
                <Text as="h1" className="text-2xl font-semibold text-gray-900">Dashboard Overview</Text>
                <Text as="p" className="text-gray-500 mt-1">Monitor your key metrics and user activity</Text>
            </div>
            <Select
                value={dateRange}
                onChange={(e) => onDateRangeChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            >
                <option value="1day">Today</option>
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
            </Select>
        </div>
    );
};

DashboardHeader.propTypes = {
    dateRange: PropTypes.string.isRequired,
    onDateRangeChange: PropTypes.func.isRequired,
};

export default DashboardHeader;