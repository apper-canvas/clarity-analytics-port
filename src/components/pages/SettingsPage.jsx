import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import SettingsSidebar from '@/components/organisms/SettingsSidebar';
import AccountSettingsForm from '@/components/organisms/AccountSettingsForm';
import NotificationSettingsForm from '@/components/organisms/NotificationSettingsForm';
import DashboardSettingsForm from '@/components/organisms/DashboardSettingsForm';
import SecuritySettingsForm from '@/components/organisms/SecuritySettingsForm';
import IntegrationsSettingsSection from '@/components/organisms/IntegrationsSettingsSection';
import Text from '@/components/atoms/Text';
import Card from '@/components/atoms/Card';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    account: {
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'Admin',
      avatar: '',
      timezone: 'UTC-5',
      language: 'en'
    },
    notifications: {
      emailReports: true,
      alertThresholds: true,
      weeklyDigest: false,
      systemUpdates: true,
      slackIntegration: false
    },
    dashboard: {
      defaultDateRange: '30days',
      refreshInterval: '5min',
      chartType: 'line',
      showTutorial: true,
      compactMode: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '1hour',
      loginNotifications: true,
      ipWhitelist: []
    },
    integrations: {
      slack: { connected: false, webhook: '' },
      zapier: { connected: false, apiKey: '' },
      webhook: { url: '', secret: '' }
    }
  });

  const tabs = [
    { id: 'account', label: 'Account', icon: 'User' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'integrations', label: 'Integrations', icon: 'Zap' }
  ];

  const handleSave = async (section) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`${section} settings saved successfully`);
    } catch (err) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <AccountSettingsForm
            settings={settings.account}
            onUpdate={(key, value) => updateSettings('account', key, value)}
            onSave={handleSave}
            loading={loading}
          />
        );
      case 'notifications':
        return (
          <NotificationSettingsForm
            settings={settings.notifications}
            onUpdate={(key, value) => updateSettings('notifications', key, value)}
            onSave={handleSave}
            loading={loading}
          />
        );
      case 'dashboard':
        return (
          <DashboardSettingsForm
            settings={settings.dashboard}
            onUpdate={(key, value) => updateSettings('dashboard', key, value)}
            onSave={handleSave}
            loading={loading}
          />
        );
      case 'security':
        return (
          <SecuritySettingsForm
            settings={settings.security}
            onUpdate={(key, value) => updateSettings('security', key, value)}
            onSave={handleSave}
            loading={loading}
          />
        );
      case 'integrations':
        return (
          <IntegrationsSettingsSection
            settings={settings.integrations}
            onSave={handleSave}
            loading={loading}
          />
        );
      default:
        return (
          <AccountSettingsForm
            settings={settings.account}
            onUpdate={(key, value) => updateSettings('account', key, value)}
            onSave={handleSave}
            loading={loading}
          />
        );
    }
  };

  return (
    <div className="p-6 max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Text as="h1" className="text-2xl font-semibold text-gray-900">Settings</Text>
          <Text as="p" className="text-gray-500 mt-1">Manage your account preferences and configurations</Text>
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-6 lg:space-y-0">
          <SettingsSidebar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="flex-1 min-w-0">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6">
                {renderContent()}
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;