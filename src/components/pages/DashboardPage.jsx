import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { metricsService, userService } from '@/services';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import DashboardHeader from '@/components/organisms/DashboardHeader';
import DashboardMetricsGrid from '@/components/organisms/DashboardMetricsGrid';
import RecentUsersSection from '@/components/organisms/RecentUsersSection';
import DashboardQuickActions from '@/components/organisms/DashboardQuickActions';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('7days');

  useEffect(() => {
    loadDashboardData();
  }, [dateRange]);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [metricsData, usersData] = await Promise.all([
        metricsService.getAll(),
        userService.getAll()
      ]);

      setMetrics(metricsData);
      const sortedUsers = usersData
        .sort((a, b) => new Date(b.signupDate) - new Date(a.signupDate))
        .slice(0, 5);
      setRecentUsers(sortedUsers);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
  };

  const handleInviteUsers = () => {
    toast.info('Invite users functionality coming soon!');
    // navigate('/users'); // Could navigate to users page or open a modal
  };

  const handleGenerateReport = () => {
    navigate('/reports');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const handleViewAllUsers = () => {
    navigate('/users');
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <LoadingSpinner message="Loading dashboard data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage
          title="Failed to Load Dashboard"
          message={error}
          onRetry={loadDashboardData}
        />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-full overflow-hidden">
      <DashboardHeader
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
      />
      <DashboardMetricsGrid metrics={metrics} />
      <RecentUsersSection
        recentUsers={recentUsers}
        onViewAll={handleViewAllUsers}
      />
      <DashboardQuickActions
        onInviteUsers={handleInviteUsers}
        onGenerateReport={handleGenerateReport}
        onSettings={handleSettings}
      />
    </div>
  );
};

export default DashboardPage;