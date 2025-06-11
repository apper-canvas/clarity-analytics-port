import React from 'react';
import PropTypes from 'prop-types';
import FormField from '@/components/molecules/FormField';
import ToggleSwitch from '@/components/molecules/ToggleSwitch';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const SecuritySettingsForm = ({ settings, onUpdate, onSave, loading }) => {
    return (
        <div className="space-y-6">
            <div>
                <Text as="h3" className="text-lg font-medium text-gray-900 mb-4">Authentication</Text>
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3">
                        <div>
                            <Text as="p" className="text-sm font-medium text-gray-900">Two-Factor Authentication</Text>
                            <Text as="p" className="text-sm text-gray-500">Add an extra layer of security to your account</Text>
                        </div>
                        <div className="flex items-center space-x-3">
                            <ToggleSwitch
                                checked={settings.twoFactorAuth}
                                onChange={(e) => onUpdate('twoFactorAuth', e.target.checked)}
                                label="" // Label handled by parent div
                                description="" // Description handled by parent div
                            />
                            {settings.twoFactorAuth && (
                                <Button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                                    Configure
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
                <Text as="h3" className="text-lg font-medium text-gray-900 mb-4">Session Management</Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        label="Session Timeout"
                        type="select"
                        value={settings.sessionTimeout}
                        onChange={(e) => onUpdate('sessionTimeout', e.target.value)}
                        options={[
                            { value: '30min', label: '30 minutes' },
                            { value: '1hour', label: '1 hour' },
                            { value: '4hours', label: '4 hours' },
                            { value: '1day', label: '1 day' },
                            { value: 'never', label: 'Never' },
                        ]}
                    />
                </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
                <Text as="h3" className="text-lg font-medium text-gray-900 mb-4">Security Notifications</Text>
                <div className="space-y-4">
                    <ToggleSwitch
                        label="Login Notifications"
                        description="Get notified of new login attempts"
                        checked={settings.loginNotifications}
                        onChange={(e) => onUpdate('loginNotifications', e.target.checked)}
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    onClick={() => onSave('Security')}
                    disabled={loading}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </div>
    );
};

SecuritySettingsForm.propTypes = {
    settings: PropTypes.shape({
        twoFactorAuth: PropTypes.bool.isRequired,
        sessionTimeout: PropTypes.string.isRequired,
        loginNotifications: PropTypes.bool.isRequired,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default SecuritySettingsForm;