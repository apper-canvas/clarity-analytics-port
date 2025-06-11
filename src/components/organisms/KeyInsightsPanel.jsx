import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import Text from '@/components/atoms/Text';

const KeyInsightsPanel = ({ metrics, users }) => {
    const totalRevenue = users.reduce((sum, user) => sum + user.revenue, 0);
    const growthRate = metrics.find(m => m.name.includes('Growth'))?.change || 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <Card className="p-6">
                <Text as="h3" className="text-lg font-medium text-gray-900 mb-6">Key Insights</Text>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <ApperIcon name="TrendingUp" size={32} className="mx-auto text-semantic-success mb-3" />
                        <Text as="h4" className="text-lg font-semibold text-gray-900">Growth Rate</Text>
                        <Text as="p" className="text-2xl font-bold text-semantic-success">
                            {growthRate}%
                        </Text>
                        <Text as="p" className="text-sm text-gray-500 mt-1">This month</Text>
                    </div>
                    <div className="text-center">
                        <ApperIcon name="Users" size={32} className="mx-auto text-primary mb-3" />
                        <Text as="h4" className="text-lg font-semibold text-gray-900">Total Users</Text>
                        <Text as="p" className="text-2xl font-bold text-primary">{users.length.toLocaleString()}</Text>
                        <Text as="p" className="text-sm text-gray-500 mt-1">Active accounts</Text>
                    </div>
                    <div className="text-center">
                        <ApperIcon name="DollarSign" size={32} className="mx-auto text-semantic-success mb-3" />
                        <Text as="h4" className="text-lg font-semibold text-gray-900">Revenue</Text>
                        <Text as="p" className="text-2xl font-bold text-semantic-success">
                            ${totalRevenue.toLocaleString()}
                        </Text>
                        <Text as="p" className="text-sm text-gray-500 mt-1">Total generated</Text>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

KeyInsightsPanel.propTypes = {
    metrics: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        change: PropTypes.number.isRequired,
    })).isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
        revenue: PropTypes.number.isRequired,
    })).isRequired,
};

export default KeyInsightsPanel;