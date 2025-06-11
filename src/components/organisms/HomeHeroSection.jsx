import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const HomeHeroSection = ({ onViewDashboard, onExploreAnalytics }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
        >
            <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                    <ApperIcon name="BarChart3" size={32} className="text-white" />
                </div>
            </div>
            <Text as="h1" className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to Clarity Analytics
            </Text>
            <Text as="p" className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Your comprehensive SaaS admin panel for monitoring user engagement and making data-driven decisions
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onViewDashboard}
                    className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                    View Dashboard
                </Button>
                <Button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onExploreAnalytics}
                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                    Explore Analytics
                </Button>
            </div>
        </motion.div>
    );
};

HomeHeroSection.propTypes = {
    onViewDashboard: PropTypes.func.isRequired,
    onExploreAnalytics: PropTypes.func.isRequired,
};

export default HomeHeroSection;