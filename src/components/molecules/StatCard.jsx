import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';

const StatCard = ({ label, value, icon, color, index, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + index * 0.1 }}
            className="text-center"
        >
            <ApperIcon name={icon} size={24} className={`${color} mx-auto mb-2`} />
            <Text as="p" className="text-2xl font-bold text-gray-900">{value}</Text>
            <Text as="p" className="text-sm text-gray-600">{label}</Text>
        </motion.div>
    );
};

StatCard.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    delay: PropTypes.number,
};

export default StatCard;