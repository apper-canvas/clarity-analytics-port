import React from 'react';
import PropTypes from 'prop-types';
import ToggleSwitch from '@/components/molecules/ToggleSwitch';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const NotificationSettingsForm = ({ settings, onUpdate, onSave, loading }) => {
    const emailNotifications = [
        { key: 'emailReports', label: 'Email Reports', description: 'Receive scheduled reports via email' },
        { key: 'alertThresholds', label: 'Alert Thresholds', description: 'Get notified when metrics exceed thresholds' },
        { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Summary of key metrics every week' },
        { key: 'systemUpdates', label: 'System Updates', description: 'Product updates and maintenance notifications' }
    ];

    return (
        <div className="space-y-6">
            <div>
                <Text as="h3" className="text-lg font-medium text-gray-900 mb-4">Email Notifications</Text>
                <div className="space-y-4">
                    {emailNotifications.map((item) => (
                        <ToggleSwitch
                            key={item.key}
                            label={item.label}
                            description={item.description}
                            checked={settings[item.key]}
                            onChange={(e) => onUpdate(item.key, e.target.checked)}
                        />
                    ))}
                </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
                <Text as="h3" className="text-lg font-medium text-gray-900 mb-4">Integration Alerts</Text>
                <div className="space-y-4">
                    <ToggleSwitch
                        label="Slack Integration"
                        description="Send alerts to Slack channels"
                        checked={settings.slackIntegration}
                        onChange={(e) => onUpdate('slackIntegration', e.target.checked)}
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    onClick={() => onSave('Notification')}
                    disabled={loading}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </div>
    );
};

NotificationSettingsForm.propTypes = {
    settings: PropTypes.shape({
        emailReports: PropTypes.bool.isRequired,
        alertThresholds: PropTypes.bool.isRequired,
        weeklyDigest: PropTypes.bool.isRequired,
        systemUpdates: PropTypes.bool.isRequired,
        slackIntegration: PropTypes.bool.isRequired,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default NotificationSettingsForm;