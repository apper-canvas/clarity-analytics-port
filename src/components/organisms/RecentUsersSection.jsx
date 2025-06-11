import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import RecentUserItem from '@/components/molecules/RecentUserItem';

const RecentUsersSection = ({ recentUsers, onViewAll }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <Card>
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <Text as="h2" className="text-lg font-medium text-gray-900">Recent Users</Text>
                        <Button
                            onClick={onViewAll}
                            className="text-primary hover:text-primary/80 text-sm font-medium transition-colors p-0"
                        >
                            View All
                        </Button>
                    </div>
                </div>
                <div className="p-6">
                    {recentUsers.length === 0 ? (
                        <div className="text-center py-8">
                            <ApperIcon name="Users" size={48} className="mx-auto text-gray-300 mb-4" />
                            <Text as="h3" className="text-lg font-medium text-gray-900 mb-2">No Users Yet</Text>
                            <Text as="p" className="text-gray-500">Users will appear here as they sign up</Text>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentUsers.map((user, index) => (
                                <RecentUserItem key={user.id} user={user} index={index} />
                            ))}
                        </div>
                    )}
                </div>
            </Card>
        </motion.div>
    );
};

RecentUsersSection.propTypes = {
    recentUsers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        plan: PropTypes.string.isRequired,
        signupDate: PropTypes.string.isRequired,
    })).isRequired,
    onViewAll: PropTypes.func.isRequired,
};

export default RecentUsersSection;