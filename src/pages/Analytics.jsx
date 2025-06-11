import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import ApperIcon from '../components/ApperIcon';
import { metricsService, userService } from '../services';
import { toast } from 'react-toastify';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';

const Analytics = () => {
  const [metrics, setMetrics] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('30days');
  const [chartType, setChartType] = useState('line');
  const [selectedMetrics, setSelectedMetrics] = useState(['activeUsers', 'revenue']);

  useEffect(() => {
    loadAnalyticsData();
  }, [dateRange]);

  const loadAnalyticsData = async () => {
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
  };

  const generateChartData = () => {
    const days = parseInt(dateRange.replace('days', ''));
    const dates = Array.from({ length: days }, (_, i) => {
      const date = subDays(new Date(), days - 1 - i);
      return format(date, 'MMM dd');
    });

    // Generate realistic trend data based on metric values
    const series = selectedMetrics.map(metricName => {
      const metric = metrics.find(m => m.name.toLowerCase().replace(/\s+/g, '').includes(metricName.toLowerCase()));
      if (!metric) return { name: metricName, data: [] };

      const baseValue = metric.value;
      const trend = metric.trend || [];
      
      // If we have trend data, use it; otherwise generate realistic data
      let data;
      if (trend.length >= days) {
        data = trend.slice(-days);
      } else {
        // Generate realistic trend data
        data = dates.map((_, i) => {
          const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
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
  };

  const getUserGrowthData = () => {
    const days = parseInt(dateRange.replace('days', ''));
    const dates = Array.from({ length: days }, (_, i) => {
      const date = subDays(new Date(), days - 1 - i);
      return format(date, 'MMM dd');
    });

    // Simulate user growth data
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
  };

  const getPlanDistributionData = () => {
    const planCounts = users.reduce((acc, user) => {
      acc[user.plan] = (acc[user.plan] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(planCounts),
      series: Object.values(planCounts)
    };
  };

  const chartOptions = {
    chart: {
      height: 350,
      type: chartType,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        }
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    colors: ['#0066CC', '#10B981', '#F59E0B', '#EF4444'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 0,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      categories: generateChartData().categories,
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px'
        },
        formatter: (value) => {
          if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
          if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
          return value.toFixed(0);
        }
      }
    },
    tooltip: {
      theme: 'light',
      style: {
        fontSize: '12px'
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: '#374151'
      }
    }
  };

  const pieChartOptions = {
    chart: {
      type: 'pie',
    },
    colors: ['#0066CC', '#10B981', '#F59E0B'],
    labels: getPlanDistributionData().labels,
    legend: {
      position: 'bottom',
      labels: {
        colors: '#374151'
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const availableMetrics = [
    { id: 'activeUsers', label: 'Active Users', icon: 'Users' },
    { id: 'revenue', label: 'Revenue', icon: 'DollarSign' },
    { id: 'churnRate', label: 'Churn Rate', icon: 'TrendingDown' },
    { id: 'growth', label: 'Growth', icon: 'TrendingUp' }
  ];

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
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to Load Analytics</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={loadAnalyticsData}
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
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="text-gray-500 mt-1">Deep dive into your metrics and trends</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          >
            <option value="line">Line Chart</option>
            <option value="area">Area Chart</option>
            <option value="bar">Bar Chart</option>
          </select>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Metric Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Select Metrics to Display</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {availableMetrics.map((metric) => (
            <motion.button
              key={metric.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleMetricToggle(metric.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedMetrics.includes(metric.id)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <ApperIcon name={metric.icon} size={24} className="mx-auto mb-2" />
              <p className="text-sm font-medium">{metric.label}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Metrics Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Metrics Trends</h3>
            <div className="flex items-center space-x-2">
              {selectedMetrics.map((metricId, index) => (
                <div key={metricId} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: chartOptions.colors[index] }}
                  ></div>
                  <span className="text-sm text-gray-600">
                    {availableMetrics.find(m => m.id === metricId)?.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {selectedMetrics.length > 0 ? (
            <Chart
              options={chartOptions}
              series={generateChartData().series}
              type={chartType}
              height={350}
            />
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <ApperIcon name="BarChart3" size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Select metrics to display chart</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-6">User Growth</h3>
          <Chart
            options={{
              ...chartOptions,
              chart: {
                ...chartOptions.chart,
                type: 'area'
              },
              colors: ['#10B981'],
              fill: {
                type: 'gradient',
                gradient: {
                  shadeIntensity: 1,
                  opacityFrom: 0.4,
                  opacityTo: 0.1,
                  stops: [0, 100]
                }
              },
              xaxis: {
                ...chartOptions.xaxis,
                categories: getUserGrowthData().categories
              }
            }}
            series={getUserGrowthData().series}
            type="area"
            height={300}
          />
        </motion.div>

        {/* Plan Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-6">Plan Distribution</h3>
          {users.length > 0 ? (
            <Chart
              options={pieChartOptions}
              series={getPlanDistributionData().series}
              type="pie"
              height={300}
            />
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <ApperIcon name="PieChart" size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No user data available</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Analytics Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h3 className="text-lg font-medium text-gray-900 mb-6">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <ApperIcon name="TrendingUp" size={32} className="mx-auto text-semantic-success mb-3" />
            <h4 className="text-lg font-semibold text-gray-900">Growth Rate</h4>
            <p className="text-2xl font-bold text-semantic-success">
              {metrics.find(m => m.name.includes('Growth'))?.change || 0}%
            </p>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </div>
          <div className="text-center">
            <ApperIcon name="Users" size={32} className="mx-auto text-primary mb-3" />
            <h4 className="text-lg font-semibold text-gray-900">Total Users</h4>
            <p className="text-2xl font-bold text-primary">{users.length.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">Active accounts</p>
          </div>
          <div className="text-center">
            <ApperIcon name="DollarSign" size={32} className="mx-auto text-semantic-success mb-3" />
            <h4 className="text-lg font-semibold text-gray-900">Revenue</h4>
            <p className="text-2xl font-bold text-semantic-success">
              ${users.reduce((sum, user) => sum + user.revenue, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-1">Total generated</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;