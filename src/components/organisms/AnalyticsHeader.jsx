import React from 'react';
import PropTypes from 'prop-types';
import Select from '@/components/atoms/Select';
import Text from '@/components/atoms/Text';

const AnalyticsHeader = ({ chartType, onChartTypeChange, dateRange, onDateRangeChange }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
                <Text as="h1" className="text-2xl font-semibold text-gray-900">Analytics</Text>
                <Text as="p" className="text-gray-500 mt-1">Deep dive into your metrics and trends</Text>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Select
                    value={chartType}
                    onChange={(e) => onChartTypeChange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                >
                    <option value="line">Line Chart</option>
                    <option value="area">Area Chart</option>
                    <option value="bar">Bar Chart</option>
                </Select>
                <Select
                    value={dateRange}
                    onChange={(e) => onDateRangeChange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                >
                    <option value="7days">Last 7 days</option>
                    <option value="30days">Last 30 days</option>
                    <option value="90days">Last 90 days</option>
                </Select>
            </div>
        </div>
    );
};

AnalyticsHeader.propTypes = {
    chartType: PropTypes.string.isRequired,
    onChartTypeChange: PropTypes.func.isRequired,
    dateRange: PropTypes.string.isRequired,
    onDateRangeChange: PropTypes.func.isRequired,
};

export default AnalyticsHeader;