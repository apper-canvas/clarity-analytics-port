import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import Text from '@/components/atoms/Text';

const FeatureCard = ({ feature, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
        >
            <Card className="p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name={feature.icon} size={24} className="text-primary" />
                </div>
                <Text as="h3" className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</Text>
                <Text as="p" className="text-gray-600">{feature.description}</Text>
            </Card>
        </motion.div>
    );
};

FeatureCard.propTypes = {
    feature: PropTypes.shape({
        icon: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
};

export default FeatureCard;