import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Text from '@/components/atoms/Text';
import StatCard from '@/components/molecules/StatCard';
import ApperIcon from '@/components/ApperIcon';

const HomeQuickStatsSection = ({ onGetStarted }) => {
    const stats = [
        { label: 'Active Users', value: '2,847', icon: 'Users', color: 'text-primary' },
        { label: 'Revenue', value: '$45,678', icon: 'DollarSign', color: 'text-semantic-success' },
        { label: 'Growth Rate', value: '+12.3%', icon: 'TrendingUp', color: 'text-semantic-info' },
        { label: 'Reports', value: '24', icon: 'FileText', color: 'text-secondary' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
        >
            <Card className="p-8">
                <Text as="h2" className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                    Quick Overview
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={stat.label} stat={stat} index={index} delay={0.8} {...stat} />
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onGetStarted}
                        className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
                        icon={ApperIcon.bind(null, { name: 'ArrowRight' })}
                    >
                        Get Started
                    </Button>
                </div>
            </Card>
        </motion.div>
    );
};

HomeQuickStatsSection.propTypes = {
    onGetStarted: PropTypes.func.isRequired,
};

export default HomeQuickStatsSection;