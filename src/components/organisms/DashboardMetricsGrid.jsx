import React from 'react';
import PropTypes from 'prop-types';
import MetricStatCard from '@/components/molecules/MetricStatCard';

const DashboardMetricsGrid = ({ metrics }) => {
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

    const getBorderColor = (name) => {
        const nameLower = name.toLowerCase();
        if (nameLower.includes('user')) return 'border-t-primary';
        if (nameLower.includes('revenue')) return 'border-t-semantic-success';
        if (nameLower.includes('churn')) return 'border-t-semantic-error';
        if (nameLower.includes('growth')) return 'border-t-semantic-info';
        return 'border-t-gray-400';
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
                <MetricStatCard
                    key={metric.id}
                    metric={metric}
                    index={index}
                    formatValue={formatMetricValue}
                    getIcon={getMetricIcon}
                    getMetricColor={getMetricColor}
                    getBorderColor={getBorderColor}
                />
            ))}
        </div>
    );
};

DashboardMetricsGrid.propTypes = {
    metrics: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        change: PropTypes.number.isRequired,
        period: PropTypes.string.isRequired,
    })).isRequired,
};

export default DashboardMetricsGrid;