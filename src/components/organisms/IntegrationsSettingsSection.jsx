import React from 'react';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const IntegrationsSettingsSection = ({ settings, onSave, loading }) => {
    const integrations = [
        {
            name: 'Slack',
            description: 'Send alerts and reports to Slack channels',
            icon: 'MessageSquare',
            connected: settings.slack.connected,
            key: 'slack'
        },
        {
            name: 'Zapier',
            description: 'Automate workflows with 3000+ apps',
            icon: 'Zap',
            connected: settings.zapier.connected,
            key: 'zapier'
        },
        {
            name: 'Webhook',
            description: 'Send data to custom endpoints',
            icon: 'Link',
            connected: !!settings.webhook.url,
            key: 'webhook'
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <Text as="h3" className="text-lg font-medium text-gray-900 mb-4">Available Integrations</Text>
                <div className="space-y-4">
                    {integrations.map((integration) => (
                        <div key={integration.key} className="border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <ApperIcon name={integration.icon} size={20} className="text-gray-600" />
                                    </div>
                                    <div className="ml-4">
                                        <Text as="h4" className="text-sm font-medium text-gray-900">{integration.name}</Text>
                                        <Text as="p" className="text-sm text-gray-500">{integration.description}</Text>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    {integration.connected && (
                                        <Badge colorClass="bg-semantic-success/10 text-semantic-success">
                                            Connected
                                        </Badge>
                                    )}
                                    <Button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                                        {integration.connected ? 'Configure' : 'Connect'}
                                    </Button>
                                </div>
                            </div>
                            {integration.connected && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <Text as="p" className="text-xs text-gray-500">
                                        Last sync: {new Date().toLocaleString()}
                                    </Text>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
                <Text as="h3" className="text-lg font-medium text-gray-900 mb-4">API Access</Text>
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Text as="p" className="text-sm font-medium text-gray-900">API Key</Text>
                            <Text as="p" className="text-sm text-gray-500">Use this key to access the Clarity Analytics API</Text>
                        </div>
                        <Button className="px-3 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                            Generate New Key
                        </Button>
                    </div>
                    <div className="mt-3">
                        <code className="text-xs bg-white px-2 py-1 rounded border break-all">
                            ca_sk_1234567890abcdef...
                        </code>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    onClick={() => onSave('Integration')}
                    disabled={loading}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </div>
    );
};

IntegrationsSettingsSection.propTypes = {
    settings: PropTypes.shape({
        slack: PropTypes.shape({ connected: PropTypes.bool.isRequired }).isRequired,
        zapier: PropTypes.shape({ connected: PropTypes.bool.isRequired }).isRequired,
        webhook: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default IntegrationsSettingsSection;