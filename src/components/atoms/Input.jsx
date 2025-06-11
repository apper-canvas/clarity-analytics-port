import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ className = '', type = 'text', value, onChange, placeholder, ...rest }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
            {...rest}
        />
    );
};

Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

export default Input;