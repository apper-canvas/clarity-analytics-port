import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import PropTypes from 'prop-types';

const ErrorMessage = ({ title = 'Something went wrong', message = 'Failed to load data. Please try again.', onRetry, className = '' }) => {
    return (
        <div className={`bg-white rounded-lg shadow-sm p-8 text-center ${className}`}>
            <ApperIcon name="AlertCircle" size={48} className="mx-auto text-semantic-error mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 mb-4">{message}</p>
            {onRetry && (
                <Button onClick={onRetry} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    Try Again
                </Button>
            )}
        </div>
    );
};

ErrorMessage.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    onRetry: PropTypes.func,
    className: PropTypes.string,
};

export default ErrorMessage;