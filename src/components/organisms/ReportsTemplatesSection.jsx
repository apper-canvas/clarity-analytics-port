import React from 'react';
import PropTypes from 'prop-types';
import Card from '@/components/atoms/Card';
import Text from '@/components/atoms/Text';
import TemplateCard from '@/components/molecules/TemplateCard';

const ReportsTemplatesSection = ({ reportTypes, onSelectTemplate }) => {
    return (
        <Card className="p-6">
            <Text as="h3" className="text-lg font-medium text-gray-900 mb-4">Quick Templates</Text>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {reportTypes.map((type, index) => (
                    <TemplateCard
                        key={type.id}
                        type={type}
                        onClick={() => onSelectTemplate(type)}
                        index={index}
                    />
                ))}
            </div>
        </Card>
    );
};

ReportsTemplatesSection.propTypes = {
    reportTypes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    })).isRequired,
    onSelectTemplate: PropTypes.func.isRequired,
};

export default ReportsTemplatesSection;