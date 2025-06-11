import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ children, colorClass = '', className = '', ...rest }) => {
    return (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${colorClass} ${className}`} {...rest}>
            {children}
        </span>
    );
};

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    colorClass: PropTypes.string,
    className: PropTypes.string,
};

export default Badge;