import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const DashboardQuickActions = ({ onInviteUsers, onGenerateReport, onSettings }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
            <Card className="p-6 text-center">
                <ApperIcon name="UserPlus" size={32} className="mx-auto text-primary mb-3" />
                <Text as="h3" className="text-sm font-medium text-gray-900 mb-2">Invite Users</Text>
                <Button onClick={onInviteUsers} className="w-full px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm">
                    Send Invites
                </Button>
            </Card>

            <Card className="p-6 text-center">
                <ApperIcon name="FileText" size={32} className="mx-auto text-semantic-success mb-3" />
                <Text as="h3" className="text-sm font-medium text-gray-900 mb-2">Generate Report</Text>
                <Button onClick={onGenerateReport} className="w-full px-3 py-2 bg-semantic-success text-white rounded-lg hover:bg-semantic-success/90 transition-colors text-sm">
                    Create Report
                </Button>
            </Card>

            <Card className="p-6 text-center">
                <ApperIcon name="Settings" size={32} className="mx-auto text-gray-400 mb-3" />
                <Text as="h3" className="text-sm font-medium text-gray-900 mb-2">Settings</Text>
                <Button onClick={onSettings} className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Configure
                </Button>
            </Card>
        </motion.div>
    );
};

DashboardQuickActions.propTypes = {
    onInviteUsers: PropTypes.func.isRequired,
    onGenerateReport: PropTypes.func.isRequired,
    onSettings: PropTypes.func.isRequired,
};

export default DashboardQuickActions;