import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ children, className = '', value, onChange, ...rest }) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
            {...rest}
        >
            {children}
        </select>
    );
};

Select.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Select;