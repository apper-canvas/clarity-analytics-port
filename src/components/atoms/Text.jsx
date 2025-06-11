import React from 'react';
import PropTypes from 'prop-types';

const Text = ({ as = 'p', children, className = '', ...rest }) => {
    const Component = as;
    return (
        <Component className={className} {...rest}>
            {children}
        </Component>
    );
};

Text.propTypes = {
    as: PropTypes.elementType, // e.g., 'h1', 'p', 'span', 'label'
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Text;