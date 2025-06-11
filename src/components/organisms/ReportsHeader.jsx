import React from 'react';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const ReportsHeader = ({ onCreateReport }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
                <Text as="h1" className="text-2xl font-semibold text-gray-900">Reports</Text>
                <Text as="p" className="text-gray-500 mt-1">Create and manage your analytics reports</Text>
            </div>
            <Button
                onClick={onCreateReport}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                icon={ApperIcon.bind(null, { name: 'Plus' })}
            >
                Create Report
            </Button>
        </div>
    );
};

ReportsHeader.propTypes = {
    onCreateReport: PropTypes.func.isRequired,
};

export default ReportsHeader;