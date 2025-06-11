import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { format, subDays } from 'date-fns';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import Modal from '@/components/molecules/Modal';
import ReportsHeader from '@/components/organisms/ReportsHeader';
import ReportsTemplatesSection from '@/components/organisms/ReportsTemplatesSection';
import SavedReportsList from '@/components/organisms/SavedReportsList';
import CreateReportForm from '@/components/organisms/CreateReportForm';

const ReportsPage = () => {
  const [savedReports, setSavedReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [newReport, setNewReport] = useState({
    name: '',
    type: 'user-analytics',
    dateRange: '30days',
    metrics: [],
    schedule: 'manual'
  });

  const reportTypes = [
    { id: 'user-analytics', label: 'User Analytics', icon: 'Users', description: 'Detailed user behavior and engagement metrics' },
    { id: 'revenue', label: 'Revenue Report', icon: 'DollarSign', description: 'Financial performance and revenue trends' },
    { id: 'growth', label: 'Growth Analysis', icon: 'TrendingUp', description: 'User acquisition and retention analysis' },
    { id: 'engagement', label: 'Engagement Report', icon: 'Activity', description: 'User activity and feature usage statistics' }
  ];

  const availableMetrics = [
    { id: 'activeUsers', label: 'Active Users' },
    { id: 'newSignups', label: 'New Signups' },
    { id: 'revenue', label: 'Revenue' },
    { id: 'churnRate', label: 'Churn Rate' },
    { id: 'retentionRate', label: 'Retention Rate' },
    { id: 'avgSessionTime', label: 'Average Session Time' }
  ];

  const loadSavedReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate loading saved reports
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockReports = [
        {
          id: '1',
          name: 'Monthly User Analytics',
          type: 'user-analytics',
          dateRange: '30days',
          metrics: ['activeUsers', 'newSignups', 'retentionRate'],
          schedule: 'monthly',
          lastGenerated: new Date().toISOString(),
          status: 'completed'
        },
        {
          id: '2',
          name: 'Revenue Summary',
          type: 'revenue',
          dateRange: '7days',
          metrics: ['revenue', 'churnRate'],
          schedule: 'weekly',
          lastGenerated: subDays(new Date(), 2).toISOString(),
          status: 'completed'
        },
        {
          id: '3',
          name: 'Growth Metrics Q1',
          type: 'growth',
          dateRange: '90days',
          metrics: ['activeUsers', 'newSignups', 'retentionRate'],
          schedule: 'manual',
          lastGenerated: subDays(new Date(), 7).toISOString(),
          status: 'completed'
        }
      ];

      setSavedReports(mockReports);
    } catch (err) {
      setError(err.message || 'Failed to load reports');
      toast.error('Failed to load reports');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSavedReports();
  }, [loadSavedReports]);

  const handleCreateReport = async () => {
    if (!newReport.name.trim()) {
      toast.warning('Please enter a report name');
      return;
    }

    if (newReport.metrics.length === 0) {
      toast.warning('Please select at least one metric');
      return;
    }

    setGenerateLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate report generation

      const report = {
        id: Date.now().toString(),
        ...newReport,
        lastGenerated: new Date().toISOString(),
        status: 'completed'
      };

      setSavedReports(prev => [report, ...prev]);
      setShowCreateModal(false);
      setNewReport({
        name: '',
        type: 'user-analytics',
        dateRange: '30days',
        metrics: [],
        schedule: 'manual'
      });

      toast.success('Report created and generated successfully');
    } catch (err) {
      toast.error('Failed to create report');
    } finally {
      setGenerateLoading(false);
    }
  };

  const handleGenerateReport = async (reportId) => {
    setGenerateLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate generation

      setSavedReports(prev =>
        prev.map(report =>
          report.id === reportId
            ? { ...report, lastGenerated: new Date().toISOString(), status: 'completed' }
            : report
        )
      );

      toast.success('Report generated successfully');
    } catch (err) {
      toast.error('Failed to generate report');
    } finally {
      setGenerateLoading(false);
    }
  };

  const handleDeleteReport = async (reportId) => {
    if (!confirm('Are you sure you want to delete this report?')) return;

    try {
      setSavedReports(prev => prev.filter(report => report.id !== reportId));
      toast.success('Report deleted successfully');
    } catch (err) {
      toast.error('Failed to delete report');
    }
  };

  const getReportTypeInfo = (type) => {
    return reportTypes.find(rt => rt.id === type) || reportTypes[0];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-semantic-success bg-semantic-success/10';
      case 'generating': return 'text-semantic-warning bg-semantic-warning/10';
      case 'failed': return 'text-semantic-error bg-semantic-error/10';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getScheduleLabel = (schedule) => {
    switch (schedule) {
      case 'daily': return 'Daily';
      case 'weekly': return 'Weekly';
      case 'monthly': return 'Monthly';
      case 'manual': return 'Manual';
      default: return 'Manual';
    }
  };

  const handleNewReportChange = (key, value) => {
    setNewReport(prev => ({ ...prev, [key]: value }));
  };

  const handleSelectTemplate = (type) => {
    setNewReport(prev => ({ ...prev, type: type.id, name: type.label }));
    setShowCreateModal(true);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <LoadingSpinner message="Loading reports..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage
          title="Failed to Load Reports"
          message={error}
          onRetry={loadSavedReports}
        />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-full overflow-hidden">
      <ReportsHeader onCreateReport={() => setShowCreateModal(true)} />
      <ReportsTemplatesSection reportTypes={reportTypes} onSelectTemplate={handleSelectTemplate} />
      <SavedReportsList
        savedReports={savedReports}
        getReportTypeInfo={getReportTypeInfo}
        getStatusColor={getStatusColor}
        getScheduleLabel={getScheduleLabel}
        onGenerateReport={handleGenerateReport}
        onDeleteReport={handleDeleteReport}
        generateLoading={generateLoading}
        onCreateReportClick={() => setShowCreateModal(true)}
      />

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Report"
      >
        <CreateReportForm
          newReport={newReport}
          onReportChange={handleNewReportChange}
          reportTypes={reportTypes}
          availableMetrics={availableMetrics}
          generateLoading={generateLoading}
          onCreate={handleCreateReport}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>
    </div>
  );
};

export default ReportsPage;