import React from 'react';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import ReportListItem from '@/components/molecules/ReportListItem';

const SavedReportsList = ({
    savedReports,
    getReportTypeInfo,
    getStatusColor,
    getScheduleLabel,
    onGenerateReport,
    onDeleteReport,
    generateLoading,
    onCreateReportClick,
}) => {
    return (
        <Card>
            <div className="px-6 py-4 border-b border-gray-200">
                <Text as="h3" className="text-lg font-medium text-gray-900">Saved Reports</Text>
            </div>
            <div className="p-6">
                {savedReports.length === 0 ? (
                    <div className="text-center py-12">
                        <ApperIcon name="FileText" size={48} className="mx-auto text-gray-300 mb-4" />
                        <Text as="h3" className="text-lg font-medium text-gray-900 mb-2">No Reports Yet</Text>
                        <Text as="p" className="text-gray-500 mb-4">Create your first report to get started</Text>
                        <Button
                            onClick={onCreateReportClick}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Create Report
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedReports.map((report, index) => (
                            <ReportListItem
                                key={report.id}
                                report={report}
                                index={index}
                                getReportTypeInfo={getReportTypeInfo}
                                getStatusColor={getStatusColor}
                                getScheduleLabel={getScheduleLabel}
                                onGenerate={onGenerateReport}
                                onDelete={onDeleteReport}
                                generateLoading={generateLoading}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Card>
    );
};

SavedReportsList.propTypes = {
    savedReports: PropTypes.array.isRequired,
    getReportTypeInfo: PropTypes.func.isRequired,
    getStatusColor: PropTypes.func.isRequired,
    getScheduleLabel: PropTypes.func.isRequired,
    onGenerateReport: PropTypes.func.isRequired,
    onDeleteReport: PropTypes.func.isRequired,
    generateLoading: PropTypes.bool.isRequired,
    onCreateReportClick: PropTypes.func.isRequired,
};

export default SavedReportsList;