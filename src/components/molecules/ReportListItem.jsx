import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Card from '@/components/atoms/Card';
import Text from '@/components/atoms/Text';
import { format } from 'date-fns';

const ReportListItem = ({
    report,
    index,
    getReportTypeInfo,
    getStatusColor,
    getScheduleLabel,
    onGenerate,
    onDelete,
    generateLoading,
}) => {
    const typeInfo = getReportTypeInfo(report.type);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <Card className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <ApperIcon name={typeInfo.icon} size={20} className="text-primary" />
                        </div>
                        <div className="ml-3">
                            <Text as="h4" className="font-medium text-gray-900 break-words">{report.name}</Text>
                            <Text as="p" className="text-sm text-gray-500">{typeInfo.label}</Text>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            onClick={() => onGenerate(report.id)}
                            disabled={generateLoading}
                            className="p-1 text-gray-400 hover:text-primary transition-colors"
                            title="Generate Report"
                        >
                            <ApperIcon name="Play" size={16} />
                        </Button>
                        <Button
                            onClick={() => onDelete(report.id)}
                            className="p-1 text-gray-400 hover:text-semantic-error transition-colors"
                            title="Delete Report"
                        >
                            <ApperIcon name="Trash2" size={16} />
                        </Button>
                    </div>
                </div>

                <div className="space-y-3">
                    <div>
                        <Badge colorClass={getStatusColor(report.status)}>
                            {report.status}
                        </Badge>
                    </div>

                    <div className="text-sm text-gray-600">
                        <Text as="p"><Text as="span" className="font-medium">Schedule:</Text> {getScheduleLabel(report.schedule)}</Text>
                        <Text as="p"><Text as="span" className="font-medium">Last Generated:</Text> {format(new Date(report.lastGenerated), 'MMM dd, yyyy')}</Text>
                        <Text as="p"><Text as="span" className="font-medium">Metrics:</Text> {report.metrics.length}</Text>
                    </div>

                    <div className="flex space-x-2">
                        <Button className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors" icon={ApperIcon.bind(null, { name: 'Download' })}>
                            Export
                        </Button>
                        <Button className="flex-1 px-3 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors" icon={ApperIcon.bind(null, { name: 'Eye' })}>
                            View
                        </Button>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

ReportListItem.propTypes = {
    report: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        dateRange: PropTypes.string.isRequired,
        metrics: PropTypes.arrayOf(PropTypes.string).isRequired,
        schedule: PropTypes.string.isRequired,
        lastGenerated: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    getReportTypeInfo: PropTypes.func.isRequired,
    getStatusColor: PropTypes.func.isRequired,
    getScheduleLabel: PropTypes.func.isRequired,
    onGenerate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    generateLoading: PropTypes.bool.isRequired,
};

export default ReportListItem;