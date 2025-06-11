import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Checkbox from '@/components/atoms/Checkbox';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import { format } from 'date-fns';

const UserTableRow = ({ user, isSelected, onSelect, getStatusColor, onViewDetails, index }) => {
    return (
        <motion.tr
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="hover:bg-gray-50 transition-colors"
        >
            <td className="px-6 py-4">
                <Checkbox checked={isSelected} onChange={() => onSelect(user.id)} />
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <ApperIcon name="User" size={14} className="text-primary" />
                    </div>
                    <div className="ml-3 min-w-0">
                        <Text as="p" className="text-sm font-medium text-gray-900 break-words">{user.name}</Text>
                        <Text as="p" className="text-sm text-gray-500 break-words">{user.email}</Text>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <Text as="span" className="text-sm text-gray-900">{user.plan}</Text>
            </td>
            <td className="px-6 py-4">
                <Text as="span" className="text-sm text-gray-900">${user.revenue.toLocaleString()}</Text>
            </td>
            <td className="px-6 py-4">
                <Text as="span" className="text-sm text-gray-500">
                    {format(new Date(user.signupDate), 'MMM dd, yyyy')}
                </Text>
            </td>
            <td className="px-6 py-4">
                <Badge colorClass={getStatusColor(user.status)}>
                    {user.status}
                </Badge>
            </td>
            <td className="px-6 py-4">
                <Button
                    onClick={() => onViewDetails(user)}
                    className="text-primary hover:text-primary/80 transition-colors p-0"
                >
                    <ApperIcon name="Eye" size={16} />
                </Button>
            </td>
        </motion.tr>
    );
};

UserTableRow.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        plan: PropTypes.string.isRequired,
        revenue: PropTypes.number.isRequired,
        signupDate: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    getStatusColor: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};

export default UserTableRow;