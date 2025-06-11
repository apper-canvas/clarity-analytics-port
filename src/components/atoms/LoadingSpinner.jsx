import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ className = '', message = 'Loading...' }) => {
    return (
        <div className={`flex flex-col items-center justify-center py-8 text-primary ${className}`}>
            <ApperIcon name="Loader" size={32} className="animate-spin mb-3" />
            <p className="text-gray-600">{message}</p>
        </div>
    );
};

LoadingSpinner.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
};

export default LoadingSpinner;