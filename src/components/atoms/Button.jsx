import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, className = '', onClick, type = 'button', disabled, icon: Icon, ...rest }) => {
    // Filter out 'icon' prop to prevent it from being passed to the DOM element
    const filteredProps = { className, onClick, type, disabled, ...rest };

    return (
        <button {...filteredProps}>
            {Icon && <Icon size={16} className="inline mr-2" />}
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    disabled: PropTypes.bool,
    icon: PropTypes.elementType // Assuming Icon is a React component (e.g., from ApperIcon)
};

export default Button;