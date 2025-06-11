import React from 'react';
import PropTypes from 'prop-types';
import FeatureCard from '@/components/molecules/FeatureCard';

const HomeFeaturesSection = ({ features }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
                <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
        </div>
    );
};

HomeFeaturesSection.propTypes = {
    features: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    })).isRequired,
};

export default HomeFeaturesSection;