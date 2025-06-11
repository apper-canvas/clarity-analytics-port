import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import Text from '@/components/atoms/Text';

const MetricFilterButtons = ({ availableMetrics, selectedMetrics, onMetricToggle }) => {
    return (
        <Card className="p-6">
            <Text as="h3" className="text-lg font-medium text-gray-900 mb-4">Select Metrics to Display</Text>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {availableMetrics.map((metric) => (
                    <motion.button
                        key={metric.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onMetricToggle(metric.id)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                            selectedMetrics.includes(metric.id)
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                    >
                        <ApperIcon name={metric.icon} size={24} className="mx-auto mb-2" />
                        <Text as="p" className="text-sm font-medium">{metric.label}</Text>
                    </motion.button>
                ))}
            </div>
        </Card>
    );
};

MetricFilterButtons.propTypes = {
    availableMetrics: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
    })).isRequired,
    selectedMetrics: PropTypes.arrayOf(PropTypes.string).isRequired,
    onMetricToggle: PropTypes.func.isRequired,
};

export default MetricFilterButtons;