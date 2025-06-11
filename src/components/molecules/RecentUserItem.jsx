import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';
import { format } from 'date-fns';

const RecentUserItem = ({ user, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <ApperIcon name="User" size={16} className="text-primary" />
                </div>
                <div className="min-w-0">
                    <Text as="p" className="text-sm font-medium text-gray-900 break-words">{user.name}</Text>
                    <Text as="p" className="text-xs text-gray-500 break-words">{user.email}</Text>
                </div>
            </div>
            <div className="text-right flex-shrink-0">
                <Text as="p" className="text-sm text-gray-900">{user.plan}</Text>
                <Text as="p" className="text-xs text-gray-500">
                    {format(new Date(user.signupDate), 'MMM dd')}
                </Text>
            </div>
        </motion.div>
    );
};

RecentUserItem.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        plan: PropTypes.string.isRequired,
        signupDate: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
};

export default RecentUserItem;