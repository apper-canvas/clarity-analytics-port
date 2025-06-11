import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button'; // Using Button atom, though it's a styled div

const TemplateCard = ({ type, onClick, index }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left cursor-pointer"
        >
            <ApperIcon name={type.icon} size={24} className="text-primary mb-3" />
            <Text as="h4" className="font-medium text-gray-900 mb-1">{type.label}</Text>
            <Text as="p" className="text-sm text-gray-500">{type.description}</Text>
        </motion.div>
    );
};

TemplateCard.propTypes = {
    type: PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired, // Added for animation delay
};

export default TemplateCard;