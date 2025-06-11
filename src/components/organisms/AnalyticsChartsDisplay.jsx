import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ChartCard from '@/components/molecules/ChartCard';
import Text from '@/components/atoms/Text';
import ApperIcon from '@/components/ApperIcon';

const AnalyticsChartsDisplay = ({
    chartType,
    generateChartData,
    getUserGrowthData,
    getPlanDistributionData,
    users,
    selectedMetrics,
    availableMetrics,
}) => {
    const defaultChartOptions = {
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
                lines: { show: false }
            },
            yaxis: {
                lines: { show: true }
            }
        },
        xaxis: {
            categories: generateChartData().categories,
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: '#6B7280', fontSize: '12px' }
            }
        },
        yaxis: {
            labels: {
                style: { colors: '#6B7280', fontSize: '12px' },
                formatter: (value) => {
                    if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
                    if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
                    return value.toFixed(0);
                }
            }
        },
        tooltip: {
            theme: 'light',
            style: { fontSize: '12px' }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            labels: { colors: '#374151' }
        }
    };

    const pieChartOptions = {
        chart: { type: 'pie' },
        colors: ['#0066CC', '#10B981', '#F59E0B'],
        labels: getPlanDistributionData().labels,
        legend: {
            position: 'bottom',
            labels: { colors: '#374151' }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: { width: 300 },
                legend: { position: 'bottom' }
            }
        }]
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Metrics Chart */}
            <ChartCard
                title="Metrics Trends"
                options={{
                    ...defaultChartOptions,
                    xaxis: {
                        ...defaultChartOptions.xaxis,
                        categories: generateChartData().categories
                    },
                    chart: {
                        ...defaultChartOptions.chart,
                        type: chartType
                    }
                }}
                series={generateChartData().series}
                type={chartType}
                height={350}
                delay={0}
                noDataMessage="Select metrics to display chart"
                noDataIcon="BarChart3"
                className="lg:col-span-2"
            >
                {selectedMetrics.length > 0 && (
                    <div className="flex items-center justify-end mb-6">
                        <div className="flex items-center space-x-2">
                            {selectedMetrics.map((metricId, index) => (
                                <div key={metricId} className="flex items-center">
                                    <div
                                        className="w-3 h-3 rounded-full mr-2"
                                        style={{ backgroundColor: defaultChartOptions.colors[index] }}
                                    ></div>
                                    <Text as="span" className="text-sm text-gray-600">
                                        {availableMetrics.find(m => m.id === metricId)?.label}
                                    </Text>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </ChartCard>

            {/* User Growth Chart */}
            <ChartCard
                title="User Growth"
                options={{
                    ...defaultChartOptions,
                    chart: {
                        ...defaultChartOptions.chart,
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
                        ...defaultChartOptions.xaxis,
                        categories: getUserGrowthData().categories
                    }
                }}
                series={getUserGrowthData().series}
                type="area"
                height={300}
                delay={0.1}
            />

            {/* Plan Distribution */}
            <ChartCard
                title="Plan Distribution"
                options={pieChartOptions}
                series={getPlanDistributionData().series}
                type="pie"
                height={300}
                delay={0.2}
                noDataMessage="No user data available"
                noDataIcon="PieChart"
            />
        </div>
    );
};

AnalyticsChartsDisplay.propTypes = {
    chartType: PropTypes.string.isRequired,
    generateChartData: PropTypes.func.isRequired,
    getUserGrowthData: PropTypes.func.isRequired,
    getPlanDistributionData: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    selectedMetrics: PropTypes.arrayOf(PropTypes.string).isRequired,
    availableMetrics: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
    })).isRequired,
};

export default AnalyticsChartsDisplay;