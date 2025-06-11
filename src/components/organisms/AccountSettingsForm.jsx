import React from 'react';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const AccountSettingsForm = ({ settings, onUpdate, onSave, loading }) => {
    return (
        <div className="space-y-6">
            <div>
                <Text as="h3" className="text-lg font-medium text-gray-900 mb-4">Profile Information</Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        label="Full Name"
                        type="text"
                        value={settings.name}
                        onChange={(e) => onUpdate('name', e.target.value)}
                    />
                    <FormField
                        label="Email Address"
                        type="email"
                        value={settings.email}
                        onChange={(e) => onUpdate('email', e.target.value)}
                    />
                    <FormField
                        label="Timezone"
                        type="select"
                        value={settings.timezone}
                        onChange={(e) => onUpdate('timezone', e.target.value)}
                        options={[
                            { value: 'UTC-5', label: 'Eastern Time (UTC-5)' },
                            { value: 'UTC-6', label: 'Central Time (UTC-6)' },
                            { value: 'UTC-7', label: 'Mountain Time (UTC-7)' },
                            { value: 'UTC-8', label: 'Pacific Time (UTC-8)' },
                            { value: 'UTC+0', label: 'UTC' },
                        ]}
                    />
                    <FormField
                        label="Language"
                        type="select"
                        value={settings.language}
                        onChange={(e) => onUpdate('language', e.target.value)}
                        options={[
                            { value: 'en', label: 'English' },
                            { value: 'es', label: 'Spanish' },
                            { value: 'fr', label: 'French' },
                            { value: 'de', label: 'German' },
                        ]}
                    />
                </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
                <Text as="h3" className="text-lg font-medium text-gray-900 mb-4">Profile Picture</Text>
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <ApperIcon name="User" size={24} className="text-primary" />
                    </div>
                    <div>
                        <Button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm">
                            Upload Photo
                        </Button>
                        <Text as="p" className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</Text>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    onClick={() => onSave('Account')}
                    disabled={loading}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </div>
    );
};

AccountSettingsForm.propTypes = {
    settings: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        timezone: PropTypes.string.isRequired,
        language: PropTypes.string.isRequired,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default AccountSettingsForm;