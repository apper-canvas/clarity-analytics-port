import React from 'react';
import PropTypes from 'prop-types';
import FormField from '@/components/molecules/FormField';
import ToggleSwitch from '@/components/molecules/ToggleSwitch';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const DashboardSettingsForm = ({ settings, onUpdate, onSave, loading }) => {
    const displayOptions = [
        { key: 'showTutorial', label: 'Show Tutorial', description: 'Display helpful tips and guidance' },
        { key: 'compactMode', label: 'Compact Mode', description: 'Reduce spacing for more data density' }
    ];

    return (
        <div className="space-y-6">
            <div>
                <Text as="h3" className="text-lg font-medium text-gray-900 mb-4">Default Preferences</Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        label="Default Date Range"
                        type="select"
                        value={settings.defaultDateRange}
                        onChange={(e) => onUpdate('defaultDateRange', e.target.value)}
                        options={[
                            { value: '7days', label: 'Last 7 days' },
                            { value: '30days', label: 'Last 30 days' },
                            { value: '90days', label: 'Last 90 days' },
                        ]}
                    />
                    <FormField
                        label="Auto Refresh Interval"
                        type="select"
                        value={settings.refreshInterval}
                        onChange={(e) => onUpdate('refreshInterval', e.target.value)}
                        options={[
                            { value: 'never', label: 'Never' },
                            { value: '1min', label: '1 minute' },
                            { value: '5min', label: '5 minutes' },
                            { value: '15min', label: '15 minutes' },
                            { value: '30min', label: '30 minutes' },
                        ]}
                    />
                    <FormField
                        label="Default Chart Type"
                        type="select"
                        value={settings.chartType}
                        onChange={(e) => onUpdate('chartType', e.target.value)}
                        options={[
                            { value: 'line', label: 'Line Chart' },
                            { value: 'area', label: 'Area Chart' },
                            { value: 'bar', label: 'Bar Chart' },
                        ]}
                    />
                </div>
            </div>

<div className="pt-6 border-t border-gray-200">
                <Text as="h3" className="text-lg font-medium text-gray-900 mb-4">Display Options</Text>
                <div className="space-y-4">
                    {displayOptions?.map((item) => (
                        <ToggleSwitch
                            key={item.key}
                            label={item.label}
                            description={item.description}
                            checked={settings?.[item.key] || false}
                            onChange={(e) => onUpdate(item.key, e.target.checked)}
                        />
                    )) || null}
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    onClick={() => onSave('Dashboard')}
                    disabled={loading}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </div>
    );
};

DashboardSettingsForm.propTypes = {
    settings: PropTypes.shape({
        defaultDateRange: PropTypes.string.isRequired,
        refreshInterval: PropTypes.string.isRequired,
        chartType: PropTypes.string.isRequired,
        showTutorial: PropTypes.bool.isRequired,
        compactMode: PropTypes.bool.isRequired,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default DashboardSettingsForm;