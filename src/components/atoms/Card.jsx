import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, className = '', ...rest }) => {
    return (
        <div className={`bg-white rounded-lg shadow-sm ${className}`} {...rest}>
            {children}
        </div>
    );
};

Card.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Card;