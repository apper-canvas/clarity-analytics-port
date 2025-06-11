import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { metricsService, userService } from '@/services';
import { format, subDays } from 'date-fns';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import AnalyticsHeader from '@/components/organisms/AnalyticsHeader';
import MetricFilterButtons from '@/components/organisms/MetricFilterButtons';
import AnalyticsChartsDisplay from '@/components/organisms/AnalyticsChartsDisplay';
import KeyInsightsPanel from '@/components/organisms/KeyInsightsPanel';

const AnalyticsPage = () => {
  const [metrics, setMetrics] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('30days');
  const [chartType, setChartType] = useState('line');
  const [selectedMetrics, setSelectedMetrics] = useState(['activeUsers', 'revenue']);

  const availableMetrics = [
    { id: 'activeUsers', label: 'Active Users', icon: 'Users' },
    { id: 'revenue', label: 'Revenue', icon: 'DollarSign' },
    { id: 'churnRate', label: 'Churn Rate', icon: 'TrendingDown' },
    { id: 'growth', label: 'Growth', icon: 'TrendingUp' }
  ];

  const loadAnalyticsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [metricsData, usersData] = await Promise.all([
        metricsService.getAll(),
        userService.getAll()
      ]);
      setMetrics(metricsData);
      setUsers(usersData);
    } catch (err) {
      setError(err.message || 'Failed to load analytics data');
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnalyticsData();
  }, [dateRange, loadAnalyticsData]);

  const generateChartData = useCallback(() => {
    const days = parseInt(dateRange.replace('days', ''));
    const dates = Array.from({ length: days }, (_, i) => {
      const date = subDays(new Date(), days - 1 - i);
      return format(date, 'MMM dd');
    });

    const series = selectedMetrics.map(metricName => {
      const metric = metrics.find(m => m.name.toLowerCase().replace(/\s+/g, '').includes(metricName.toLowerCase()));
      if (!metric) return { name: availableMetrics.find(m => m.id === metricName)?.label || metricName, data: [] };

      const baseValue = metric.value;
      const trend = metric.trend || [];

      let data;
      if (trend.length >= days) {
        data = trend.slice(-days);
      } else {
        data = dates.map((_, i) => {
          const variation = (Math.random() - 0.5) * 0.2;
          const trendFactor = metric.change > 0 ? 1 + (i / days) * 0.1 : 1 - (i / days) * 0.05;
          return Math.round(baseValue * trendFactor * (1 + variation));
        });
      }

      return {
        name: metric.name,
        data: data
      };
    });

    return { categories: dates, series };
  }, [dateRange, selectedMetrics, metrics, availableMetrics]);

  const getUserGrowthData = useCallback(() => {
    const days = parseInt(dateRange.replace('days', ''));
    const dates = Array.from({ length: days }, (_, i) => {
      const date = subDays(new Date(), days - 1 - i);
      return format(date, 'MMM dd');
    });

    const growthData = dates.map((_, i) => {
      const baseGrowth = 10;
      const randomVariation = Math.floor(Math.random() * 15);
      return baseGrowth + randomVariation + Math.floor(i * 1.2);
    });

    return {
      categories: dates,
      series: [{
        name: 'New Users',
        data: growthData
      }]
    };
  }, [dateRange]);

  const getPlanDistributionData = useCallback(() => {
    const planCounts = users.reduce((acc, user) => {
      acc[user.plan] = (acc[user.plan] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(planCounts),
      series: Object.values(planCounts)
    };
  }, [users]);

  const handleMetricToggle = (metricId) => {
    setSelectedMetrics(prev => {
      if (prev.includes(metricId)) {
        return prev.filter(id => id !== metricId);
      } else {
        return [...prev, metricId];
      }
    });
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <LoadingSpinner message="Loading analytics data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage
          title="Failed to Load Analytics"
          message={error}
          onRetry={loadAnalyticsData}
        />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-full overflow-hidden">
      <AnalyticsHeader
        chartType={chartType}
        onChartTypeChange={setChartType}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />
      <MetricFilterButtons
        availableMetrics={availableMetrics}
        selectedMetrics={selectedMetrics}
        onMetricToggle={handleMetricToggle}
      />
      <AnalyticsChartsDisplay
        chartType={chartType}
        generateChartData={generateChartData}
        getUserGrowthData={getUserGrowthData}
        getPlanDistributionData={getPlanDistributionData}
        users={users}
        selectedMetrics={selectedMetrics}
        availableMetrics={availableMetrics}
      />
      <KeyInsightsPanel metrics={metrics} users={users} />
    </div>
  );
};

export default AnalyticsPage;