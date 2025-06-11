import React from 'react';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const CreateReportForm = ({
    newReport,
    onReportChange,
    reportTypes,
    availableMetrics,
    generateLoading,
    onCreate,
    onCancel,
}) => {
    return (
        <>
            <div className="p-6 space-y-6">
                {/* Report Name */}
                <FormField
                    label="Report Name"
                    type="text"
                    value={newReport.name}
                    onChange={(e) => onReportChange('name', e.target.value)}
                    placeholder="Enter report name"
                />

                {/* Report Type */}
                <div>
                    <Text as="label" className="block text-sm font-medium text-gray-700 mb-2">
                        Report Type
                    </Text>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {reportTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => onReportChange('type', type.id)}
                                className={`p-3 border rounded-lg text-left transition-all ${
                                    newReport.type === type.id
                                        ? 'border-primary bg-primary/10 text-primary'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className="flex items-center">
                                    <ApperIcon name={type.icon} size={16} className="mr-2" />
                                    <Text as="span" className="font-medium">{type.label}</Text>
                                </div>
                                <Text as="p" className="text-xs text-gray-500 mt-1">{type.description}</Text>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Date Range */}
                <FormField
                    label="Date Range"
                    type="select"
                    value={newReport.dateRange}
                    onChange={(e) => onReportChange('dateRange', e.target.value)}
                    options={[
                        { value: '7days', label: 'Last 7 days' },
                        { value: '30days', label: 'Last 30 days' },
                        { value: '90days', label: 'Last 90 days' },
                        { value: '1year', label: 'Last year' },
                    ]}
                />

                {/* Metrics */}
                <div>
                    <Text as="label" className="block text-sm font-medium text-gray-700 mb-2">
                        Metrics to Include
                    </Text>
                    <div className="grid grid-cols-2 gap-2">
                        {availableMetrics.map((metric) => (
                            <label key={metric.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={newReport.metrics.includes(metric.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            onReportChange('metrics', [...newReport.metrics, metric.id]);
                                        } else {
                                            onReportChange('metrics', newReport.metrics.filter(id => id !== metric.id));
                                        }
                                    }}
                                    className="rounded border-gray-300 text-primary focus:ring-primary mr-2"
                                />
                                <Text as="span" className="text-sm">{metric.label}</Text>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Schedule */}
                <FormField
                    label="Schedule"
                    type="select"
                    value={newReport.schedule}
                    onChange={(e) => onReportChange('schedule', e.target.value)}
                    options={[
                        { value: 'manual', label: 'Manual' },
                        { value: 'daily', label: 'Daily' },
                        { value: 'weekly', label: 'Weekly' },
                        { value: 'monthly', label: 'Monthly' },
                    ]}
                />
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <Button
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </Button>
                <Button
                    onClick={onCreate}
                    disabled={generateLoading}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {generateLoading ? (
                        <>
                            <ApperIcon name="Loader" size={16} className="inline mr-2 animate-spin" />
                            Creating...
                        </>
                    ) : (
                        'Create Report'
                    )}
                </Button>
            </div>
        </>
    );
};

CreateReportForm.propTypes = {
    newReport: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        dateRange: PropTypes.string.isRequired,
        metrics: PropTypes.arrayOf(PropTypes.string).isRequired,
        schedule: PropTypes.string.isRequired,
    }).isRequired,
    onReportChange: PropTypes.func.isRequired,
    reportTypes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    })).isRequired,
    availableMetrics: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    })).isRequired,
    generateLoading: PropTypes.bool.isRequired,
    onCreate: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default CreateReportForm;