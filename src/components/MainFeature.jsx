import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';
import { metricsService, userService } from '../services';
import { toast } from 'react-toastify';
import { format, subDays } from 'date-fns';

const MainFeature = () => {
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
      // Get 5 most recent users
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

  const formatMetricValue = (value, name) => {
    if (name.toLowerCase().includes('revenue')) {
      return `$${value.toLocaleString()}`;
    }
    if (name.toLowerCase().includes('rate')) {
      return `${value}%`;
    }
    return value.toLocaleString();
  };

  const getMetricIcon = (name) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('user')) return 'Users';
    if (nameLower.includes('revenue')) return 'DollarSign';
    if (nameLower.includes('churn')) return 'TrendingDown';
    if (nameLower.includes('growth')) return 'TrendingUp';
    return 'BarChart3';
  };

  const getMetricColor = (change) => {
    if (change > 0) return 'text-semantic-success';
    if (change < 0) return 'text-semantic-error';
    return 'text-gray-500';
  };

  const getMetricBorderColor = (name) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('user')) return 'border-t-primary';
    if (nameLower.includes('revenue')) return 'border-t-semantic-success';
    if (nameLower.includes('churn')) return 'border-t-semantic-error';
    if (nameLower.includes('growth')) return 'border-t-semantic-info';
    return 'border-t-gray-400';
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow-sm border-t-4 border-t-gray-200 p-6">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );

  const SkeletonTable = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 py-3 border-b border-gray-100">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        {/* Date Range Selector */}
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        {/* Recent Activity */}
        <SkeletonTable />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <ApperIcon name="AlertCircle" size={48} className="mx-auto text-semantic-error mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to Load Dashboard</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={loadDashboardData}
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
      {/* Header with Date Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Monitor your key metrics and user activity</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
        >
          <option value="1day">Today</option>
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="90days">Last 90 days</option>
        </select>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-lg shadow-sm border-t-4 ${getMetricBorderColor(metric.name)} p-6 hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-500">{metric.name}</h3>
              <ApperIcon 
                name={getMetricIcon(metric.name)} 
                size={20} 
                className="text-gray-400" 
              />
            </div>
            <div className="mb-2">
              <p className="text-3xl font-bold text-gray-900">
                {formatMetricValue(metric.value, metric.name)}
              </p>
            </div>
            <div className="flex items-center">
              <ApperIcon 
                name={metric.change >= 0 ? "TrendingUp" : "TrendingDown"} 
                size={16} 
                className={getMetricColor(metric.change)} 
              />
              <span className={`text-sm font-medium ml-1 ${getMetricColor(metric.change)}`}>
                {Math.abs(metric.change)}% from last {metric.period}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent User Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Recent Users</h2>
            <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              View All
            </button>
          </div>
        </div>
        <div className="p-6">
          {recentUsers.length === 0 ? (
            <div className="text-center py-8">
              <ApperIcon name="Users" size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Users Yet</h3>
              <p className="text-gray-500">Users will appear here as they sign up</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <ApperIcon name="User" size={16} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 break-words">{user.name}</p>
                      <p className="text-xs text-gray-500 break-words">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm text-gray-900">{user.plan}</p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(user.signupDate), 'MMM dd')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <ApperIcon name="UserPlus" size={32} className="mx-auto text-primary mb-3" />
          <h3 className="text-sm font-medium text-gray-900 mb-2">Invite Users</h3>
          <button className="w-full px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm">
            Send Invites
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <ApperIcon name="FileText" size={32} className="mx-auto text-semantic-success mb-3" />
          <h3 className="text-sm font-medium text-gray-900 mb-2">Generate Report</h3>
          <button className="w-full px-3 py-2 bg-semantic-success text-white rounded-lg hover:bg-semantic-success/90 transition-colors text-sm">
            Create Report
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <ApperIcon name="Settings" size={32} className="mx-auto text-gray-400 mb-3" />
          <h3 className="text-sm font-medium text-gray-900 mb-2">Settings</h3>
          <button className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            Configure
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default MainFeature;