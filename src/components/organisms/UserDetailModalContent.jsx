import React from 'react';
import PropTypes from 'prop-types';
import Text from '@/components/atoms/Text';
import Badge from '@/components/atoms/Badge';
import { format } from 'date-fns';

const UserDetailModalContent = ({ user, getStatusColor }) => {
    if (!user) return null;

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Text as="h3" className="text-sm font-medium text-gray-500 mb-2">Basic Information</Text>
                    <div className="space-y-3">
                        <div>
                            <Text as="label" className="text-xs text-gray-400">Name</Text>
                            <Text as="p" className="text-sm text-gray-900 break-words">{user.name}</Text>
                        </div>
                        <div>
                            <Text as="label" className="text-xs text-gray-400">Email</Text>
                            <Text as="p" className="text-sm text-gray-900 break-words">{user.email}</Text>
                        </div>
                        <div>
                            <Text as="label" className="text-xs text-gray-400">Plan</Text>
                            <Text as="p" className="text-sm text-gray-900">{user.plan}</Text>
                        </div>
                        <div>
                            <Text as="label" className="text-xs text-gray-400">Status</Text>
                            <Badge colorClass={getStatusColor(user.status)}>
                                {user.status}
                            </Badge>
                        </div>
                    </div>
                </div>
                <div>
                    <Text as="h3" className="text-sm font-medium text-gray-500 mb-2">Account Details</Text>
                    <div className="space-y-3">
                        <div>
                            <Text as="label" className="text-xs text-gray-400">Revenue</Text>
                            <Text as="p" className="text-sm text-gray-900">${user.revenue.toLocaleString()}</Text>
                        </div>
                        <div>
                            <Text as="label" className="text-xs text-gray-400">Signup Date</Text>
                            <Text as="p" className="text-sm text-gray-900">
                                {format(new Date(user.signupDate), 'MMMM dd, yyyy')}
                            </Text>
                        </div>
                        <div>
                            <Text as="label" className="text-xs text-gray-400">Last Active</Text>
                            <Text as="p" className="text-sm text-gray-900">
                                {format(new Date(user.lastActive), 'MMMM dd, yyyy')}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserDetailModalContent.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        plan: PropTypes.string.isRequired,
        revenue: PropTypes.number.isRequired,
        signupDate: PropTypes.string.isRequired,
        lastActive: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }),
    getStatusColor: PropTypes.func.isRequired,
};

export default UserDetailModalContent;