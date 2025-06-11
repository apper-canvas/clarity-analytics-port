import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import Text from '@/components/atoms/Text';

const MetricStatCard = ({ metric, index, formatValue, getIcon, getMetricColor, getBorderColor }) => {
    const IconComponent = ApperIcon; // Use ApperIcon as the component directly

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <Card className={`border-t-4 ${getBorderColor(metric.name)} p-6 hover:shadow-md transition-shadow`}>
                <div className="flex items-center justify-between mb-3">
                    <Text as="h3" className="text-sm font-medium text-gray-500">{metric.name}</Text>
                    <IconComponent name={getIcon(metric.name)} size={20} className="text-gray-400" />
                </div>
                <div className="mb-2">
                    <Text as="p" className="text-3xl font-bold text-gray-900">
                        {formatValue(metric.value, metric.name)}
                    </Text>
                </div>
                <div className="flex items-center">
                    <IconComponent
                        name={metric.change >= 0 ? "TrendingUp" : "TrendingDown"}
                        size={16}
                        className={getMetricColor(metric.change)}
                    />
                    <Text as="span" className={`text-sm font-medium ml-1 ${getMetricColor(metric.change)}`}>
                        {Math.abs(metric.change)}% from last {metric.period}
                    </Text>
                </div>
            </Card>
        </motion.div>
    );
};

MetricStatCard.propTypes = {
    metric: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        change: PropTypes.number.isRequired,
        period: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    formatValue: PropTypes.func.isRequired,
    getIcon: PropTypes.func.isRequired,
    getMetricColor: PropTypes.func.isRequired,
    getBorderColor: PropTypes.func.isRequired,
};

export default MetricStatCard;