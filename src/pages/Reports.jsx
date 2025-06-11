import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';
import { userService, metricsService } from '../services';
import { toast } from 'react-toastify';
import { format, subDays } from 'date-fns';

const Reports = () => {
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

  useEffect(() => {
    loadSavedReports();
  }, []);

  const loadSavedReports = async () => {
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
  };

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

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <ApperIcon name="AlertCircle" size={48} className="mx-auto text-semantic-error mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to Load Reports</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={loadSavedReports}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
          <p className="text-gray-500 mt-1">Create and manage your analytics reports</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <ApperIcon name="Plus" size={16} className="inline mr-2" />
          Create Report
        </button>
      </div>

      {/* Quick Report Templates */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTypes.map((type) => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setNewReport(prev => ({ ...prev, type: type.id, name: type.label }));
                setShowCreateModal(true);
              }}
              className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left"
            >
              <ApperIcon name={type.icon} size={24} className="text-primary mb-3" />
              <h4 className="font-medium text-gray-900 mb-1">{type.label}</h4>
              <p className="text-sm text-gray-500">{type.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Saved Reports */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Saved Reports</h3>
        </div>
        <div className="p-6">
          {savedReports.length === 0 ? (
            <div className="text-center py-12">
              <ApperIcon name="FileText" size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Yet</h3>
              <p className="text-gray-500 mb-4">Create your first report to get started</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Create Report
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedReports.map((report, index) => {
                const typeInfo = getReportTypeInfo(report.type);
                return (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <ApperIcon name={typeInfo.icon} size={20} className="text-primary" />
                        </div>
                        <div className="ml-3">
                          <h4 className="font-medium text-gray-900 break-words">{report.name}</h4>
                          <p className="text-sm text-gray-500">{typeInfo.label}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleGenerateReport(report.id)}
                          disabled={generateLoading}
                          className="p-1 text-gray-400 hover:text-primary transition-colors"
                          title="Generate Report"
                        >
                          <ApperIcon name="Play" size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteReport(report.id)}
                          className="p-1 text-gray-400 hover:text-semantic-error transition-colors"
                          title="Delete Report"
                        >
                          <ApperIcon name="Trash2" size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </div>

                      <div className="text-sm text-gray-600">
                        <p><span className="font-medium">Schedule:</span> {getScheduleLabel(report.schedule)}</p>
                        <p><span className="font-medium">Last Generated:</span> {format(new Date(report.lastGenerated), 'MMM dd, yyyy')}</p>
                        <p><span className="font-medium">Metrics:</span> {report.metrics.length}</p>
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                          <ApperIcon name="Download" size={14} className="inline mr-2" />
                          Export
                        </button>
                        <button className="flex-1 px-3 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                          <ApperIcon name="Eye" size={14} className="inline mr-2" />
                          View
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Create Report Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Create New Report</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ApperIcon name="X" size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Report Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Name
                </label>
                <input
                  type="text"
                  value={newReport.name}
                  onChange={(e) => setNewReport(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter report name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Report Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {reportTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setNewReport(prev => ({ ...prev, type: type.id }))}
                      className={`p-3 border rounded-lg text-left transition-all ${
                        newReport.type === type.id
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <ApperIcon name={type.icon} size={16} className="mr-2" />
                        <span className="font-medium">{type.label}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <select
                  value={newReport.dateRange}
                  onChange={(e) => setNewReport(prev => ({ ...prev, dateRange: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="90days">Last 90 days</option>
                  <option value="1year">Last year</option>
                </select>
              </div>

              {/* Metrics */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Metrics to Include
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableMetrics.map((metric) => (
                    <label key={metric.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newReport.metrics.includes(metric.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewReport(prev => ({
                              ...prev,
                              metrics: [...prev.metrics, metric.id]
                            }));
                          } else {
                            setNewReport(prev => ({
                              ...prev,
                              metrics: prev.metrics.filter(id => id !== metric.id)
                            }));
                          }
                        }}
                        className="rounded border-gray-300 text-primary focus:ring-primary mr-2"
                      />
                      <span className="text-sm">{metric.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schedule
                </label>
                <select
                  value={newReport.schedule}
                  onChange={(e) => setNewReport(prev => ({ ...prev, schedule: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="manual">Manual</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateReport}
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
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Reports;